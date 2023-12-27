import os
import urllib.parse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

db = SQLAlchemy()

def config(app):
    # Define the URI for your SQLite database file.
    sqlite_uri = "sqlite:///safecoin.db"

    # Configure the default database URI.
    app.config["SQLALCHEMY_DATABASE_URI"] = sqlite_uri

    # Disable modification tracking (optional).
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Create a dictionary to specify multiple database bindings.
    app.config["SQLALCHEMY_BINDS"] = {
        "default": sqlite_uri  # Bind the default database to your SQLite file.
        # You can add more binds here if needed for other databases.
    }