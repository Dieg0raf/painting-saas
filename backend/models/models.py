from enum import unique
from database import db

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

    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

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
    created_at = db.Column(db.DateTime, nullable=False, index=True)
    updated_at = db.Column(db.DateTime, nullable=False, index=True)

    def hasRole(self, role_name):
        return any(role.name == role_name for role in self.roles)

    def __repr__(self):
        return f"<User {self.username} : {self.email}>"

# class Invoice(db.Model):
#     __tablename__ = 'invoices'

#     allowed_permissions = ['admin', 'worker', 'manager']
#     id = db.Column(db.Integer, primary_key=True)
#     company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
#     company = db.relationship('Company', backref='invoices')

#     # optional fields for flexibility
#     customer_name = db.Column(db.String(120), nullable=True)
#     customer_email = db.Column(db.String(120), nullable=True)
#     customer_address = db.Column(db.String(255), nullable=True)
#     invoice_number = db.Column(db.String(50), nullable=True)
#     date_issued = db.Column(db.Date, nullable=True)
#     due_date = db.Column(db.Date, nullable=True)
#     status = db.Column(db.String(50), nullable=True, index=True)  # e.g., draft, sent, paid, quote
#     notes = db.Column(db.Text, nullable=True)
#     terms = db.Column(db.Text, nullable=True)
#     subtotal = db.Column(db.Float, nullable=True)
#     tax = db.Column(db.Float, nullable=True)
#     total = db.Column(db.Float, nullable=True)
#     currency = db.Column(db.String(10), nullable=True)

#     # You may want to add a relationship to line items in the future

#     created_at = db.Column(db.DateTime, nullable=False, index=True)
#     updated_at = db.Column(db.DateTime, nullable=False, index=True)

#     def __repr__(self):
#         return f"<Invoice {self.id}>"

# class Quote(db.Model):
#     __tablename__ = 'quotes'

#     allowed_permissions = ['admin', 'worker', 'manager']
#     id = db.Column(db.Integer, primary_key=True)
#     company_id = db.Column(db.Integer, db.ForeignKey('company.id'), nullable=False)
#     company = db.relationship('Company', backref='quotes')

#     # optional fields for flexibility
#     customer_name = db.Column(db.String(120), nullable=True)
#     customer_email = db.Column(db.String(120), nullable=True)
#     customer_address = db.Column(db.String(255), nullable=True)
#     invoice_number = db.Column(db.String(50), nullable=True)
#     date_issued = db.Column(db.Date, nullable=True)
#     due_date = db.Column(db.Date, nullable=True)
#     status = db.Column(db.String(50), nullable=True, index=True)  # e.g., draft, sent, paid, quote
#     notes = db.Column(db.Text, nullable=True)
#     terms = db.Column(db.Text, nullable=True)
#     subtotal = db.Column(db.Float, nullable=True)
#     tax = db.Column(db.Float, nullable=True)
#     total = db.Column(db.Float, nullable=True)
#     currency = db.Column(db.String(10), nullable=True)

#     # You may want to add a relationship to line items in the future

#     created_at = db.Column(db.DateTime, nullable=False, index=True)
#     updated_at = db.Column(db.DateTime, nullable=False, index=True)

#     def __repr__(self):
#         return f"<Invoice {self.id}>"