from flask import Blueprint, jsonify, request
from helpers import save_to_db
from dbconfig import db
from werkzeug.security import check_password_hash
import jwt
from sqlalchemy import Column
from sources.users import User

class Transfer(db.Model):
    __tablename__ = "transfer"
    id = Column(db.Integer, primary_key=True)
    sender = Column(db.String(255))
    receiver = Column(db.String(255))
    amount = Column(db.Integer)
    status = Column(db.String(255))
    fees = Column(db.Integer)
    

__name__ = "__transfer__"
transfer_bp = Blueprint("transfer", __name__)

@transfer_bp.route('/latest_pending_transfer/<string:user_id>')
def search_transfer(user_id):
    print(user_id)
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
        
        user = User().query.filter_by(username=json["receiver"]).first()
        if user is None:
            return jsonify({'message': 'user_not_found'})
        
        transfer = Transfer()
        for key, value in request.json.items():
            print(key, value)
            setattr(transfer, key, value)
        print(transfer)
        save_to_db(transfer)
        
        return jsonify({'message': 'transfer created successfully'})

    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to create investment'})