import logging
from flask import Flask, send_from_directory, request, redirect, url_for, jsonify
import socket
from models.database import init_db
from routes.auth import auth_bp
from routes.main import main_bp  # Importar el blueprint main
import os
import jwt

# Configurar logging
logging.basicConfig(level=logging.DEBUG)

# Crear la aplicación Flask y configurar la carpeta estática
app = Flask(__name__, static_folder='templates/static')

# Configuración de la aplicación
app.config['SECRET_KEY'] = 'your_secret_key'  # Clave secreta para JWT
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # URI de la base de datos
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactivar el seguimiento de modificaciones para mejorar el rendimiento

# Inicializar la base de datos
init_db(app)

# Registrar Blueprints para modularizar la aplicación
app.register_blueprint(auth_bp)
app.register_blueprint(main_bp)

# Middleware para verificar el token antes de cada solicitud
@app.before_request
def require_authentication():
    logging.debug(f"Ruta solicitada: {request.path}")
    
    if request.path not in ['/', '/index', '/login', '/register', '/logout'] and 'static' not in request.path:
        token = request.cookies.get('token') or request.headers.get('x-access-token')
        if not token:
            logging.debug("No se encontró el token, redirigiendo a /")
            return redirect(url_for('serve_index'))

        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            logging.debug("El token ha expirado, redirigiendo a /")
            return redirect(url_for('serve_index'))
        except jwt.InvalidTokenError:
            logging.debug("Token inválido, redirigiendo a /")
            return redirect(url_for('serve_index'))

@app.route('/index')
def serve_index():
    logging.debug("Sirviendo index.html")
    return send_from_directory('templates', 'index.html')

@app.route('/login')
def login():
    token = request.cookies.get('token') or request.headers.get('x-access-token')
    if token:
        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            return redirect(url_for('serve_home'))
        except jwt.ExpiredSignatureError:
            pass
        except jwt.InvalidTokenError:
            pass
    logging.debug("Sirviendo index.html para /login")
    return send_from_directory('templates', 'index.html')

@app.route('/logout')
def logout():
    resp = redirect(url_for('serve_index'))
    resp.set_cookie('token', '', expires=0)
    return resp

@app.route('/home')
def serve_home():
    logging.debug("Sirviendo index.html para /home")
    return send_from_directory('templates', 'index.html')

# Ruta para manejar todas las rutas desconocidas y servir el archivo index.html
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    logging.debug(f"Catch all route: {path}")
    # Verificar si la ruta solicitada es un archivo estático
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        logging.debug(f"Sirviendo archivo estático: {path}")
        return send_from_directory(app.static_folder, path)
    else:
        # De lo contrario, servir el archivo index.html
        logging.debug("Sirviendo index.html desde catch_all")
        return send_from_directory('templates', 'index.html')

if __name__ == '__main__':
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    logging.debug(f"Ejecutando en http://{local_ip}:5000")
    app.run(debug=True, host='0.0.0.0')
