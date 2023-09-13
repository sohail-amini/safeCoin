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

def add_products_to_database():
      # Check if the Products table is empty
    if db.session.query(Product).count() == 0:
        products_data = [
            {
                "id": 1,
                "description": "package1",
                "price": 0.1,
                "title": "Basic Plan",
                "subtitle": "5% After 24 hours",
            },
            {
                "id": 2,
                "description": "package2",
                "price": 0.1,
                "title": "Corporate Plan",
                "subtitle": "12% After 48 hours",
            },
            {
                "id": 3,
                "description": "package3",
                "price": 0.1,
                "title": "Platinum Plan",
                "subtitle": "20% After 72 hours",
            },
        ]

        # Add the product instances to the database session
        with db.session.begin_nested():
            for product_data in products_data:
                new_product = Product(
                    id=product_data["id"],
                    description=product_data["description"],
                    price=product_data["price"],
                    title=product_data["title"],
                    subtitle=product_data["subtitle"],
                )
                db.session.add(new_product)

        # Commit the changes to the database
        db.session.commit()