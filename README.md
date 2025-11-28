🚀 Stock Price Prediction & User Registration Email System

This project is a Django-based web application that allows users to register, log in, and analyze stock market data. It includes a machine learning model (LSTM) for predicting stock prices and provides moving average visualizations.
Additionally, the application sends a welcome email to every user upon successful registration.

📌 Features
🔐 User Authentication

User registration

Login & logout

Automatic welcome email on user signup

Secure password hashing

📈 Stock Price Prediction

LSTM deep-learning model

Predicts future stock closing prices

Uses .keras saved ML model

📊 Data Visualization

Closing Price chart

100-day Moving Average

Matplotlib plots rendered using backend AGG

⚙ Admin Dashboard

Manage users

View registered users

View logs (if added)

🧰 Tech Stack

Backend: Django, Python, Rest framework
Machine Learning: TensorFlow / Keras (LSTM model)
Database: SQLite
Email Service: SMTP (Gmail App Password)
Frontend: HTML, CSS, Bootstrap

🚀 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/sejalsingh/stock-prediction-portal.git
cd stock-prediction-portal

2️⃣ Create Virtual Environment
python -m venv env
source env/bin/activate  # Linux / Mac
env\Scripts\activate     # Windows

3️⃣ Install Dependencies
pip install -r requirements.txt

4️⃣ Setup Environment Variables

Create a .env file in the root folder:

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=yourgmail@gmail.com
EMAIL_HOST_PASSWORD=your_app_password   # NOT your Gmail password!
EMAIL_USE_TLS=True

5️⃣ Run Migrations
python manage.py migrate

6️⃣ Start the Server
python manage.py runserver

📧 Welcome Email Functionality

Whenever a new user registers, the application automatically sends them a welcome email using Django’s SMTP mail backend.

Code snippet (for reference)
from django.core.mail import send_mail

send_mail(
    subject="Welcome to Our Platform!",
    message="Hi! Thank you for registering. We are happy to have you with us.",
    from_email=settings.EMAIL_HOST_USER,
    recipient_list=[user.email],
)



