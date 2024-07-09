from .database import db

class Process(db.Model):
    __tablename__ = 'process'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    members = db.Column(db.Integer, nullable=False)
    
    folders = db.relationship('Folder', back_populates='process')
    users = db.relationship('UserProcess', back_populates='process')
