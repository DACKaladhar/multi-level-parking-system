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

export interface IConfigurationPanelContainer {
  parkingSlotsDB: IParkingSlotsDB[][];
  writeIntoPSDB: (psdb: IParkingSlotsDB[][]) => void;
}

/**
 * The ConfigurationPanelContainer component is responsible for managing and configuring parking slots
 * across multiple buildings and floors. It integrates with dropdowns for building and floor selection,
 * and re-renders the ConfigureRowColSlots component when the selected building or floor changes.
 *
 * @param {ICreatorPanel} props - The props for the component.
 * @param {IParkingSlotsDB[][]} props.parkingSlotsDB - The current state of the parking slots database.
 * @param {React.Dispatch<React.SetStateAction<IParkingSlotsDB[][]>>} props.writeIntoPSDB - Function to update the parking slots database state.
 * @param {(db: IParkingSlotsDB[][]) => void} props.handleSubmission - Callback function that passes the updated parkingSlotsDB to CopmanyPanel.
 *
 * @returns {JSX.Element} The ConfigurationPanelContainer component.
 */

export const ConfigurationPanelContainer: React.FC<
  IConfigurationPanelContainer
> = ({ parkingSlotsDB, writeIntoPSDB }) => {
  const [localPSDB, setLocalPSDB] =
    useState<IParkingSlotsDB[][]>(parkingSlotsDB);
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [totalBuildings, setTotalBuildings] = useState<number>(
    localPSDB.length
  );
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const [totalFloors, setTotalFloors] = useState<number>(localPSDB[0].length);

  const handleSubmission = (db: IParkingSlotsDB[][]) => {
    // Submission from the Creator Panel
    writeIntoPSDB(db);

    // ... you might want to setView also in the future
  };

  const handleBuildingChange = (buildingIndex: number, total: number) => {
    setSelectedBuildingIndex(buildingIndex);
    setTotalBuildings(total);
    if (buildingIndex + 1 > totalBuildings) {
      // new building is just added
      setTotalFloors(1);
      setSelectedFloorIndex(0);
      const updatedParkingSlotsDB = [
        ...localPSDB,
        [{ rows: 0, cols: 0, slots: [] }],
      ];
      setLocalPSDB(updatedParkingSlotsDB);
      setSelectedBuildingFloorSlots({
        callbackOnSave: handleSlotsSaveButton,
        building: buildingIndex,
        floor: 0,
        slotsDB: updatedParkingSlotsDB,
      });
    } else {
      // changing new building should make floor index default to 0
      setTotalFloors(localPSDB[buildingIndex].length);
      setSelectedFloorIndex(0);
      setSelectedBuildingFloorSlots({
        callbackOnSave: handleSlotsSaveButton,
        building: buildingIndex,
        floor: 0,
        slotsDB: localPSDB,
      });
    }
  };

  const handleFloorChange = (floorIndex: number, total: number) => {
    setSelectedFloorIndex(floorIndex);
    setTotalFloors(total);
    if (floorIndex + 1 > totalFloors) {
      // new floor is being added
      const updatedParkingSlotsDB = [...localPSDB];
      updatedParkingSlotsDB[selectedBuildingIndex].push({
        rows: 0,
        cols: 0,
        slots: [],
      });
      setLocalPSDB(updatedParkingSlotsDB);
      setSelectedBuildingFloorSlots({
        callbackOnSave: handleSlotsSaveButton,
        building: selectedBuildingIndex,
        floor: floorIndex,
        slotsDB: updatedParkingSlotsDB,
      });
    } else {
      setSelectedBuildingFloorSlots({
        callbackOnSave: handleSlotsSaveButton,
        building: selectedBuildingIndex,
        floor: floorIndex,
        slotsDB: localPSDB,
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
    // UNSOLVED BUILDING PROBLEM! - just add buildings and use Save button, I can see parkingSlots for the latest building is not being appended in the localPSDB
    // Set the updated localPSDB state to trigger a re-render
    setLocalPSDB(slotsDB);
  };

  // NEED DESCRIPTION ABOUT THIS
  const [selectedBuildingFloorSlots, setSelectedBuildingFloorSlots] =
    useState<IConfigureRowColSlots>({
      callbackOnSave: handleSlotsSaveButton,
      building: selectedBuildingIndex,
      floor: selectedFloorIndex,
      slotsDB: localPSDB,
    });

  return (
    <>
      <h1 style={{ color: "Red", fontSize: "1.5rem", fontWeight: "lighter" }}>
        Configuration Panel Container is under development!
      </h1>
      <h5 style={{ fontWeight: "lighter" }}>
        - Renders Building Dropdown, Floor Dropdown, Display Configurable Slots
      </h5>
      <nav>
        <div>
          <BuildingDropdown
            canAddBuilding={true}
            onBuildingChange={handleBuildingChange}
            totalBuildings={totalBuildings}
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
        onSubmission={handleSubmission}
      />
    </>
  );
};
