from functools import wraps
from flask import request, jsonify
# JWT
from flask_jwt_extended import (
    get_jwt, 
    get_jwt_identity, 
)
from .logger import logger

def required_roles(required_roles=None):
    def decorator(func):
        @wraps(func) # This preserves the metadata of the function
        def wrapper(*args, **kwargs):
            try:
                print(required_roles)
                if not required_roles:
                    logger.error({"error": "required_roles was not passed in!"})
                    return jsonify({"error": "Internal Server Error"}), 500

                user_id = get_jwt_identity()
                current_user_claims = get_jwt()
                user_roles = current_user_claims.get("roles")

                if not user_roles:
                    logger.error(f"User {user_id} is trying to access an invalid endpoint ==> Roles required **{str(required_roles)}** and user roles **{str(user_roles)}**")
                    return jsonify({"error": "Invalid access"}), 401
                
                # check if all required_roles are present in user_roles
                for r in required_roles:
                    if r not in user_roles:
                        logger.error(f"User {user_id} is trying to access an invalid endpoint")
                        return jsonify({"error": "Invalid access, you don't have the correct permissions"}), 400

                logger.info(f"User {user_id} has all required roles!")
                return func(*args, **kwargs)

            except Exception as e:
                logger.error(f"Error checking roles: {str(e)}")
                return jsonify({'error': str(e)}), 400
            
        return wrapper
    return decorator