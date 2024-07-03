from flask import Flask
import socket
from models.database import init_db
from routes.auth import auth_bp
from routes.main import main_bp  # Importar el blueprint main

app = Flask(__name__, static_folder='templates/static')

app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos
init_db(app)

# Registrar Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(main_bp)  # Registrar el blueprint main

if __name__ == '__main__':
    # Obtener la dirección IP de la máquina
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname)
    
    # Configurar y ejecutar la aplicación Flask
    print(f"Running on http://{local_ip}:5000")
    app.run(debug=True, host='0.0.0.0')
