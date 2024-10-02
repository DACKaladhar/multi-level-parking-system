from config import db
from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.types import PickleType

Base = declarative_base()

class SlotEntry(db.Model):
  __tablename__ = 'slot_entries'

  id = Column(Integer, primary_key=True)
  data = Column(PickleType, nullable=False)  # This will store your 2D list

  def __init__(self, data):
      self.data = data

  def __repr__(self):
      return f"<SlotEntry(id={self.id}, data={self.data})>"

class SlotTypesEntry(db.Model):
  __tablename__ = 'slot_types_entries'

  id = Column(Integer, primary_key=True)
  data = Column(PickleType, nullable=False)  # This will store your 2D list

  def __init__(self, data):
      self.data = data

  def __repr__(self):
      return f"<SlotTypeEntry(id={self.id}, data={self.data})>"