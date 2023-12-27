from flask import request, jsonify, Blueprint
from dbconfig import db
import datetime
import json
import requests
import uuid
import os
from sources.products import Product
from sources.settings import Settings

from helpers import save_to_db

invoice_bp = Blueprint("invoice", __name__)


class Invoice(db.Model):
    __tablename__ = "invoice"
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "product.id"), nullable=False)
    status = db.Column(db.Integer, default=-1)
    order_id = db.Column(db.String(250))
    address = db.Column(db.String(250), nullable=True)
    btcvalue = db.Column(db.Integer, nullable=True)
    received = db.Column(db.Integer, nullable=True)
    txid = db.Column(db.String(250), nullable=True)
    user_info = db.Column(db.String(1000), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    STATUS_CHOICES = (
        (-1, "Not Started"),
        (0, "Unconfirmed"),
        (1, "Partially Confirmed"),
        (2, "Confirmed")
    )


def exchange_rate(amount):
    url = "https://www.blockonomics.co/api/price?currency=USD"
    r = requests.get(url)
    response = r.json()
    return amount / response['price']


@invoice_bp.route("/invoice/<int:pk>")
def track_invoice(pk):
    invoice = Invoice.query.get(pk)
    data = {
        'order_id': invoice.order_id,
        'bits': invoice.btcvalue / 1e8,
        'value': invoice.product.price,
        'addr': invoice.address,
        'status': Invoice.STATUS_CHOICES[invoice.status + 1][1],
        'invoice_status': invoice.status,
    }
    if invoice.received:
        data['paid'] = invoice.received / 1e8
        if invoice.btcvalue <= invoice.received:
            data['path'] = invoice.product.product_image.url
    else:
        data['paid'] = 0

    return jsonify(data)


@invoice_bp.route("/create_payment/<int:pk>", methods=["POST"])
def create_payment(pk):
    product = Product.query.get(pk)
    settings = Settings.query.get(1)

    j_data = request.get_json()
    url = 'https://www.blockonomics.co/api/new_address'
    headers = {'Authorization': "Bearer " + settings.blocknomic_token}
    r = requests.post(url, headers=headers)
    user_info_str = json.dumps(j_data['userInfo'])
    if r.status_code == 200:
        address = r.json()['address']
        bits = exchange_rate(product.price)
        order_id = str(uuid.uuid1())
        invoice = Invoice(order_id=order_id, address=address,
                          btcvalue=bits*1e8, status="Pending", user_info=user_info_str, received=0)
        product.invoices.append(invoice)
        db.session.add(invoice)
        db.session.commit()
        return jsonify({
            "invoice_id": invoice.id,
            "address": address,
            "bits": bits
        })
    else:
        return jsonify({"error": "Some Error, Try Again!", "message" : r.text})


@invoice_bp.route("/receive_payment", methods=["GET"])
def receive_payment():

    address = request.args.get('addr')
    status = request.args.get('status')
    value = request.args.get('value')
    txid = request.args.get('txid')
    
    invoice = Invoice.query.filter_by(address=address).first()

    invoice.status = int(status)

    if (int(status) == 2):
        invoice.received = value

    invoice.txid = txid
    save_to_db(invoice)

    return jsonify({"message": "Payment received.", "address": address, "Status": status})


    # data = request.get_json()
    # txid = data.get('txid')
    # value = data.get('value')
    # status = data.get('status')
    # addr = data.get('addr')

    # invoice = Invoice.query.filter_by(address=addr).first()

    # invoice.status = int(status)
    # if int(status) == 2:
    #     invoice.received = value
    # invoice.txid = txid
    # db.session.commit()
    # return jsonify({"message": "Payment received."})


@invoice_bp.route("/add_orders", methods=["GET"])
def add_orders():
    # Create two Order instances with the specified columns
    order1 = Invoice(product_id=1, status="pending", order_id="order123", address="address1", btcvalue=0.1, received=0.0, txid="txid123")
    order2 = Invoice(product_id=2, status="pending", order_id="order456", address="address2", btcvalue=0.2, received=0.0, txid="txid456")

    # Add the orders to the database
    db.session.add(order1)
    db.session.add(order2)
    db.session.commit()

    return jsonify({"message": "Two orders added to the database."})