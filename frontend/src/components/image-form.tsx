'use client';

import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';

export const ImageForm = () => {
  const imageTypes = ['Food', 'Nature', 'Cities', 'Space', 'Sports', 'Animals'];
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedImageType, setSelectedImageType] = useState<string>(
    imageTypes[0]
  );
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files?.[0]);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('selectedImage', selectedImage);
    if (!selectedImage || !selectedImageType) {
      console.error('Image and category are required');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('name', selectedImage.name);
    formData.append('category', selectedImageType);
    axios
      .post('http://127.0.0.1:8000/image/save', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => console.log('res', res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmitForm}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Please, choose an image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleSelectImage}
          />
        </div>
        {selectedImage && (
          <div className="mb-4">
            <Image
              src={URL.createObjectURL(selectedImage)}
              alt={selectedImage.name}
              width="100"
              height="100"
            />
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image-type"
          >
            Image type
          </label>
          <div className="relative">
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image-type"
              onChange={(e) => setSelectedImageType(e.target.value)}
            >
              {imageTypes.map((imageType) => (
                <option key={imageType}>{imageType}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Confirm and send
          </button>
        </div>
      </form>
    </div>
  );
};
