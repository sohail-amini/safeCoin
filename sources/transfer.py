from flask import Blueprint, jsonify, request
from helpers import save_to_db
from dbconfig import db
from werkzeug.security import check_password_hash
import jwt
from sqlalchemy import Column, DateTime
from sources.users import User
from datetime import datetime

class Transfer(db.Model):
    __tablename__ = "transfer"
    id = Column(db.Integer, primary_key=True)
    sender = Column(db.String(255))
    receiver = Column(db.String(255))
    amount = Column(db.Integer)
    datetime = Column(db.String(10), default=datetime.utcnow().strftime('%d-%m-%Y'))
    status = Column(db.String(255))
    fees = Column(db.Integer)

    
__name__ = "__transfer__"
transfer_bp = Blueprint("transfer", __name__)

@transfer_bp.route('/latest_pending_transfer/<string:user_id>')
def search_transfer(user_id):
    try:
        pending_transfers = Transfer.query.filter_by(receiver=user_id, status='pending').order_by(Transfer.id.desc()).first()
        if pending_transfers is None:
            return jsonify({'message': 'no pending transaction'}), 200

        # Create a transfer object with the desired information
        transfer_object = {
            'receiver': user_id,
            'sender': pending_transfers.sender,
            'amount': pending_transfers.amount,
            'status': pending_transfers.status
        }
        return transfer_object
    except Exception as e:
        print(e) 
    return jsonify({'message': 'successfully'}), 200

@transfer_bp.route('/transfer', methods=['POST'])
def create_transfer():
    try:
        json = request.get_json()
        
        receiver_username = json["receiver"]
        sender_name = json["sender"]
        receiver = User().query.filter_by(username=receiver_username).first()
        sender = User.query.filter_by(id=json["senderId"]).first()
        current_user_transfers = Transfer().query.filter_by(sender=sender_name).all()
        
        if receiver is None:
            return jsonify({'message': 'user_not_found'})
        
        current_datetime = datetime.utcnow()

        amount = float(json["amount"])
        
        transfer = Transfer()
        balance = sender.balance

        total_transferred_amount = sum(transfer.amount for transfer in current_user_transfers)
        
        print(total_transferred_amount > 500 and sender_name != 'admin')
        if (total_transferred_amount > 500 and sender_name != 'admin'):
            return jsonify({ 'key': "max_transfer_amount", 'balance': balance}), 200
            
        for key, value in request.json.items():
            setattr(transfer, key, value)
        
        sender.balance = sender.balance - amount
        if receiver_username == receiver.username:
            receiver.balance += amount
            
        save_to_db(transfer)
        save_to_db(sender)
        
        return jsonify({'message': 'transfer created successfully', 'balance': balance })

    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to create investment'})

@transfer_bp.route("/fetch_all_transfer/<string:sender>")
def fetch_all_transfer(sender):
    
    transfers = Transfer.query.filter_by(sender=sender).all()
    transfers_data = []
    
    for transfer in transfers:
        transfer_dict = {
            'id': transfer.id,
            'amount': transfer.amount,
            "datetime": transfer.datetime,
            'receiver': transfer.receiver,
            'status': transfer.status,
        }
        transfers_data.append(transfer_dict)
    
    return jsonify({"transfers": transfers_data}), 200

