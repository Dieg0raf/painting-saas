from functools import wraps
from flask import request, jsonify
# JWT
from flask_jwt_extended import (
    get_jwt_identity, 
)
from .logger import logger

def required_roles(required_roles=None):
    def decorator(func):
        @wraps(func) # This preserves the metadata of the function
        def wrapper(*args, **kwargs):
            try:
                current_user = get_jwt_identity()
                # check if the required fields are configured
                print(current_user)

                return func(*args, **kwargs)

            except Exception as e:
                logger.error(f'Error validating JSON: {str(e)}')
                return jsonify({'error': str(e)}), 400
            
        return wrapper
    return decorator