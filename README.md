# Restaurant Management Project Setup Instruction👩‍💻

This guide will walk you through the steps to set up and run the project, including both the client and server sides.

## Prerequisites
Ensure the following are installed on your system before proceeding:

### For the Client:
- Node.js (version 16 or later)
- npm (Node Package Manager)

### For the Server:
- Python (version 3.8 or later)
- pip (Python package manager)

---

## Setup Instructions

### Client
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The client application should now be accessible at `http://localhost:3000` (or the specified port).

### Server
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install required Python packages:
   ```bash
   pip install djangorestframework
   pip install django-cors-headers
   ```
3. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Start the Django server:
   ```bash
   python manage.py runserver
   ```
   The server should now be running at `http://127.0.0.1:8000` (or the specified host and port).

---

## Additional Notes
- Ensure the client and server are running concurrently for the application to function correctly.
- If you encounter any issues during setup, check for missing dependencies or configuration mismatches.
- Update the `<repository-url>` placeholder in the clone command with the actual repository link.

Give it a try and Happy coding 🌠

