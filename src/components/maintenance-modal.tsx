import React, { useState } from "react";
import {
  VehicleType,
  ParkingSlotType,
  MaintenanceStatus,
  SecurityType,
  IMaintenanceSlotType,
} from "./components-common-utils/common-parking-slot.interface";
import "../components-styles/maintenance-modal.css";

interface IMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (maintenanceSlot: IMaintenanceSlotType) => void;
  initialData?: IMaintenanceSlotType;
}

export const MaintenanceModal: React.FC<IMaintenanceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [maintenanceSlot, setMaintenanceSlot] = useState<IMaintenanceSlotType>({
    ...initialData,
    isAvailable: initialData?.isAvailable ?? true,
  });

  const handleCheckboxChange = (
    field: keyof IMaintenanceSlotType,
    value: any
  ) => {
    setMaintenanceSlot((prev) => ({
      ...prev,
      [field]: prev[field] === value ? null : value,
    }));
  };

  const handleSave = () => {
    onSave(maintenanceSlot);
    onClose();
  };

  if (!isOpen) return null;

  type MaintenanceSlotKey = keyof IMaintenanceSlotType;

  const categories = [
    {
      title: "Vehicle Type",
      enum: VehicleType,
      key: "vehicleType" as MaintenanceSlotKey,
    },
    {
      title: "Parking Slot Type",
      enum: ParkingSlotType,
      key: "parkingSlotType" as MaintenanceSlotKey,
    },
    {
      title: "Maintenance Status",
      enum: MaintenanceStatus,
      key: "maintenanceStatus" as MaintenanceSlotKey,
    },
    {
      title: "Security Type",
      enum: SecurityType,
      key: "securityType" as MaintenanceSlotKey,
    },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Configure Maintenance Slot</h2>

        {categories.map((category) => (
          <div className="modal-section" key={category.key}>
            <h3>{category.title}</h3>
            {Object.values(category.enum).map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  checked={maintenanceSlot[category.key] === value}
                  onChange={() => handleCheckboxChange(category.key, value)}
                />
                {value}
              </label>
            ))}
          </div>
        ))}

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};
