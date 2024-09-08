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

export interface ICreatorPanel {
  parkingSlotsDB: IParkingSlotsDB[][];
  writeIntoPSDB: (psdb: IParkingSlotsDB[][]) => void;
  handleSubmission: (db: IParkingSlotsDB[][]) => void;
}

/**
 * The CreatorPanel component is responsible for managing and configuring parking slots
 * across multiple buildings and floors. It integrates with dropdowns for building and floor selection,
 * and re-renders the ConfigureRowColSlots component when the selected building or floor changes.
 *
 * @param {ICreatorPanel} props - The props for the component.
 * @param {IParkingSlotsDB[][]} props.parkingSlotsDB - The current state of the parking slots database.
 * @param {React.Dispatch<React.SetStateAction<IParkingSlotsDB[][]>>} props.writeIntoPSDB - Function to update the parking slots database state.
 * @param {(db: IParkingSlotsDB[][]) => void} props.handleSubmission - Callback function that passes the updated parkingSlotsDB to CopmanyPanel.
 *
 * @returns {JSX.Element} The CreatorPanel component.
 */

export const CreatorPanel: React.FC<ICreatorPanel> = ({
  parkingSlotsDB,
  writeIntoPSDB,
  handleSubmission,
}) => {
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [totalBuildings, setTotalBuildings] = useState<number>(
    parkingSlotsDB.length
  );
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const [totalFloors, setTotalFloors] = useState<number>(
    parkingSlotsDB[0].length
  );
  const [buildingMapsFloor, setBuildingMapsFloor] = useState<number[]>(
    mapBuildingsToFloors(parkingSlotsDB)
  );

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
      writeIntoPSDB(updatedParkingSlotsDB);
      setSelectedBuildingFloorSlots({
        callbackOnSave: handleSlotsSaveButton,
        building: buildingIndex,
        floor: 0,
        slotsDB: updatedParkingSlotsDB,
      });
    } else {
      // changing new building should make floor index default to 0
      setTotalFloors(buildingMapsFloor[buildingIndex]);
      setSelectedFloorIndex(0);
      setSelectedBuildingFloorSlots({
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
      writeIntoPSDB(updatedParkingSlotsDB);
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
    writeIntoPSDB(slotsDB);
  };

  // NEED DESCRIPTION ABOUT THIS
  const [selectedBuildingFloorSlots, setSelectedBuildingFloorSlots] =
    useState<IConfigureRowColSlots>({
      callbackOnSave: handleSlotsSaveButton,
      building: selectedBuildingIndex,
      floor: selectedFloorIndex,
      slotsDB: parkingSlotsDB,
    });

  return (
    <>
      <h1 style={{ color: "Red", fontSize: "1.5rem" }}>
        Creator Panel Body is under development!
      </h1>
      <h5>
        -need an integration between "[floor, building] dropdowns" and
        "Configurable parking slots"
      </h5>
      <nav>
        <div>
          <>
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
          </>
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

const mapBuildingsToFloors = (db: IParkingSlotsDB[][]): number[] => {
  const buildingMapsFloor: number[] = [];
  for (let i = 0; i < db.length; i++) {
    buildingMapsFloor.push(db[i].length);
  }
  return buildingMapsFloor;
};
