from flask import Blueprint, jsonify, request
from database import db
from models import User, Customer
from utils import logger, required_roles
from flask_jwt_extended import jwt_required, get_jwt_identity

customers_bp = Blueprint('customers', __name__, url_prefix='/api/customers')

@customers_bp.route('', methods=['GET'])
@jwt_required()
@required_roles(['admin'])
def get_customers():
    try:
        user_id = get_jwt_identity()

        user = User.query.filter_by(id=user_id).first()
        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404

        customers = Customer.query.filter_by(company_id=user.company_id).all()
        if not customers:
            logger.error(f"No customers found")
            return jsonify({"customers": []}), 200

        customers_list = []
        for customer in customers:
            customers_list.append({
                "id": customer.id,
                "name": customer.name,
                "phone_number": customer.phone_number,
                "email": customer.email,
                "address": customer.address,
                "city": customer.city,
                "state": customer.state,
                "zip_code": customer.zip_code,
                "country": customer.country,
            })
        return jsonify({"customers": customers_list}), 200
    except Exception as e:
        logger.error(f"Error getting customers: {str(e)}")
        return jsonify({"error": "Failed to get customers"}), 500
    
@customers_bp.route('/<int:customer_id>', methods=['GET'])
@jwt_required()
@required_roles(['admin'])
def get_customer(customer_id):
    try:
        customer = Customer.query.filter_by(id=customer_id).first()
        if not customer:
            logger.error(f"Customer not found")
            return jsonify({"error": "Customer not found"}), 404
        customer_response = {
            "id": customer.id,
            "name": customer.name,
            "phone_number": customer.phone_number,
            "email": customer.email,
            "address": customer.address,
            "city": customer.city,
            "state": customer.state,
            "zip_code": customer.zip_code,
            "country": customer.country,
        }
        print("customer_response: ", customer_response)

        return jsonify({"customer": customer_response}), 200
    except Exception as e:
        logger.error(f"Error getting customer: {str(e)}")
        return jsonify({"error": "Failed to get customer"}), 500
    
@customers_bp.route('', methods=['POST'])
@jwt_required()
@required_roles(['admin'])
def create_customer():
    try:
        data = request.get_json()
        customer = Customer(
            name=data.get('name'),
            phone_number=data.get('phone_number'),
            email=data.get('email'),
            company_id=data.get('company_id'),
            address=data.get('address'),
            city=data.get('city'),
            state=data.get('state'),
            zip_code=data.get('zip_code'),
            country=data.get('country'),
        )
        db.session.add(customer)
        db.session.commit()
        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        logger.error(f"Error creating customer: {str(e)}")
        return jsonify({"error": "Failed to create customer"}), 500
    
@customers_bp.route('/<int:customer_id>', methods=['PATCH'])
@jwt_required()
@required_roles(['admin'])
def update_customer(customer_id):
    try:
        data = request.get_json()
        customer = Customer.query.filter_by(id=customer_id).first()
        if not customer:
            logger.error(f"Customer not found")
            return jsonify({"error": "Customer not found"}), 404
        if 'name' in data:
            customer.name = data['name']
        if 'phone_number' in data:
            customer.phone_number = data['phone_number']
        if 'email' in data:
            customer.email = data['email']
        if 'address' in data:
            customer.address = data['address']
        if 'city' in data:
            customer.city = data['city']
        if 'state' in data:
            customer.state = data['state']
        if 'zip_code' in data:
            customer.zip_code = data['zip_code']
        if 'country' in data:
            customer.country = data['country']
        customer.updated_at = db.func.now()
        db.session.commit()
        customer_response = {
            "id": customer.id,
            "name": customer.name,
            "phone_number": customer.phone_number,
            "email": customer.email,
            "address": customer.address,
            "city": customer.city,
            "state": customer.state,
            "zip_code": customer.zip_code,
            "country": customer.country,
        }
        print("customer_response: ", customer_response)
        return jsonify({"customer": customer_response, "message": "Customer updated successfully"}), 200
    except Exception as e:
        logger.error(f"Error updating customer: {str(e)}")
        return jsonify({"error": "Failed to update customer"}), 500
    
@customers_bp.route('/<int:customer_id>', methods=['DELETE'])
@jwt_required()
@required_roles(['admin'])
def delete_customer(customer_id):
    try:
        customer = Customer.query.filter_by(id=customer_id).first()
        if not customer:
            logger.error(f"Customer not found")
            return jsonify({"error": "Customer not found"}), 404
        db.session.delete(customer)
        db.session.commit()
        return jsonify({"message": "Customer deleted successfully"}), 200
    except Exception as e:  
        logger.error(f"Error deleting customer: {str(e)}")
        return jsonify({"error": "Failed to delete customer"}), 500