from flask import Blueprint, request, jsonify, current_app, redirect, url_for
from models.users import User
from models.database import db
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Invalid input'}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'New user registered!'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Invalid input'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login failed!'}), 401

    token = jwt.encode({
        'user_id': user.id, 
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")  # Usar current_app para acceder a la configuración

    return jsonify({'token': token})
