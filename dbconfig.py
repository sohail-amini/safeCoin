import os
import urllib.parse

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def config(app):
    password = urllib.parse.quote_plus(os.getenv("DB_PASSWORD"))
    dbName = os.getenv("DB_NAME")
    host = os.getenv("DB_HOST")
    port = os.getenv("DB_PORT")
    user = os.getenv("DB_USER")

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{user}:{password}@{host}:{port}/{dbName}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # TODO It allow to your packages to show their exceptions
    app.config["PROPAGATE_EXCEPTIONS"] = True