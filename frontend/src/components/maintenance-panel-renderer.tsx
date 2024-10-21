import React, { useState } from "react";
import {
  IMaintenanceSlotType,
  IMaintenanceSlot,
  IParkingSlotsDB,
} from "./components-common-utils/common-parking-slot.interface";
import { ParkingSlotsViewRenderer } from "./parking-slots-view-renderer";
import "../components-styles/parking-slots-view.css";
import { MaintenanceModal } from "./maintenance-modal";

interface IMaintenancePanel {
  parkingSlotsDB: IParkingSlotsDB[][];
  maintenanceSlotsDB: IMaintenanceSlot[][];
  handleMaintenanceSave: (
    parkingSlotsDB: IParkingSlotsDB[][],
    maintenanceSlotsDB: IMaintenanceSlot[][],
    maintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => void;
}

/**
 * A component responsible for editing the properties of parking slots.
 * @param parkingSlotsDB - Main DB consists the structure of current parking facility
 * @param maintenanceSlotsDB - Main DB consists of current properties of parkign facility
 * @callback handleMaintenanceSave - when new properties are assigned to a specific slot
 * @returns Parking facility view and modal for editing if slot is clicked
 */

export const MaintenancePanelRenderer: React.FC<IMaintenancePanel> = ({
  parkingSlotsDB,
  maintenanceSlotsDB,
  handleMaintenanceSave,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  const handleSlotClick = (
    buildingIndex: number,
    floorIndex: number,
    slotNumber: number
  ) => {
    setSelectedBuildingIndex(buildingIndex);
    setSelectedFloorIndex(floorIndex);
    setSelectedSlot(slotNumber);
    setModalOpen(true);
  };

  const handleModalSave = (maintenanceSlot: IMaintenanceSlotType) => {
    handleMaintenanceSave(
      parkingSlotsDB,
      maintenanceSlotsDB,
      maintenanceSlot,
      selectedBuildingIndex,
      selectedFloorIndex,
      selectedSlot
    );
    setModalOpen(false);
  };

  return (
    <>
      <h1 style={{ fontWeight: "Lighter" }}>
        Define properties for your slots
      </h1>
      <ParkingSlotsViewRenderer
        parkingSlotsDB={parkingSlotsDB}
        onSlotClick={handleSlotClick}
        maintenanceSlotsDB={maintenanceSlotsDB}
      />
      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleModalSave}
      />
    </>
  );
};
