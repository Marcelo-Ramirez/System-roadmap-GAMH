from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    db.init_app(app)
    with app.app_context():
        # Importa los modelos para que sean reconocidos por SQLAlchemy
        from .users import User
        db.create_all()
