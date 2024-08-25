// Enum to define possible vehicle types
export enum VehicleType {
  TwoWheeler = '2-Wheeler',
  FourWheeler = '4-Wheeler',
  ThreeWheeler = '3-Wheeler',
  SpecialVehicle = 'Special Vehicle',
  CustomizedVehicle = 'Customized Vehicle',
  ElectricVehicle = 'Electric Vehicle',
}

// Enum to define possible parking slot types
export enum ParkingSlotType {
  Normal = 'Normal',
  Compact = 'Compact',
  Dual = 'Dual',
  Reserved = 'Reserved',
  Handicapped = 'Handicapped',
  ElectricCharging = 'Electric Charging',
  OverheadClearance = 'Overhead Clearance',
  Valet = 'Valet',
  Temporary = 'Temporary',
}

// Enum to define possible service types
export enum ServiceType {
  UnderMaintenance = 'Under Maintenance',
  CurrentlyUnavailable = 'Currently Unavailable',
  CleaningService = 'Cleaning Service',
  CarWash = 'Car Wash',
  BatteryService = 'Battery Service',
  TireService = 'Tire Service',
  FuelingService = 'Fueling Service',
  LongTermParking = 'Long-Term Parking',
}

// Enum to define occupancy status
export enum OccupancyStatus {
  Occupied = 'Occupied',
  Vacant = 'Vacant',
  Reserved = 'Reserved',
}

// Enum to define security types
export enum SecurityType {
  Monitored = 'Monitored',
  Gated = 'Gated',
  ParkingAtOwnersRisk = "ParkingAtOwnersRisk",
  SecurityPatrolled = 'Security Patrolled',
}

// Enum to define environmental impact
export enum EnvironmentalImpact {
  GreenSlot = 'Green Slot',
  SolarPowered = 'Solar-Powered Slot',
}

// Interface to define the maintenance slot type
export interface IMaintenanceSlotType {
  vehicleType?: VehicleType;             // Optional: Type of vehicle the slot is meant for
  parkingSlotType?: ParkingSlotType;     // Optional: Type of parking slot
  serviceType?: ServiceType;             // Optional: Type of service associated with the slot
  occupancyStatus?: OccupancyStatus;     // Optional: Occupancy status of the slot
  securityType?: SecurityType;           // Optional: Security measures associated with the slot
  environmentalImpact?: EnvironmentalImpact; // Optional: Environmental impact features
  isAvailable: boolean;                  // Required: Boolean to determine if the slot is available
}

// The main DB structure that incorporates maintenance data for each slot
export interface IMaintenanceSlot {
  rows: number;
  cols: number;
  slots: IMaintenanceSlotType[]; // Array of maintenance slot types for each slot in the floor
}
