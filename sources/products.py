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
    min_invest = Column(String(255))
    max_invest = Column(String(255))
    commision = Column(String(255))
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
            "id": product.id,
            "title": product.title,
            "subtitle": product.subtitle,
            "description": product.description,
            "price": float(product.price), 
            "min_invest": product.min_invest, 
            "max_invest": product.max_invest, 
            "commision": product.commision, 
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
    min_invest = data.get("min_invest")
    max_invest = data.get("max_invest")
    commision = data.get("commision")

    # if not descri400ption or not price:
    #     return jsonify({"error": "Description and price are required."}), 

    new_product = Product(
        title=title, 
        subtitle=subtitle, 
        description=description, 
        price=price,
        min_invest=min_invest,
        max_invest=max_invest,
        commision=commision
    )
    db.session.add(new_product)
    db.session.commit()

    all_products = Product.query.all()

    # Serialize the list of products to JSON
    products_json = [
        {
            "id": product.id,
            "title": product.title,
            "subtitle": product.subtitle,
            "price": product.price,
            "min_invest": product.min_invest,
            "max_invest": product.max_invest,
            "commision": product.commision,
            # Add other fields as needed
        }
        for product in all_products
    ]
    return jsonify({"message": "Product created successfully.", "products": products_json}), 201

@product_bp.route("/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get(product_id)

    if product == None:
        return jsonify({"key": "not_found"}), 200
    
    for key, value in request.json.items():
        if value != None:
            setattr(product, key, value)
    db.session.commit()
    return jsonify({"key": "updated successfully"}), 200


@product_bp.route("/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)

    if product is None:
        return jsonify({"key": "not_found"}), 404

    db.session.delete(product)
    db.session.commit()
    
    return jsonify({"key": "deleted successfully"}), 200
    
def add_products_to_database():
      # Check if the Products table is empty
    if db.session.query(Product).count() == 0:
        products_data = [
            {
                "id": 1,
                "description": "package1",
                "price": 0.03,
                "title": "Bronze Plan",
                "subtitle": "5% After 24 hours",
                "min_invest": "50%",
                "max_invest": "499%",
                "commision": "10%"
            },
            {
                "id": 2,
                "description": "package2",
                "price": 0.1,
                "title": "Silver Plan",
                "subtitle": "12% After 48 hours",
                "min_invest": "500%",
                "max_invest": "4999%",
                "commision": "10%"
            },
            {
                "id": 3,
                "description": "package3",
                "price": 0.3,
                "title": "Gold Plan",
                "subtitle": "20% After 72 hours",
                "min_invest": "5000%",
                "max_invest": "Unlimited",
                "commision": "10%"
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
                    min_invest=product_data["min_invest"],
                    max_invest=product_data["max_invest"],
                    commision=product_data["commision"],
                )
                db.session.add(new_product)

        # Commit the changes to the database
        db.session.commit()