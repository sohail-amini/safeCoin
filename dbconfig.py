import os
import urllib.parse

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

def config(app):
    password = urllib.parse.quote_plus(os.getenv("DB_PASSWORD"))
    dbName = os.getenv("DB_NAME")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    user = os.getenv("DB_USER")

    app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://safecoin_user:5l6itOHTqLZe8JURdUnjy2AqNTZWwdmd@dpg-ci5ml65ph6eh6mp9s0rg-a.oregon-postgres.render.com/safecoin"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # TODO It allow to your packages to show their exceptions
    app.config["PROPAGATE_EXCEPTIONS"] = True
    engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])

    # Define the model
    Base = declarative_base()
