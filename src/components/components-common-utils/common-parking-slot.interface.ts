// Enum to define possible vehicle types
export enum VehicleType {
  TwoWheeler = '2-Wheeler',
  FourWheeler = '4-Wheeler',
  Handicapped = 'Handicapped',
  CustomizedVehicle = 'Customized Vehicle',
  Cab = 'Cab',
  Bicycle = 'Bicycle',
  Truck = 'Truck',
  Dual = 'Dual',
}

// Enum to define possible parking slot types
export enum ParkingSlotType {
  Regular = 'Regular', // P as a badge
  VisitorsParking = 'Visitors Parking', // visitor as a badge
  ElectricVehicle = 'Electric Vehicle', // leaf as a badge
  LongTermParking = 'Long-Term Parking', // calender as a badge
  OpenParking = 'Open Parking', // open as a badge
  Reserved = 'Reserved',  // reserved as a badge
}

// Enum to define possible statuses of slots
export enum MaintenanceStatus {
  UnderMaintenance = 'Under Maintenance',
  CurrentlyUnavailable = 'Currently Unavailable',
  ParkingAtOwnersRisk = "Parking At Owner's Risk",
}

// Enum to define security types
export enum SecurityType {
  Monitored = 'Monitored',
}

// Interface to define the maintenance slot type
export interface IMaintenanceSlotType {
  vehicleType?: VehicleType;             // Optional: Type of vehicle the slot is meant for
  parkingSlotType?: ParkingSlotType;     // Optional: Type of parking slot
  maintenanceStatus?: MaintenanceStatus;             // Optional: Type of service associated with the slot
  securityType?: SecurityType;           // Optional: Security measures associated with the slot
  isAvailable: boolean;                  // Required: Boolean to determine if the slot is available
}

// The main DB structure that incorporates maintenance data for each slot
export interface IMaintenanceSlot {
  rows: number;
  cols: number;
  maintenanceSlots: IMaintenanceSlotType[]; // Array of maintenance slot types for each slot in the floor
}
