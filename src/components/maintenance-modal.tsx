import React, { useState } from "react";
import {
  VehicleType,
  ParkingSlotType,
  MaintenanceStatus,
  SecurityType,
  IMaintenanceSlotType,
  WriteIntoMSDBResponse,
} from "./components-common-utils/common-parking-slot.interface";
import "../components-styles/maintenance-modal.css";

interface IMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    maintenanceSlot: IMaintenanceSlotType
  ) => Promise<WriteIntoMSDBResponse>;
  initialData?: IMaintenanceSlotType;
}

/**
 *
 * @param isOpen - A boolean decides the render state of modal(open or not)
 * @param initialData - If a single slot is selected for editing, its current properties are being sent to modal
 * @param onCLose - A callback which handles closing the modal from parent
 * @param onSave - A callback which saves the new edited properties from this modal in the parent
 * @returns A modal where user can edit the properties of the selected slot/s
 */

export const MaintenanceModal: React.FC<IMaintenanceModalProps> = ({
  isOpen,
  initialData,
  onClose,
  onSave,
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

  const handleSave = async () => {
    const status = await onSave(maintenanceSlot);
    status.success
      ? onClose()
      : alert(
          "Problem encountered updating the properties | retry same operation"
        );
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
