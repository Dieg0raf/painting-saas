# utils
from utils import logger

# config
from config import get_config

# Flask
from flask import Flask, jsonify, request
from flask_cors import CORS

# JWT
from flask_jwt_extended import (
    create_access_token, 
    create_refresh_token,
    get_jwt_identity, 
    jwt_required,
    JWTManager
)

# Database
from database import db
from models import User, Company, Role

app = Flask(__name__)

# Load configurations
app.config.from_object(get_config())

# Initialize CORS with configured origins
CORS(app, origins=app.config['CORS_ORIGINS'])

# initialize the database
db.init_app(app)

# security
jwt = JWTManager(app)

with app.app_context():
    try:
        logger.info('Creating database tables')
        db.create_all()
        logger.info('Database tables created successfully')

        # create roles for app
        if not Role.query.filter_by(name="admin").first() and not Role.query.filter_by(name="user").first():
            logger.info('Creating roles')
            admin_role = Role(name="admin")
            user_role = Role(name="user")
            db.session.add_all([admin_role, user_role])
            db.session.commit()
            logger.info('Roles created successfully')

    except Exception as e:
        logger.error(f'Error creating database tables: {e}')

@app.route("/api/users", methods=['POST'])
def create_user():
    if not request.data:
        return jsonify({"error": "no data"}), 400
    
    try:
        data = request.get_json()

        if not data.get("role"):
            return jsonify({"error": "no role"}),400
        
        if not data.get("password"):
            return jsonify({"error": "no password"}),400
        
        if not data.get("company_id"):
            return jsonify({"error": "no company_id"}),400

        role = Role.query.filter_by(name=data.get("role")).first()
        if not role:
            return jsonify({"error": "invalid role"})

        user = User(
            username=data.get("username"), 
            email=data.get("email"), 
            roles=[role],
            company_id=data.get("company_id")
        )
        user.set_password(data.get("password"))

        db.session.add(user)
        db.session.commit()

        logger.info(f'User was created successfully: {user.username}')
        return jsonify({"message": "User was created successfully"})
    except Exception as e:
        logger.error(f'Error creating user: {e}')
        return jsonify({"error": "Failed to create user"}), 500
    
@app.route("/api/users", methods=['GET'])
@jwt_required()
# TODO: create decorator @roles_required("admin")
# TODO: Add pydantic for validation
def get_users():
    users = User.query.all()
    users_list = []
    for user in users:
        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "company_id": user.company_id,
            "roles": [role.name for role in user.roles],
            "created_at": user.created_at.isoformat() if user.created_at else None,
            "updated_at": user.updated_at.isoformat() if user.updated_at else None,
            # Flask-Security fields
            "active": getattr(user, "active", None),
            "confirmed_at": user.confirmed_at.isoformat() if getattr(user, "confirmed_at", None) else None,
            "last_login_at": user.last_login_at.isoformat() if getattr(user, "last_login_at", None) else None,
            "current_login_at": user.current_login_at.isoformat() if getattr(user, "current_login_at", None) else None,
            "last_login_ip": getattr(user, "last_login_ip", None),
            "current_login_ip": getattr(user, "current_login_ip", None),
            "login_count": getattr(user, "login_count", None),
            "fs_uniquifier": getattr(user, "fs_uniquifier", None),
        }
        users_list.append(user_dict)
    return jsonify({"users": users_list})

@app.route("/api/companies", methods=['POST'])
def create_company():
    if not request.data:
        return jsonify({"error": "no data"}), 400

    try: 
        data = request.get_json()
        company = Company(
            name=data.get("name"),
            phone_number=data.get("phone_number"),
            email=data.get("email"),
            logo=data.get("logo"),
        )
        db.session.add(company)
        db.session.commit()

        logger.info(f'Company was created successfully: {company.name}')
        return jsonify({"message": "Company was created successfully"})
    except Exception as e:
        logger.error(f'Error creating company: {e}')
        return jsonify({"error": "Failed to create company"}), 500

@app.route("/api/companies", methods=['GET'])
def get_companies():
    companies = Company.query.all()
    return jsonify({"companies": [{'name': company.name, 'id': company.id} for company in companies]})

@app.route("/api/login", methods=['POST'])
def api_login():
    try:

        data = request.get_json()
        if not data:
            logger.warning(f"No data sent")
            return jsonify({"error": "No data sent"}), 400

        user = User.query.filter_by(email=data.get("email", None)).first()
        if user and user.check_password(data.get("password", None)):
            # TODO: figure out if user.id is the best
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))

            logger.info({f"Successfully logged in"})
            return jsonify({
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user_id': user.id,
                'username': user.username,
                'role': user.roles[0].name if user.roles else 'user'
            })

        logger.warning(f"Invalid credentials")
        return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        logger.error(f"Error api logging in: {str(e)}")
        return jsonify({"error": "Failed to verify login"}), 500

@app.route("/api/refresh")
@jwt_required(refresh=True)
def api_refresh_token():
    try:
        user_id = get_jwt_identity()
        new_access_token = create_access_token(identity=user_id)
        logger.info(f"Access token was refreshed successfully")
        return jsonify({"access_token": new_access_token}), 200
    except Exception as e:
        logger.error(f"Token could not be refreshed: {str(e)}")
        return jsonify({"error": "Failed to refresh token"}), 401

@app.route("/admin")
@jwt_required()
# @roles_required("admin")
def admin_panel():
    return "Manager panel"

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])