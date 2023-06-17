from flask import Blueprint, jsonify, request
from sqlalchemy import Column, String, Float
from dbconfig import db
from sqlalchemy.orm import relationship

class Product(db.Model):
    __tablename__ = "product"
    id = Column(db.Integer, primary_key=True)
    title = Column(String(255))
    subtitle = Column(String(255))
    description = Column(String(255))
    price = Column(Float)
    invoices = relationship("Invoice", backref="product")

    __table_args__ = {"extend_existing": True}


product_bp = Blueprint("product", __name__)

@product_bp.route("/products")
def get_all_products():
    products = Product.query.all()
    product_list = []

    for product in products:
        product_data = {
            "product_id": product.id,
            "title": product.title,
            "subtitle": product.subtitle,
            "description": product.description,
            "price": float(product.price), 
        }
        product_list.append(product_data)

    return jsonify(product_list)

@product_bp.route("/products", methods=["POST"])
def create_product():
    data = request.get_json()

    title = data.get("title")
    subtitle = data.get("subtitle")
    description = data.get("description")
    price = data.get("price")

    if not description or not price:
        return jsonify({"error": "Description and price are required."}), 400

    new_product = Product(title=title, subtitle=subtitle, description=description, price=price)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product created successfully."}), 201
