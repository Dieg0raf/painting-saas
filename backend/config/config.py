import os
from dotenv import load_dotenv

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # TODO: FIX Rate limiting to mee this apps requirements
    DEFAULT_RATE_LIMIT = os.getenv('DEFAULT_RATE_LIMIT', '100 per day')
    QUOTE_RATE_LIMIT = os.getenv('QUOTE_RATE_LIMIT', '100/day;5/hour;2/minute')
    
    # API Security
    API_KEY = os.getenv('API_KEY')
    
    # CORS settings
    CORS_ORIGINS = []

class DevelopmentConfig(Config):
    load_dotenv('.env.dev')

    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///quotes.db')
    CORS_ORIGINS = ["localhost:3000", "127.0.0.1:3000"]
    
    def __init__(self):
        print('Development environment')

class ProductionConfig(Config):
    load_dotenv('.env.prod')

    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', None)
    CORS_ORIGINS = [
        os.getenv("NEXT_JS_APP_HOST"),
        os.getenv("NEXT_JS_APP_HOST_v2")
    ]
    
    def __init__(self):
        print('Production environment')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    env = os.getenv('FLASK_ENV', 'development')
    print(env)
    return config.get(env, config['default'])