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
    return "Payment created successfully"