# utils
from utils import logger

# config
from config import get_config

# Flask
from flask import Flask, jsonify, request
from flask_cors import CORS

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
with app.app_context():
    try:
        logger.info('Creating database tables')
        db.create_all()
        logger.info('Database tables created successfully')

        # create roles
        if not Role.query.filter_by(name="admin").first() and not Role.query.filter_by(name="user").first():
            logger.info('Creating roles')
            admin_role = Role(name="admin")
            user_role = Role(name="user")
            db.session.add_all([admin_role, user_role])
            db.session.commit()
            logger.info('Roles created successfully')

    except Exception as e:
        logger.error(f'Error creating database tables: {e}')


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'])