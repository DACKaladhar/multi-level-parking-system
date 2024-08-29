import React, { useState } from "react";
import { IParkingSlotsDB } from "./CreatorPanel";
import {
  IMaintenanceSlotType,
  IMaintenanceSlot,
} from "./components-common-utils/common-parking-slot.interface";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
import { MaintenanceModal } from "./maintenance-modal";

interface IMaintenancePanel {
  parkingSlotsDB: IParkingSlotsDB[][];
  maintenanceSlotsDB: IMaintenanceSlot[][];
  setMaintenanceSlotsDB: React.Dispatch<
    React.SetStateAction<IMaintenanceSlot[][]>
  >;
  handleMaintenanceSave: (
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

export const MaintenancePanel: React.FC<IMaintenancePanel> = ({
  parkingSlotsDB,
  maintenanceSlotsDB,
  setMaintenanceSlotsDB,
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
    // reminder, these won't get updated until a slot is clicked in AvailableParkingSlotsView
    // so selected building/floor index can be irrelavant, until slot is clicked
    setSelectedBuildingIndex(buildingIndex);
    setSelectedFloorIndex(floorIndex);
    setSelectedSlot(slotNumber);
    setModalOpen(true);
  };

  const handleModalSave = (maintenanceSlot: IMaintenanceSlotType) => {
    handleMaintenanceSave(
      maintenanceSlot,
      selectedBuildingIndex,
      selectedFloorIndex,
      selectedSlot
    );
    setModalOpen(false);
  };

  return (
    <>
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
