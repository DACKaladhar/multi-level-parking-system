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
 * AvailableParkingSlotsView component displays a grid of parking slots
 * based on the selected building and floor. It also provides an option
 * to configure slots if none are available.
 *
 * @param {IAvailableSlotsViewProps} props
 * @param {IParkingSlotsDB[][]} props.parkingSlotsDB - A 2D array representing the parking slots database, where each element is an object containing rows, cols, and slots.
 * @param {() => void} props.onConfigure - A callback function to switch to the configuration view when slots are not available.
 * @returns {JSX.Element} A grid of available parking slots or a prompt to configure slots.
 */
export const AvailableParkingSlotsView: React.FC<IAvailableSlotsViewProps> = ({
  parkingSlotsDB,
  onConfigure,
}) => {
  // Hooks
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  // Function definitions
  const handleBuildingChange = (selectedBuilding: number): void => {
    setSelectedBuildingIndex(selectedBuilding);
    setSelectedFloorIndex(0); // Reset floor selection when the building changes
  };

  const handleFloorChange = (selectedFloor: number): void => {
    setSelectedFloorIndex(selectedFloor);
  };

  // Component logic
  const selectedSlotsDB =
    parkingSlotsDB[selectedBuildingIndex]?.[selectedFloorIndex];
  const rows = selectedSlotsDB?.rows ?? 0;
  const cols = selectedSlotsDB?.cols ?? 0;
  const unavailableSlots = selectedSlotsDB?.slots ?? [];

  const buttons: JSX.Element[] = [];
  for (let i = 0; i < rows; i++) {
    const rowButtons: JSX.Element[] = [];
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

  return (
    <div className="ConfigureRowColSlots">
      <h1>Available Parking Slots</h1>
      <div className="unique-div">
        {rows > 0 && cols > 0 ? (
          <>
            <BuildingDropdown
              canAddBuilding={false}
              onBuildingChange={handleBuildingChange}
              totalBuildings={parkingSlotsDB.length}
            />
            <FloorDropdown
              canAddFloor={false}
              onFloorChange={handleFloorChange}
              selectedFloor={selectedFloorIndex}
              totalFloors={parkingSlotsDB[selectedBuildingIndex]?.length || 0}
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
  );
};
