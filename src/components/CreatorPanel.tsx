import React, { useState } from "react";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";
import {
  ConfigureRowColSlots,
  IConfigureRowColSlots,
} from "./ConfigureRowColSlots";
export interface IParkingSlotsDB {
  rows: number;
  cols: number;
  slots: boolean[];
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

export const CreatorPanel = () => {
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [totalBuildings, setTotalBuildings] = useState<number>(1);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const [totalFloors, setTotalFloors] = useState<number>(1);
  const [buildingMapsFloor, setBuildingMapsFloor] = useState<number[]>([1]);
  const [parkingSlotsDB, setParkingSlotsDB] = useState<IParkingSlotsDB[][]>([
    [{ rows: 0, cols: 0, slots: [] }],
  ]);

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
      const updatedParkingSlotsDB = [
        ...parkingSlotsDB,
        [{ rows: 0, cols: 0, slots: [] }],
      ];
      setParkingSlotsDB(updatedParkingSlotsDB);
      setSelectedBuildingFloorSlots({
        savedRows: 0,
        savedCols: 0,
        callbackOnSave: handleSlotsSaveButton,
        building: buildingIndex,
        floor: 0,
        slotsDB: updatedParkingSlotsDB,
      });
    } else {
      // changing new building should make floor index default to 0
      setTotalFloors(buildingMapsFloor[buildingIndex]);
      setSelectedFloorIndex(0);
      const currentSlot: IParkingSlotsDB = parkingSlotsDB[buildingIndex][0];
      setSelectedBuildingFloorSlots({
        savedRows: currentSlot.rows,
        savedCols: currentSlot.cols,
        callbackOnSave: handleSlotsSaveButton,
        building: buildingIndex,
        floor: 0,
        slotsDB: parkingSlotsDB,
      });
    }
  };

  const handleFloorChange = (floorIndex: number, total: number) => {
    setSelectedFloorIndex(floorIndex);
    setTotalFloors(total);
    if (floorIndex + 1 > totalFloors) {
      // new floor is being added
      const updatedB2f = [...buildingMapsFloor];
      updatedB2f[selectedBuildingIndex] += 1; // Default to 1 floor for a new building
      setBuildingMapsFloor(updatedB2f);
      const updatedParkingSlotsDB = [...parkingSlotsDB];
      updatedParkingSlotsDB[selectedBuildingIndex].push({
        rows: 0,
        cols: 0,
        slots: [],
      });
      setParkingSlotsDB(updatedParkingSlotsDB);
      setSelectedBuildingFloorSlots({
        savedRows: 0,
        savedCols: 0,
        callbackOnSave: handleSlotsSaveButton,
        building: selectedBuildingIndex,
        floor: floorIndex,
        slotsDB: updatedParkingSlotsDB,
      });
    } else {
      const currentSlot: IParkingSlotsDB =
        parkingSlotsDB[selectedBuildingIndex][floorIndex];
      setSelectedBuildingFloorSlots({
        savedRows: currentSlot.rows,
        savedCols: currentSlot.cols,
        callbackOnSave: handleSlotsSaveButton,
        building: selectedBuildingIndex,
        floor: floorIndex,
        slotsDB: parkingSlotsDB,
      });
    }
  };

  const handleSlotsSaveButton = (
    row: number,
    col: number,
    slotsDB: IParkingSlotsDB[][],
    building: number,
    floor: number
  ) => {
    // UNSOLVED BUILDING PROBLEM! - just add buildings and use Save button, I can see parkingSlots for the latest building is not being appended in the parkingSlotsDB
    // Set the updated parkingSlotsDB state to trigger a re-render
    setParkingSlotsDB(slotsDB);
  };

  // NEED DESCRIPTION ABOUT THIS
  const [selectedBuildingFloorSlots, setSelectedBuildingFloorSlots] =
    useState<IConfigureRowColSlots>({
      savedRows: 0,
      savedCols: 0,
      callbackOnSave: handleSlotsSaveButton,
      building: selectedBuildingIndex,
      floor: selectedFloorIndex,
      slotsDB: parkingSlotsDB,
    });

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
        </div>
        <div
          style={{
            height: "2px",
            backgroundColor: "GrayText",
            marginTop: "0.5rem",
          }}
        ></div>
      </nav>
      <ConfigureRowColSlots
        selectedBuildingFloorSlots={selectedBuildingFloorSlots}
      />
    </>
  );
};
