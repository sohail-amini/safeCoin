import os
import urllib.parse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

db = SQLAlchemy()

def config(app):
    # password = urllib.parse.quote_plus(os.getenv("DB_PASSWORD"))
    # dbName = os.getenv("DB_NAME")
    # host = os.getenv("DB_HOST")
    # port = os.getenv("DB_PORT")
    # user = os.getenv("DB_USER")

    # app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://safecoin_user:5l6itOHTqLZe8JURdUnjy2AqNTZWwdmd@dpg-ci5ml65ph6eh6mp9s0rg-a.oregon-postgres.render.com/safecoin"
    # app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{user}:{password}@{host}:{port}/{dbName}"
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///your_database_file.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # TODO It allow to your packages to show their exceptions
    # app.config["PROPAGATE_EXCEPTIONS"] = True
