# main.py
from flask import Blueprint, send_from_directory, current_app, request, redirect, url_for
from routes.token import token_required  # Asegúrate de importar tu decorador correctamente
import os
import logging

main_bp = Blueprint('main', __name__, static_folder='../templates')

@main_bp.route('/')
def index():
    logging.debug("Accediendo a /")
    return send_from_directory(main_bp.static_folder, 'index.html')

@main_bp.route('/home')
@token_required
def home(current_user):
    logging.debug("Accediendo a /home")
    return send_from_directory(main_bp.static_folder, 'index.html')

# Asegurar que cualquier ruta desconocida sirva index.html
@main_bp.route('/<path:path>')
def catch_all(path):
    logging.debug(f"Catch all route in blueprint: {path}")
    if path != "" and os.path.exists(os.path.join(main_bp.static_folder, path)):
        logging.debug(f"Sirviendo archivo estático: {path}")
        return send_from_directory(main_bp.static_folder, path)
    else:
        logging.debug("Sirviendo index.html desde catch_all en blueprint")
        return send_from_directory(main_bp.static_folder, 'index.html')
