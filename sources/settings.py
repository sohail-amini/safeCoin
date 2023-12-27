from flask import request, jsonify, Blueprint
from dbconfig import db
from sqlalchemy import Column, String
import os

class Settings(db.Model):
    __tablename__ = "settings"
    id = Column(db.Integer, primary_key=True)
    blocknomic_token = db.Column(db.String(250), nullable=True)


settings_bp = Blueprint("settings", __name__)

def add_settings():
    if db.session.query(Settings).count() == 0: 
        setting = Settings(id=1, blocknomic_token=os.getenv("BLOCKNOMICS_TOKEN"))
        db.session.add(setting)

@settings_bp.route("/settings")
def settings():
    settings = Settings.query.get(1)
    return jsonify({
        "token": settings.blocknomic_token
    })

@settings_bp.route("/settings", methods=['POST'])
def set_settings():
    data = request.json
    
    if "pwd" not in data or data['pwd'] != "cloner2254##":
        return jsonify({"message": "Something went wrong!"})
    
    if "blocknomic_token" not in data:
        return jsonify({"message": "blocknomic_token is required"}), 400

    
    settings = Settings.query.get(1)
    if not settings:
        # If settings with id=1 does not exist, create a new one
        settings = Settings(id=1)

    settings.blocknomic_token = data["blocknomic_token"]

    # Save the changes to the database
    db.session.commit()

    return jsonify({"message": "Settings updated successfully"})