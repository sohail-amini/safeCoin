import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from dbconfig import config, db
from helpers import save_to_db
from sources.users import users_bp, User, create_admin_user
from sources.investment import investment_bp
from sources.transfer import transfer_bp
from sources.payments import payment_bp
from sources.products import product_bp, add_products_to_database
from sources.invoice import invoice_bp
from sources.withdraw import withdraw_bp
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

load_dotenv()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///my_db.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config['JWT_SECRET_KEY'] = '2r4h8s8aF#'
jwt = JWTManager(app)
CORS(app)
config(app)

app.register_blueprint(users_bp)
app.register_blueprint(investment_bp)
app.register_blueprint(transfer_bp)
app.register_blueprint(payment_bp)
app.register_blueprint(product_bp)
app.register_blueprint(invoice_bp)
app.register_blueprint(withdraw_bp)

db.init_app(app)

with app.app_context():
    db.create_all()
    create_admin_user()
    add_products_to_database()

if __name__ == "__main__":
    app.run(debug=False, host=os.getenv("FLASK_RUN_HOST"), port=os.getenv("FLASK_RUN_PORT"))
