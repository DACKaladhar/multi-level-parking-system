from flask import request, jsonify
from config import app, db
from models import SlotEntry, SlotTypesEntry  # Assuming your model is named SlotEntry

# Initialize with a default value if the table is empty
def initialize_db():
    if SlotEntry.query.count() == 0:
        default_data = [[{"rows": 0, "cols": 0, "slots": []}]]
        initial_entry = SlotEntry(data=default_data)
        db.session.add(initial_entry)
    if SlotTypesEntry.query.count() == 0:
        default_maintenance_data = [[{"rows": 0, "cols": 0, "maintenanceSlots": []}]]
        initial_maintenance_entry = SlotTypesEntry(data=default_maintenance_data)
        db.session.add(initial_maintenance_entry)
    
    db.session.commit()

@app.route('/api/parking-slots', methods=['GET'])
def manage_parking_slots():
    if request.method == 'GET':
        # Retrieve the single entry
        entry = SlotEntry.query.first()
        if entry:
            return jsonify({"data": entry.data}), 200
        else:
            return jsonify({"error": "No parking slots found"}), 404

@app.route('/api/maintenance-slots', methods=['GET', 'POST'])
def manage_maintenance_slots():
    if request.method == 'POST':
        # Expecting JSON data to replace the maintenance slots
        data = request.get_json()
        if data is None:
            return jsonify({"error": "Invalid data"}), 400

        # Replace the existing entry
        existing_entry = SlotTypesEntry.query.first()  # Get the single entry
        if existing_entry:
            existing_entry.data = data  # Update the data
        else:
            existing_entry = SlotTypesEntry(data=data)  # Create if not exists
            db.session.add(existing_entry)

        db.session.commit()
        return jsonify({"message": "Maintenance slots updated successfully"}), 200

    elif request.method == 'GET':
        # Retrieve the single entry
        entry = SlotTypesEntry.query.first()
        if entry:
            return jsonify({"data": entry.data}), 200
        else:
            return jsonify({"error": "No maintenance slots found"}), 404

@app.route('/api/configure-slots', methods=['POST'])
def configure_slots():
    data = request.get_json()
    
    if not data or 'psdb' not in data or 'msdb' not in data:
        return jsonify({"error": "Invalid data, 'psdb' and 'msdb' are required"}), 400
    
    psdb_data = data['psdb']
    msdb_data = data['msdb']
    
    try:
        # Start a transaction
        # Update or create Parking slots (psdb)
        existing_parking_entry = SlotEntry.query.first()
        if existing_parking_entry:
            existing_parking_entry.data = psdb_data
        else:
            existing_parking_entry = SlotEntry(data=psdb_data)
            db.session.add(existing_parking_entry)

        # Update or create Maintenance slots (msdb)
        existing_maintenance_entry = SlotTypesEntry.query.first()
        if existing_maintenance_entry:
            existing_maintenance_entry.data = msdb_data
        else:
            existing_maintenance_entry = SlotTypesEntry(data=msdb_data)
            db.session.add(existing_maintenance_entry)

        # Commit both entries at once
        db.session.commit()

        return jsonify({"message": "Slots updated successfully"}), 200

    except Exception as e:
        # Rollback in case of any error
        db.session.rollback()
        return jsonify({"error": f"Failed to update slots: {str(e)}"}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        initialize_db()  # Initialize the database with default data if empty
  
    app.run(debug=True)
