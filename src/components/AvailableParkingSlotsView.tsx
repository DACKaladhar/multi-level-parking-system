import React, { useState } from "react";
import "../components-styles/AvailableSlotsView.css";
import { IParkingSlotsDB } from "./CreatorPanel";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";

interface IAvailableSlotsViewProps {
  parkingSlotsDB: IParkingSlotsDB[][];
  onConfigure: () => void;
}
/**
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @param unavailableSlots - Boolean array indicating unavailable slots.
 * @returns A grid of Available Parking Slots
 */
export const AvailableParkingSlotsView: React.FC<IAvailableSlotsViewProps> = ({
  parkingSlotsDB,
  onConfigure,
}) => {
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const buttons = [];
  const rows = parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].rows;
  const cols = parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].cols;
  const unavailableSlots =
    parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].slots;
  for (let i = 0; i < rows; i++) {
    const rowButtons = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      rowButtons.push(
        <button
          key={index}
          className={`square-button ${
            unavailableSlots[index] ? "" : "disappear"
          }`}
        >
          {unavailableSlots[index] ? index + 1 : null}
        </button>
      );
    }
    buttons.push(
      <div key={i} className="button-row">
        {rowButtons}
      </div>
    );
  }

  function handleBuildingChange(
    selectedBuilding: number,
    totalBuildings: number
  ): void {
    setSelectedBuildingIndex(selectedBuilding);
    setSelectedFloorIndex(0);
  }

  function handleFloorChange(selectedFloor: number, totalFloors: number): void {
    setSelectedFloorIndex(selectedFloor);
  }

  return (
    <div className="ConfigureRowColSlots">
      <h1>Available Parking Slots</h1>
      <div className="button-row">
        <div className="unique-div">
          {buttons.length > 0 ? (
            <>
              <BuildingDropdown
                canAddBuilding={false}
                onBuildingChange={handleBuildingChange}
                totalBuildings={parkingSlotsDB.length}
              />
              <FloorDropdown
                canAddFloor={false}
                onFloorChange={handleFloorChange}
                totalFloors={parkingSlotsDB[selectedBuildingIndex].length}
              />
              {buttons}
            </>
          ) : (
            <>
              <p>Please Configure parking slots.</p>
              <button onClick={onConfigure}>Add Slots</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
