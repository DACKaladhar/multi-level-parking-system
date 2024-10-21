// Enum to define the possible panel modes of application
export enum PanelMode {
  Monitor = 'Monitor', // the daily workplace of company admin
  Maintenance = 'Maintenance', // user can edit maintenance to slots
  Configure = 'Configure', // user can actually configure slot structure
}

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
  vehicleType?: VehicleType;
  parkingSlotType?: ParkingSlotType;
  maintenanceStatus?: MaintenanceStatus;
  securityType?: SecurityType;
  isAvailable: boolean;
}

// The main DB structure that incorporates maintenance data for each slot
export interface IMaintenanceSlot {
  rows: number;
  cols: number;
  maintenanceSlots: IMaintenanceSlotType[]; // Array of maintenance slot types for each slot in the floor
}

export interface IParkingSlotsDB {
  rows: number;
  cols: number;
  slots: boolean[];
}
