from flask import Blueprint, jsonify, request
import requests

__name__ = "payment"
payment_bp = Blueprint("payment", __name__)

@payment_bp.route("/create_btc_payment")
def create_bitcoin_payment():
    
    url = "https://www.blockonomics.co/api/new_address"
    headers = {
        "Authorization": 'E9MYfzValcohfTq2jBh8o7DLukXsRzMQY2slYVypGhM'
    }
    data = {
        "amount": 0.002,
        "callback": "https://chat.openai.com/"
    }
    response = requests.post(url, headers=headers, json=data)
    print(response)
    return "Hello"
# def create_bitcoin_payment(api_key, amount, callback_url):


#     response = requests.post(url, headers=headers, json=data)
#     if response.status_code == 200:
#         payment_data = response.json()
#         payment_address = payment_data["address"]
#         payment_uuid = payment_data["uuid"]
#         return payment_address, payment_uuid
#     else:
#         print(f"Failed to create Bitcoin payment. Error: {response.text}")
#         return None, None
