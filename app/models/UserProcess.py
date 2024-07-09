from .database import db

class UserProcess(db.Model):
    __tablename__ = 'user_process'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)  # Asegúrate de que la referencia es a 'users.id'
    process_id = db.Column(db.Integer, db.ForeignKey('process.id'), primary_key=True)
    
    user = db.relationship('User', back_populates='processes')
    process = db.relationship('Process', back_populates='users')
