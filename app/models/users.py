from .database import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    area = db.Column(db.String(255), nullable=False)
    
    documents = db.relationship('Document', back_populates='user')
    processes = db.relationship('UserProcess', back_populates='user')
