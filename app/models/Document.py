from .database import db

class Document(db.Model):
    __tablename__ = 'document'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    folder_id = db.Column(db.Integer, db.ForeignKey('folder.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Asegúrate de que la referencia es a 'users.id'
    
    folder = db.relationship('Folder', back_populates='documents')
    user = db.relationship('User', back_populates='documents')
