from flask import Blueprint, request
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

__name__ = "__smtp__"
smtp_bp = Blueprint("smtp", __name__)


# Gmail SMTP server details
smtp_server = 'smtp.mailgun.org'
smtp_port = 587

sender_email = 'b@mg.ronqq.pm'
email_password = 'Tomjerry1'

# Create a connection to the SMTP server
server = smtplib.SMTP(smtp_server, smtp_port)

# Start TLS encryption
server.starttls()

def send_email_final(receiver_email, message):
    server.login(sender_email, email_password)
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = "SafeCoin"

    # Append the message to the 'msg' object
    msg.attach(MIMEText(message, 'plain'))

    server.sendmail(sender_email, receiver_email, msg.as_string())
    # Quit the server
    server.quit()

@smtp_bp.route("/welcome_message", methods=["POST"])
def send_welcome():
    try:
        json_d = request.get_json()
        
        # Create a message
        name = json_d["name"]
        subject = f'Welcome To SafeCoin!'
        body = f"Hello {name}, We are thrilled to welcome you to SafeCoin, your trusted gateway to the exciting world of cryptocurrencies. SafeCoin is your one-stop destination for all things crypto, and we're here to help you navigate this ever-evolving landscape. Whether you're an experienced trader or just getting started, you're in the right place."
        recipient = json_d["email"]

        msg.attach(MIMEText(body, 'plain'))

        # Send the email
        send_email_final(recipient, msg.as_string())

        return "Email sent successfully"
    except Exception  as e:
        return "Something went wrong!"



@smtp_bp.route("/send_email", methods=["POST"])
def send_email():
    json_d = request.get_json()

    # Create a message
    subject = f'SafeCoin'
    message = json_d["message"]
    recipient = json_d["email"]

    send_email_final(recipient, message)

    return "Email sent successfully"

# def send_withdrawal_request(from_email, to_email, message):
#     server.sendmail(from_email, to_email, message)