from database import db
from datetime import datetime
from argon2 import PasswordHasher
import enum


# TODO: Create a model for the Invoices table

class WorkType(enum.Enum):
    EXTERIOR = 'exterior'
    INTERIOR = 'interior'

class EstimateStatus(enum.Enum):
    DRAFT = 'draft'
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'
    COMPLETED = 'completed'
    PROGRESS = 'in_progress'


# junction table (an association table)
roles_users = db.Table('roles_users',
    db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
)

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f"<Role {self.name}>"
class Estimate(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # status of the estimate
    status = db.Column(db.Enum(EstimateStatus), nullable=False, default=EstimateStatus.DRAFT)

    # info about the estimate
    name = db.Column(db.String(80), nullable=False)
    total = db.Column(db.Float, nullable=False)
    notes = db.Column(db.JSON, nullable=True, default=list)

    # Foreign keys (stored in the database)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
    created_by_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Add this

    # Relationships (Python-level convenience, only exists in python, not in the database)
    customer = db.relationship('Customer', backref='estimates', lazy=True)
    company = db.relationship('Company', backref='estimates', lazy=True)
    created_by = db.relationship('User', backref='estimates', lazy=True)
    description = db.relationship('EstimateDescription', backref='estimate', lazy=True, uselist=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return f"<Estimate {self.name}>"
class EstimateDescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    estimate_id = db.Column(db.Integer, db.ForeignKey('estimate.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False, default='')

    # Work types for the description (e.g., ['exterior'], ['interior'], or ['exterior', 'interior'])
    # TODO: Update to array when changing to Postgres, SQLite does not support ARRAY type
    # work_types = db.Column(db.ARRAY(db.Enum(WorkType)), nullable=False, default=[])
    work_types = db.Column(db.JSON, nullable=False, default=list)

    # Individual items for the description
    items = db.relationship('EstimateItem', backref='estimate_description', lazy=True, cascade='all, delete-orphan')

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

class EstimateItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # Foreign keys
    estimate_description_id = db.Column(db.Integer, db.ForeignKey('estimate_description.id'), nullable=False)
    estimate_id = db.Column(db.Integer, db.ForeignKey('estimate.id'), nullable=False)

    # row info for each item
    area = db.Column(db.String(100), nullable=False)
    work_details = db.Column(db.JSON, nullable=False)
    notes_extras = db.Column(db.JSON, nullable=True, default=list)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    
    def __repr__(self):
        return f'<EstimateItem {self.area}>'

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    logo = db.Column(db.String(120), nullable=False)

    # TODO: Add LLC field

    # Customer address info
    address = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    zip_code = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return f"<Customer {self.name}>"

    
class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    users = db.relationship("User", backref='company', lazy=True)

    # Company address info
    name = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    logo = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(120), nullable=False)
    state = db.Column(db.String(120), nullable=False)
    zip_code = db.Column(db.String(120), nullable=False)
    country = db.Column(db.String(120), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __repr__(self):
        return f"<Company {self.name}>"

class User(db.Model):
    # secondary tells SQLAlchemy which table to use as the junction table for many-to-many relationship
    roles = db.relationship('Role', secondary=roles_users, backref='roled')

    # user info
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    # company info
    company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)

    # timestamps
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def set_password(self, password):
        ph = PasswordHasher()
        self.password = ph.hash(password)
    
    def check_password(self, password):
        ph = PasswordHasher()
        try:
            ph.verify(self.password, password)
            return True
        except:
            return False

    def hasRole(self, role_name):
        return any(role.name == role_name for role in self.roles)

    def __repr__(self):
        return f"<User {self.username} : {self.email}>"