from flask import Blueprint, jsonify, request, session
from helpers import save_to_db
from dbconfig import db
from werkzeug.security import check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from sources.withdraw import Withdraw
from datetime import datetime, timedelta
import bcrypt


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    user_role = db.Column(db.String(255))
    password = db.Column(db.String(255))
    email = db.Column(db.String(255))
    pin_code = db.Column(db.String(255))
    balance = db.Column(db.Float(precision='double'))
    account_type = db.Column(db.String(255))
    is_admin = db.Column(db.Boolean, default=False)

    def check_password(self, pwdd):
        pwd = User.query.filter_by(password=pwdd).first()
        return pwd


__name__ = "__users__"
users_bp = Blueprint("users", __name__)


def create_admin_user():
    admin_username = 'admin'
    admin_password = 'admin'
    user_role = "admin"

    admin_user = User.query.filter_by(username=admin_username).first()
    current_date = datetime.now()
    four_months_ago = current_date - timedelta(days=30*4)
    eight_months_ago = current_date - timedelta(days=30*8)
    
    if admin_user is None:
        admin_user = User(
            username=admin_username,
            user_role=user_role, 
            password=generate_password_hash(admin_password),
            is_admin=True,
            balance=6,
            account_type="Gold"
        )

        four_months_ago_date = four_months_ago.strftime('%d-%m-%Y')
        eight_months_ago = eight_months_ago.strftime('%d-%m-%Y')

        if admin_user.is_admin:
            create_admin_withdraw(10000, "4 months ago")
            create_admin_withdraw(8000, "8 months ago")

        db.session.add(admin_user)
        db.session.commit()
        print('Admin user created successfully!')
    else:
        print('Admin user already exists.')

def create_admin_withdraw(amount, date):
    widthdraw = Withdraw()
    setattr(widthdraw, 'sender', 'admin')
    setattr(widthdraw, 'datetime', date)
    setattr(widthdraw, 'status', "success")
    setattr(widthdraw, 'wallet_address', '1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71')
    setattr(widthdraw, 'amount', amount)
    save_to_db(widthdraw)


@users_bp.route("/register", methods=["POST"])
def create_user():
    json = request.get_json()
    user = User()
    found_username = User.query.filter_by(username=json['username']).first()
    found_email = User.query.filter_by(email=json['email']).first()
    is_admin = False

    if found_email:
        return jsonify({"key": "email_is_taken"}), 200

    if found_username:
        return jsonify({"key": "username_is_taken"}), 200

    user = User(
        username=json['username'],
        email=json['email'],
        password=generate_password_hash(json['pass']),
        pin_code=json['pin_code'],
        user_role= "basic",
        balance=0,
        account_type="Bronze"
    )

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
        return jsonify({'balance': balance})
    else:
        return jsonify({'message': 'User not found'})


@users_bp.route("/login", methods=["POST"])
def login():
    json = request.get_json()
    user = User.query.filter_by(username=json["username"]).first()
    email = json["username"]
    password = json["password"]

    if user:

        if check_password_hash(user.password, password):
            response = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                "account_type": user.account_type,
                "user_role": user.user_role
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


@users_bp.route("/change_pass/<string:user_id>", methods=['POST'])
def change_password(user_id):
    json_data = request.get_json()
    user = User.query.filter_by(id=user_id).first()
    old_password = json_data["old_pass"]
    if check_password_hash(user.password, old_password):
        password = generate_password_hash(json_data['new_pass'])
        user.password = password
        save_to_db(user)
        return {
            "is_same_pass": True
        }
    else:
        return {
            "is_same_pass": False
        }

    # generate_password_hash =
    # isSamePassword = bcrypt.hashpw(, result.password)

    # print("result", result.password)
    # return {
    #     "isSm"
    #     "password": result.password
    # };
