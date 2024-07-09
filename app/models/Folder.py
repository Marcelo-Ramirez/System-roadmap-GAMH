from .database import db

class Folder(db.Model):
    __tablename__ = 'folder'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    process_id = db.Column(db.Integer, db.ForeignKey('process.id'), nullable=False)
    
    process = db.relationship('Process', back_populates='folders')
    documents = db.relationship('Document', back_populates='folder')
