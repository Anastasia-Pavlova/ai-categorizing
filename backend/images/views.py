from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Images
import keras
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image as ts_image
import numpy as np


def classify_image(image_path): 
    model = MobileNetV2(weights="imagenet")
    img = keras.utils.load_img(image_path, target_size=(224, 224))
    img_array = ts_image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=1) 

    return decoded_predictions[0][0][1]


def get_image(request):
    image_list = Images.objects.all()
    if image_list.exists():
        response_data = [
            {
                "id": image.id,
                "name": image.name,
                "image_url": image.image.url,
                "category": image.category,
                "ai_category": image.ai_category
            }
            for image in image_list
        ]
        return JsonResponse(response_data, safe=False, status=200)
    else:
        return JsonResponse({"message": "No images available"}, status=404)

@csrf_exempt 
def save_image(request):
    if request.method == "POST":
        if "image" in request.FILES and "category" in request.POST:
            uploaded_image = request.FILES["image"]
            category = request.POST["category"]
            name = request.POST.get("name", "")  

            defined_category = classify_image(uploaded_image.temporary_file_path())
            image_obj = Images.objects.create(
                name=name,
                image=uploaded_image,
                category=category,
                ai_category=defined_category
            )

            return JsonResponse({
                "message": "Image saved successfully",
                "image_id": image_obj.id,
                "name": image_obj.name,
                "category": image_obj.category,
                "ai_category": image_obj.ai_category
            }, status=201)
        else:
            return JsonResponse({"error": "No image file provided"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)