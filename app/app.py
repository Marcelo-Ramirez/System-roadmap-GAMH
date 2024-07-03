from flask import Flask, render_template, send_from_directory, request, jsonify
import socket
import os
from models.database import init_db, db
from models.users import User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__, static_folder='templates/static')

app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos
init_db(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory(os.path.join(app.root_path, 'templates/static'), filename)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'message': 'Invalid input'}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')  # Método correcto
    
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'New user registered!'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'message': 'Invalid input'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login failed!'}), 401

    token = jwt.encode({
        'user_id': user.id, 
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)  # Actualización
    }, app.config['SECRET_KEY'])

    return jsonify({'token': token})

if __name__ == '__main__':
    # Obtener la dirección IP de la máquina
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    # Configurar y ejecutar la aplicación Flask
    print(f"Running on http://{local_ip}:5000")
    app.run(debug=True, host='0.0.0.0')
