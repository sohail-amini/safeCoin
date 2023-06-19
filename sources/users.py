from flask import Blueprint, jsonify, request, session
from helpers import save_to_db
from dbconfig import db
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    balance = db.Column(db.Float(precision='double'))
    account_type = db.Column(db.String(255))

    def check_password(self, pwdd):
        pwd = User.query.filter_by(password=pwdd).first()
        return pwd    

__name__ = "__users__"
users_bp = Blueprint("users", __name__)

@users_bp.route("/register", methods=["POST"])
def create_user():
    json = request.get_json()
    user = User()
    found_username = User.query.filter_by(username=json['username']).first()
    found_email = User.query.filter_by(email=json['email']).first()
    
    if found_email:
        return jsonify({"key": "email_is_taken"}), 200

    if found_username:
        return jsonify({"key": "username_is_taken"}), 200

    for key, value in request.json.items():
        setattr(user, key, value)
        
    setattr(user, 'balance', 8)
    setattr(user, 'account_type', "Basic")

    save_to_db(user)
    
    access_token = create_access_token(identity=user.username)

    return jsonify({
        "key": "success", 
        "result": "user added", 
        "token": access_token,
        "id": user.id, 
        'username': user.username,
        "account_type": user.account_type 
    }), 200

@users_bp.route("/check_balance/<int:user_id>")
def check_balance(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        balance = user.balance
        return jsonify({'balance': round(balance, 2)})
    else:
        return jsonify({'message': 'User not found'})

@users_bp.route("/login", methods=["POST"])
def login():
    json = request.get_json()
    user = User.query.filter_by(username=json["username"]).first()
    email = json["username"]
    password = json["password"]
    
    if user:
    
        if user.check_password(password):
            response = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                "account_type": user.account_type 
            }
            access_token = create_access_token(identity=user.username)
            response["token"] = access_token
            
            return jsonify(response)
        else:
            response = {'message': 'Incorrect password'}
            return jsonify(response), 401
    else:
        response = {'message': 'User not found'}
        return jsonify(response), 404

@users_bp.route('/logged-in', methods=['GET'])
def check_logged_in():
    logged_in = False
    if 'username' in session:
        logged_in = True
    # Return the logged-in status as a JSON response
    return jsonify({'logged_in': logged_in})

@users_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    print("current_user", current_user)
    return jsonify({'message': 'Protected content', 'current_user': 'current_user'}), 200