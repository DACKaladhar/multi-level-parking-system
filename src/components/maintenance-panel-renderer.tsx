import React, { useState } from "react";
import { IParkingSlotsDB } from "./configuration-panel-container";
import {
  IMaintenanceSlotType,
  IMaintenanceSlot,
} from "./components-common-utils/common-parking-slot.interface";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
import "../components-styles/AvailableSlotsView.css";
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
 * follow ups-
 * have a DB<useState> storing [buildingIndex, floorIndex, rows, cols, deselectedParkingSlots]
 * Re-render new @component ConfigureRowColSlots on floor or building change
 * render save && configure button in ConfigureRowColSlots
 *
 * refactor ConfigureRowColSlots-
 * @render new configure button & save button
 * @prop deselectedParkingSlots, @prop setDeselectedParkingSlots for already saved parking slots
 * @prop row, @prop col- for displaying already saved parking slots
 * @callback save- takes function @params [row, col, deselectedParkingSlots] stores the data into DB
 * save button styling change if already saved and opened.
 * save button styling change if already saved state to edited.
 * @callback configure- should work only if building X floors are saved
 *
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
      <AvailableParkingSlotsView
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
