from database import db
from datetime import datetime
from argon2 import PasswordHasher

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

class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    logo = db.Column(db.String(120), nullable=False)

    users = db.relationship("User", backref='company', lazy=True)

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