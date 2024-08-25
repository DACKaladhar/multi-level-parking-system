import React, { useState } from "react";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";
import { IParkingSlotsDB } from "./CreatorPanel";
import { IMaintenanceSlotType } from "./components-common-utils/common-parking-slot.interface";

interface IMaintenancePanel {
  parkingSlotsDB: IParkingSlotsDB[][];
  maintenanceSlotsDB: IMaintenanceSlotType[][];
  callbackOnEdit: () => void;
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
  callbackOnEdit,
}) => {
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  const handleBuildingChange = (
    selectedBuilding: number,
    totalBuildings: number
  ) => {
    setSelectedBuildingIndex(selectedBuilding);
  };

  const handleFloorChange = (selectedFloor: number, totalFloors: number) => {
    setSelectedFloorIndex(selectedFloor);
  };

  return (
    <>
      <BuildingDropdown
        canAddBuilding={false}
        totalBuildings={parkingSlotsDB.length}
        onBuildingChange={handleBuildingChange}
      />
      <FloorDropdown
        canAddFloor={true}
        onFloorChange={handleFloorChange}
        selectedFloor={selectedFloorIndex}
        totalFloors={parkingSlotsDB[selectedBuildingIndex].length}
      />
    </>
  );
};
