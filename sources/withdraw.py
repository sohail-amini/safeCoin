from flask import Blueprint, request, jsonify
from sqlalchemy import Column
from datetime import date
from dbconfig import db
from helpers import save_to_db

class Withdraw(db.Model):
    id = Column(db.Integer, primary_key=True)
    sender = Column(db.String(500))
    wallet_address = Column(db.String(500))
    status = Column(db.String(500))
    amount = Column(db.Integer)
    datetime = Column(db.String(500))

__name__ = "__withdraw__"
withdraw_bp = Blueprint("withdraw", __name__)

@withdraw_bp.route("/create_withdraw", methods=["POST"])
def create_withdraw():
    json_data = request.get_json()
    pin_code = json_data["secret_key"]
    sender_name = json_data["sender"]
    amount = json_data['amount']
    withdraw = Withdraw()
    current_user_withdraws = Withdraw().query.filter_by(sender=sender_name).all()
    from sources.users import User
    
    try:
        
        result = User().query.filter_by(pin_code=pin_code).first()
        sender = User().query.filter_by(username=sender_name).first()
        balance = sender.balance
        print("json_data", json_data)
        if result is None:
            return jsonify({'message': 'wrong_pin'}), 200
        
        total_withdraws = sum(transfer.amount for transfer in current_user_withdraws)
        if (total_withdraws + amount > 25 or amount > 25 or total_withdraws > 25 and sender_name != 'admin'):
            return jsonify({ 'key': "max_amount", 'balance': balance}), 200

        for key, value in json_data.items():
            setattr(withdraw, key, value)
        setattr(withdraw, 'datetime', date.today())
        setattr(withdraw, 'status', "success")
        sender.balance = sender.balance - json_data["amount"]
        save_to_db(withdraw)
        save_to_db(sender)
        balance = sender.balance
        return jsonify({'message': 'withdraw was successfully sent', 'balance': balance })
    except Exception as e:
        print("Error", e) 
    
    return jsonify({'message': 'successfully sent'}), 200


@withdraw_bp.route("/total_withdraw/<string:sender>")
def get_total_withdraws(sender):
    withdraws = Withdraw.query.filter_by(sender=sender).all()
    withdraws_data = []
    print("withdraws", withdraws)
    for withdraw in withdraws:
        transfer_dict = {
            'id': withdraw.id,
            'wallet_address': withdraw.wallet_address,
            'amount': withdraw.amount,
            "datetime": withdraw.datetime,
            'sender': withdraw.sender,
            'status': withdraw.status,
        }
        withdraws_data.append(transfer_dict)
    return jsonify({"withdraws": withdraws_data}), 200
