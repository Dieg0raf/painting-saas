from flask import Blueprint, jsonify, request
from database import db
from models import User, Estimate, EstimateDescription, EstimateItem, EstimateStatus, Customer
from utils import logger, required_roles
from flask_jwt_extended import jwt_required, get_jwt_identity

estimates_bp = Blueprint('estimates', __name__, url_prefix='/api/estimates')

@estimates_bp.route('', methods=['GET'])
@jwt_required()
@required_roles(['admin'])
def get_estimates():
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()

        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404
        
        # query = Estimate.query.filter_by(company_id=user.company_id)
        
        # Phase 1 (Essential):
# ✅ Backend pagination (page, limit)
        # Basic search (estimate name, customer name)
        # Status filtering
        # Frontend pagination controls

        # Phase 2 (Nice to have):
# 🔄 Customer filtering
        # Date range filtering
        # Sorting options

        # Phase 3 (Advanced):
        # Infinite scroll option
        # Advanced search
        # Export functionality

        # TODO: handle pagination 
        # TODO: add pydantic models for the response


        estimates = Estimate.query.filter_by(company_id=user.company_id).join(Customer).all()
        if not estimates:
            logger.error(f"No estimates found")
            return jsonify({"estimates": []}), 200

        estimates_list = []
        for estimate in estimates:
            estimates_list.append(
                {
                    "id": estimate.id,
                    "name": estimate.name,
                    "total": estimate.total,
                    "notes": estimate.notes,
                    "customer_id": estimate.customer_id,
                    "customer": {
                        "name": estimate.customer.name,
                        "email": estimate.customer.email,
                        "phone_number": estimate.customer.phone_number,
                        "address": estimate.customer.address,
                        "city": estimate.customer.city,
                        "state": estimate.customer.state,
                        "zip_code": estimate.customer.zip_code,
                        "country": estimate.customer.country,
                    },
                    "status": estimate.status.value,
                    "created_at": estimate.created_at,
                    "updated_at": estimate.updated_at,
                    "description": {
                        "id": estimate.description.id,
                        "title": estimate.description.title,
                        "work_types": estimate.description.work_types,
                        "items": [{
                            "id": item.id,
                            "area": item.area,
                            "work_details": item.work_details,
                            "notes_extras": item.notes_extras,
                            "created_at": item.created_at,
                            "updated_at": item.updated_at,
                        } for item in estimate.description.items],
                    }
                }
            )

        return jsonify({"estimates": estimates_list}), 200
    except Exception as e:
        logger.error(f"Error getting estimates: {str(e)}")
        return jsonify({"error": "Failed to get estimates"}), 500
    
@estimates_bp.route('/<int:estimate_id>', methods=['GET'])
@jwt_required()
@required_roles(['admin'])
def get_estimate(estimate_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404
        
        estimate = Estimate.query.filter_by(id=estimate_id, company_id=user.company_id).first()
        if not estimate:
            logger.error(f"Estimate not found")
            return jsonify({"error": "Estimate not found"}), 404

        estimate_response = {
                    "id": estimate.id,
                    "name": estimate.name,
                    "total": estimate.total,
                    "notes": estimate.notes,
                    "customer_id": estimate.customer_id,
                    "customer": {
                        "name": estimate.customer.name,
                        "email": estimate.customer.email,
                        "phone_number": estimate.customer.phone_number,
                        "address": estimate.customer.address,
                        "city": estimate.customer.city,
                        "state": estimate.customer.state,
                        "zip_code": estimate.customer.zip_code,
                        "country": estimate.customer.country,
                    },
                    "status": estimate.status.value,
                    "created_at": estimate.created_at,
                    "updated_at": estimate.updated_at,
                    "description": {
                        "id": estimate.description.id,
                        "title": estimate.description.title,
                        "work_types": estimate.description.work_types,
                        "items": [{
                            "id": item.id,
                            "area": item.area,
                            "work_details": item.work_details,
                            "notes_extras": item.notes_extras,
                            "created_at": item.created_at,
                            "updated_at": item.updated_at,
                        } for item in estimate.description.items],
                    }
                }
        return jsonify({"estimate": estimate_response}), 200
    except Exception as e:
        logger.error(f"Error getting estimate: {str(e)}")
        return jsonify({"error": "Failed to get estimate"}), 500

@estimates_bp.route('', methods=['POST'])
@jwt_required()
@required_roles(['admin'])
def create_estimate():
    try:
        data = request.get_json()

        if not data:
            logger.error(f"No data provided")
            return jsonify({"error": "No data provided"}), 400

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404

        estimate = Estimate(
            name=data.get('name'),
            total=data.get('total'),
            notes=data.get('notes'),
            customer_id=data.get('customer_id'),
            company_id=user.company_id,
            created_by_id=user.id,
            status=EstimateStatus.DRAFT,
        )
        db.session.add(estimate)
        db.session.flush()  # Assigns estimate.id before using it

        description = EstimateDescription(
            estimate_id=estimate.id,
            title=data.get('description').get('title'),
            work_types=data.get('description').get('work_types'),
        )
        db.session.add(description)
        db.session.flush()  # Assigns description.id

        items = data.get('description').get('items')
        for item in items:
            new_item = EstimateItem(
                estimate_description_id=description.id,
                estimate_id=estimate.id,
                area=item.get('area'),
                work_details=item.get('work_details'),
                notes_extras=item.get('notes_extras'),
            )
            db.session.add(new_item)

        db.session.commit()

        estimate_response = {
            "id": estimate.id,
            "name": estimate.name,
            "total": estimate.total,
            "notes": estimate.notes,
            "customer_id": estimate.customer_id,
            # TODO: Add customer to the response (if needed for frontend - not sure if needed)
            # "customer": {
            #     "name": estimate.customer.name,
            #     "email": estimate.customer.email,
            #     "phone_number": estimate.customer.phone_number,
            #     "address": estimate.customer.address,
            #     "city": estimate.customer.city,
            #     "state": estimate.customer.state,
            #     "zip_code": estimate.customer.zip_code,
            #     "country": estimate.customer.country,
            # },
            "status": estimate.status.value,
            "created_at": estimate.created_at,
            "updated_at": estimate.updated_at,
            "description": {
                "id": estimate.description.id,
                "title": estimate.description.title,
                "work_types": estimate.description.work_types,
                "items": [{
                    "id": item.id,
                    "area": item.area,
                    "work_details": item.work_details,
                    "notes_extras": item.notes_extras,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at,
                } for item in estimate.description.items],
            }
        }

        print("estimate_response: ", estimate_response)
        return jsonify({"estimate": estimate_response, "message": "Estimate created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating estimate: {str(e)}")
        return jsonify({"error": "Failed to create estimate"}), 500
    
@estimates_bp.route('/<int:estimate_id>', methods=['PATCH'])
@jwt_required()
@required_roles(['admin'])
def update_estimate(estimate_id):
    try:
        data = request.get_json()

        if not data:
            logger.error(f"No data provided")
            return jsonify({"error": "No data provided"}), 400

        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        
        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404
        
        # Find the estimate
        estimate = Estimate.query.filter_by(id=estimate_id, company_id=user.company_id).first()
        if not estimate:
            logger.error(f"Estimate not found")
            return jsonify({"error": "Estimate not found"}), 404
        
        # Update basic estimate fields
        if 'name' in data:
            estimate.name = data['name']
            print(f"Estimate name updated to: {estimate.name}")
        if 'total' in data:
            estimate.total = data['total']
            print(f"Estimate total updated to: {estimate.total}")
        if 'notes' in data:
            estimate.notes = data['notes']
            print(f"Estimate notes updated to: {estimate.notes}")
        if 'customer_id' in data:
            estimate.customer_id = data['customer_id']
            print(f"Estimate customer id updated to: {estimate.customer_id}")
        if 'status' in data:
            # Convert string to enum
            try:
                estimate.status = EstimateStatus(data['status'])
            except ValueError:
                print(f"Invalid status value: {data['status']}")
                return jsonify({"error": "Invalid status value"}), 400
        
        # Update description if provided
        if 'description' in data:
            description_data = data['description']
            print("Estimate description data: ", description_data)
            if estimate.description:
                if 'title' in description_data:
                    estimate.description.title = description_data['title']
                    print(f"Estimate description title updated to: {estimate.description.title}")
                if 'work_types' in description_data:
                    estimate.description.work_types = description_data['work_types']
                    print(f"Estimate description work types updated to: {estimate.description.work_types}")
                
                # Update items if provided
                if 'items' in description_data:
                    # Delete existing items
                    # TODO Figure out a way to update EstimateItems that already exist and also handle new items
                    for item in estimate.description.items:
                        db.session.delete(item)
                        print(f"Deleted item: {item.id}")
                    # Add new items
                    for item_data in description_data['items']:
                        new_item = EstimateItem(
                            estimate_description_id=estimate.description.id,
                            estimate_id=estimate.id,
                            area=item_data.get('area'),
                            work_details=item_data.get('work_details'),
                            notes_extras=item_data.get('notes_extras', [])
                        )
                        db.session.add(new_item)
                        print(f"Added new item: {new_item.id}")
        
        estimate.updated_at = db.func.now()
        db.session.commit()
        
        updated_estimate = {
            "id": estimate.id,
            "name": estimate.name,
            "total": estimate.total,
            "notes": estimate.notes,
            "customer_id": estimate.customer_id,
            "customer": {
                "id": estimate.customer.id,
                "name": estimate.customer.name,
                "email": estimate.customer.email,
                "phone_number": estimate.customer.phone_number,
                "address": estimate.customer.address,
                "city": estimate.customer.city,
                "state": estimate.customer.state,
                "zip_code": estimate.customer.zip_code,
                "country": estimate.customer.country,
            },
            "status": estimate.status.value,
            "created_at": estimate.created_at,
            "updated_at": estimate.updated_at,
            "description": {
                "id": estimate.description.id,
                "title": estimate.description.title,
                "work_types": estimate.description.work_types,
                "items": [{
                    "id": item.id,
                    "area": item.area,
                    "work_details": item.work_details,
                    "notes_extras": item.notes_extras,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at,
                } for item in estimate.description.items],
            }
        }
        
        return jsonify({
            "estimate": updated_estimate,
            "message": "Estimate updated successfully"
        }), 200
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error updating estimate: {str(e)}")
        return jsonify({"error": "Failed to update estimate"}), 500
    
@estimates_bp.route('/<int:estimate_id>', methods=['DELETE'])
@jwt_required()
@required_roles(['admin'])
def delete_estimate(estimate_id):
    try:
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        if not user:
            logger.error(f"User not found")
            return jsonify({"error": "User not found"}), 404
        
        estimate = Estimate.query.filter_by(id=estimate_id, company_id=user.company_id).first()
        if not estimate:
            logger.error(f"Estimate not found")
            return jsonify({"error": "Estimate not found"}), 404
        
        db.session.delete(estimate)
        db.session.commit()
        
        return jsonify({"message": "Estimate deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error deleting estimate: {str(e)}")
        return jsonify({"error": "Failed to delete estimate"}), 500
    