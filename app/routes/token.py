# token.py
from functools import wraps
from flask import request, redirect, url_for, current_app
import jwt
from models.users import User  # Asegúrate de tener el modelo User definido

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get('token') or request.headers.get('x-access-token')
        
        if not token:
            return redirect(url_for('serve_index'))

        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return redirect(url_for('serve_index'))
        
        return f(current_user, *args, **kwargs)
    
    return decorated_function
