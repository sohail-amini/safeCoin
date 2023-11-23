from dbconfig import db

def save_to_db(obj):
    db.session.add(obj)
    db.session.commit()