from flask import Blueprint, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

__name__ = "__smtp__"
smtp_bp = Blueprint("smtp", __name__)


# Gmail SMTP server details
smtp_server = 'smtp.gmail.com'
smtp_port = 587

# Your Gmail email address and password
email_address = 'sohailbadghisi1@gmail.com'
email_password = 'iuwftlxqrfaynuyk'

# Create a connection to the SMTP server
server = smtplib.SMTP(smtp_server, smtp_port)

# Start TLS encryption
server.starttls()


@smtp_bp.route("/welcome_message", methods=["POST"])
def send_welcome():
    try:
        server.login(email_address, email_password)
        json_d = request.get_json()
        
        # Create a message
        name = json_d["name"]
        subject = f'Welcome To SafeCoin!'
        body = f"Hello {name}, We are thrilled to welcome you to SafeCoin, your trusted gateway to the exciting world of cryptocurrencies. SafeCoin is your one-stop destination for all things crypto, and we're here to help you navigate this ever-evolving landscape. Whether you're an experienced trader or just getting started, you're in the right place."
        recipient = json_d["email"]

        msg = MIMEMultipart()
        msg['From'] = email_address
        msg['To'] = recipient
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        server.sendmail(email_address, recipient, msg.as_string())

        # Quit the server
        server.quit()

        return "Email sent successfully"
    except Exception  as e:
        return "Something went wrong!"



@smtp_bp.route("/send_email", methods=["POST"])
def send_email():
    server.login(email_address, email_password)
    json_d = request.get_json()

    # Create a message
    subject = f'SafeCoin'
    body = json_d["message"]
    recipient = json_d["email"]

    msg = MIMEMultipart()
    msg['From'] = email_address
    msg['To'] = recipient
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    # Send the email
    server.sendmail(email_address, recipient, msg.as_string())

    # Quit the server
    server.quit()

    return "Email sent successfully"
