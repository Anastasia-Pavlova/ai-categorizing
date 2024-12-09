# AI Categorize Image

AI Categorize Image is a web application designed to categorize uploaded images using artificial intelligence. It consists of a Django backend for API and logic handling, and a Next.js frontend for user interaction.

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Anastasia-Pavlova/ai-categorizing.git
   cd ai-categorize-image

   ```

2. **Environment Variables**:

   - Create `.env` files for both the backend and frontend with the necessary configurations and get variables from `.env.example` files.

3. **Backend Setup**:

   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run database migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the backend server:
     ```bash
     python manage.py runserver
     ```

4. **Frontend Setup**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```
