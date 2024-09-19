from config import app, db
from models import SlotEntry, SlotTypesEntry

# This is used to delete all the data in the tables
# THIS IS USED TO DELETE ALL THE DATA IN THE TABLES

def clear_database():
    with app.app_context():
        # Drop all tables
        db.drop_all()
        # Create all tables again to reset the database
        db.create_all()
        print("Database cleared successfully.")

if __name__ == "__main__":
    clear_database()
