from flask import Blueprint, jsonify, request
from helpers import save_to_db
from dbconfig import db
from werkzeug.security import check_password_hash
import jwt
from sqlalchemy import Column, Date
from helpers import save_to_db

class Investment(db.Model):
    __table_name__ = "Investment"
    investment_id = Column(db.Integer, primary_key=True)
    package_name = Column(db.String(255))
    duration = Column(db.String(255))
    _return = Column(db.Integer)
    fees = Column(db.Float(precision='double'))
    start_date = Column(Date)
    end_date = Column(Date)
    status = Column(db.String(255))
    user_id = Column(db.Integer)

__name__ = "__investments__"
investment_bp = Blueprint("investments", __name__)

@investment_bp.route("/investments")
def retrieve_all_investment_packages():
    investment = Investment()
    try:
        
        packages = investment.query().all()
        
        packages_list = []
        for package in packages:
            package_dict = {
                'id': package.id,
                'duration': package.duration,
                '_return': package._return,
                'fees': package.fees
            }
            packages_list.append(package_dict)
        
        return jsonify(packages_list)

    except Exception as e:
        print("Error retrieving investment packages:", str(e))
        return jsonify([])

@investment_bp.route('/invest', methods=['POST'])
def create_investment():
    try:
        json = request.get_json()
        invest = Investment()
        for key, value in request.json.items():
                setattr(invest, key, value)
        save_to_db(invest)
        return jsonify({'message': 'Investment created successfully'})

    except Exception as e:
        print("Error creating investment:", str(e))
        return jsonify({'error': 'Failed to create investment'})