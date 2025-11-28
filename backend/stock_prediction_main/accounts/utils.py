from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(user_email, user_name):
    subject = "Welcome to Our Website!"
    message = f"Hello {user_name},\n\nThank you for registering to our Stock Prediction Platform. We're happy to have you onboard!"
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user_email],
        fail_silently=False,
    )
