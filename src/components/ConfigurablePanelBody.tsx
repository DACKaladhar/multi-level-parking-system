import React, { useState } from "react";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";
import { ConfigureRowColSlots } from "./ConfigureRowColSlots";

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

export const ConfigurablePanelBody = () => {
  // const [slotsDB, setSlotsDB] = useState<number[][][]>([[[1]]])
  // const [rowsCols, setRowsCols] = useState<number[][][]>([[[]]])
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [totalBuildings, setTotalBuildings] = useState<number>(1);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const [totalFloors, setTotalFloors] = useState<number>(1);
  const [buildingMapsFloor, setBuildingMapsFloor] = useState<number[]>([1]);

  const handleBuildingChange = (buildingIndex: number, total: number) => {
    setSelectedBuildingIndex(buildingIndex);
    setTotalBuildings(total);
    if (buildingIndex + 1 > totalBuildings) {
      // new building is just added
      setTotalFloors(1);
      setSelectedFloorIndex(0);
      const updatedB2f = [...buildingMapsFloor];
      updatedB2f.push(1); // Default to 1 floor for a new building
      setBuildingMapsFloor(updatedB2f);
    } else {
      setTotalFloors(buildingMapsFloor[buildingIndex]);
      setSelectedFloorIndex(0);
    }
  };

  const handleFloorChange = (floorIndex: number, total: number) => {
    setSelectedFloorIndex(floorIndex);
    setTotalFloors(total);
    if (floorIndex + 1 > totalFloors) {
      const updatedB2f = [...buildingMapsFloor];
      updatedB2f[selectedBuildingIndex] += 1; // Default to 1 floor for a new building
      setBuildingMapsFloor(updatedB2f);
    }
  };

  return (
    <>
      <h1 style={{ color: "Red", fontSize: "1.5rem" }}>
        Configurable Panel Body is under development!
      </h1>
      <h5>
        -need an integration between "[floor, building] dropdowns" and
        "Configurable parking slots"
      </h5>
      <nav>
        <div>
          <BuildingDropdown
            canAddBuilding={true}
            onBuildingChange={handleBuildingChange}
          />
          <FloorDropdown
            canAddFloor={true}
            onFloorChange={handleFloorChange}
            selectedFloor={selectedFloorIndex}
            totalFloors={totalFloors}
          />
          <h3>selected building - {selectedBuildingIndex}</h3>
          <h3>selected floor - {selectedFloorIndex}</h3>
          <h4>total bulidings - {totalBuildings}</h4>
          <h4>total floors - {totalFloors}</h4>
        </div>
        <div
          style={{
            height: "2px",
            backgroundColor: "GrayText",
            marginTop: "0.5rem",
          }}
        ></div>
      </nav>
      <ConfigureRowColSlots />
    </>
  );
};
