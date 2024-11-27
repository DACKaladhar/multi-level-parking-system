import React, { useState } from "react";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";
import {
  DEFAULTAVAILABLESLOTPROPERTY,
  IBuildingDB,
  IMaintenanceSlotType,
} from "./components-common-utils/common-parking-slot.interface";

interface IDisplayConfigurableSlotsProps {
  rows: number;
  cols: number;
  unavailableSlots: IMaintenanceSlotType[];
  handleConfigurableSlotClick: (index: number) => void;
}

export interface IConfigurationPanelContainer {
  PSDB: IBuildingDB[];
  writeIntoPSDB: (psdb: IBuildingDB[]) => void;
}

/**
 * The ConfigurationPanelContainer component is responsible for configuring the basic structure of parking slots
 * across multiple buildings and floors. It integrates with dropdowns for building and floor selection.
 * @param PSDB - The current state of the parking facility.
 * @param writeIntoPSDB - Function to update the parking facility database state.
 * @returns - Displays configurable view of the parking facility, enabling users structure their parking facility.
 */

export const ConfigurationPanelContainer: React.FC<
  IConfigurationPanelContainer
> = ({ PSDB, writeIntoPSDB }) => {
  const [localPSDB, setLocalPSDB] = useState<IBuildingDB[]>(
    JSON.parse(JSON.stringify(PSDB))
  );
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [totalBuildings, setTotalBuildings] = useState<number>(
    localPSDB.length
  );
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);
  const [totalFloors, setTotalFloors] = useState<number>(
    localPSDB[0].floors.length
  );
  const [totRowsIn_BF, setTotRowsIn_BF] = useState<number>(
    localPSDB[selectedBuildingIndex].floors[selectedFloorIndex].rows
  );
  const [totColsIn_BF, setTotColsIn_BF] = useState<number>(
    localPSDB[selectedBuildingIndex].floors[selectedFloorIndex].cols
  );
  const [confirmedStatus, setConfirmedStatus] = useState<boolean[][]>(
    initiateConfirmedButtons(localPSDB)
  );
  const [timeoutText, setTimeoutText] = useState("");

  const handleBuildingChange = (buildingIndex: number, total: number) => {
    setSelectedBuildingIndex(buildingIndex);
    setTotalBuildings(total);
    if (buildingIndex + 1 > totalBuildings) {
      // new building is just added
      setTotRowsIn_BF(0);
      setTotColsIn_BF(0);
      setTotalFloors(1);
      setSelectedFloorIndex(0);
      const updatedLocalPSDB = [
        ...localPSDB,
        {
          floors: [
            {
              rows: 0,
              cols: 0,
              properties: [],
            },
          ],
        },
      ];
      setLocalPSDB(updatedLocalPSDB);
      const updatedConfirmedStatus = [...confirmedStatus];
      updatedConfirmedStatus.push([false]); // new building with 1 floor
      setConfirmedStatus(updatedConfirmedStatus);
    } else {
      // changing new building should make floor index default to 0
      setTotalFloors(localPSDB[buildingIndex].floors.length);
      setSelectedFloorIndex(0);
      setTotRowsIn_BF(localPSDB[buildingIndex].floors[0].rows);
      setTotColsIn_BF(localPSDB[buildingIndex].floors[0].cols);
    }
  };

  const handleFloorChange = (floorIndex: number, total: number) => {
    setSelectedFloorIndex(floorIndex);
    setTotalFloors(total);
    if (floorIndex + 1 > totalFloors) {
      // new floor is being added
      setTotRowsIn_BF(0);
      setTotColsIn_BF(0);
      const updatedLocalPSDB = [...localPSDB];
      updatedLocalPSDB[selectedBuildingIndex].floors.push({
        rows: 0,
        cols: 0,
        properties: [],
      });
      setLocalPSDB(updatedLocalPSDB);
      const updatedConfirmedStatus = [...confirmedStatus];
      updatedConfirmedStatus[selectedBuildingIndex].push(false);
      setConfirmedStatus(updatedConfirmedStatus);
    } else {
      setTotRowsIn_BF(localPSDB[selectedBuildingIndex].floors[floorIndex].rows);
      setTotColsIn_BF(localPSDB[selectedBuildingIndex].floors[floorIndex].cols);
    }
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      const updatedConfirmedStatus = [...confirmedStatus];
      updatedConfirmedStatus[selectedBuildingIndex][selectedFloorIndex] = false;
      setConfirmedStatus(updatedConfirmedStatus);
      setTotRowsIn_BF(value);
      const updatedLocalPSDB = [...localPSDB];
      updatedLocalPSDB[selectedBuildingIndex].floors[selectedFloorIndex].rows =
        value;
      updatedLocalPSDB[selectedBuildingIndex].floors[
        selectedFloorIndex
      ].properties = Array(value * totColsIn_BF)
        .fill(null)
        .map(() => DEFAULTAVAILABLESLOTPROPERTY());
      setLocalPSDB(updatedLocalPSDB);
    }
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      const updatedConfirmedStatus = [...confirmedStatus];
      updatedConfirmedStatus[selectedBuildingIndex][selectedFloorIndex] = false;
      setConfirmedStatus(updatedConfirmedStatus);
      setTotColsIn_BF(value);
      const updatedLocalPSDB = [...localPSDB];
      updatedLocalPSDB[selectedBuildingIndex].floors[selectedFloorIndex].cols =
        value;
      updatedLocalPSDB[selectedBuildingIndex].floors[
        selectedFloorIndex
      ].properties = Array(totRowsIn_BF * value)
        .fill(null)
        .map(() => DEFAULTAVAILABLESLOTPROPERTY()); // To keep the different memory references for each property we use `map`
      setLocalPSDB(updatedLocalPSDB);
    }
  };

  const handleConfigurableSlotClick = (index: number) => {
    if (confirmedStatus[selectedBuildingIndex][selectedFloorIndex]) {
      const updatedConfirmedStatus = [...confirmedStatus];
      updatedConfirmedStatus[selectedBuildingIndex][selectedFloorIndex] = false;
      setConfirmedStatus(updatedConfirmedStatus);
    }
    const updatedLocalPSDB = [...localPSDB];
    updatedLocalPSDB[selectedBuildingIndex].floors[
      selectedFloorIndex
    ].properties[index].isAvailable =
      !updatedLocalPSDB[selectedBuildingIndex].floors[selectedFloorIndex]
        .properties[index].isAvailable;
    setLocalPSDB(updatedLocalPSDB);
  };

  const handleSubmit = () => {
    const result = checkAllConfirmed(confirmedStatus);
    confirmedStatus.length === 0 &&
      setTimeoutText(`Please create your slots first before submit!`);
    if (result[0]) {
      writeIntoPSDB(localPSDB);
    } else {
      const [unconfirmedBuilding, unconfirmedFloor] = [result[1], result[2]];
      setTimeoutText(
        `Please confirm the slots for building ${
          unconfirmedBuilding + 1
        } and floor ${unconfirmedFloor + 1}.`
      );
      setTimeout(() => setTimeoutText(""), 3000);
    }
  };

  const handleConfirmButton = () => {
    const updatedLocalPSDB = [...confirmedStatus];
    updatedLocalPSDB[selectedBuildingIndex][selectedFloorIndex] = true;
    setConfirmedStatus(updatedLocalPSDB);
  };

  return (
    <>
      <h1 style={{ color: "Red", fontSize: "1.5rem", fontWeight: "lighter" }}>
        Configuration Panel Container is under development!
      </h1>
      <h3 style={{ fontWeight: "lighter" }}>
        We still need make use of ConfigurationPanelRenderer!
      </h3>
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

      <div className="parking-facility-view">
        <h1>Configure your parking facility</h1>
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="rowsInput">Rows:</label>
            <input
              id="rowsInput"
              type="number"
              placeholder="Enter Number of Rows"
              value={totRowsIn_BF}
              onChange={handleRowsChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="colsInput">Columns:</label>
            <input
              id="colsInput"
              type="number"
              placeholder="Enter Number of Columns"
              value={totColsIn_BF}
              onChange={handleColsChange}
            />
          </div>
        </div>

        <DisplayConfigurableSlots
          rows={totRowsIn_BF}
          cols={totColsIn_BF}
          unavailableSlots={
            localPSDB[selectedBuildingIndex].floors[selectedFloorIndex]
              .properties
          }
          handleConfigurableSlotClick={handleConfigurableSlotClick}
        />
        {totRowsIn_BF && totColsIn_BF ? (
          <button
            onClick={handleConfirmButton}
            style={{
              backgroundColor: confirmedStatus[selectedBuildingIndex][
                selectedFloorIndex
              ]
                ? "#4CAF50"
                : "#008CBA", // Green if already confirmed, Blue if not
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: confirmedStatus[selectedBuildingIndex][
                selectedFloorIndex
              ]
                ? 0.6
                : 1, // Slightly transparent if already confirmed
              pointerEvents: confirmedStatus[selectedBuildingIndex][
                selectedFloorIndex
              ]
                ? "none"
                : "auto", // Disable button if already confirmed
              transition: "background-color 0.3s ease, opacity 0.3s ease", // Smooth transition for background and opacity
            }}
            title={
              confirmedStatus[selectedBuildingIndex][selectedFloorIndex]
                ? "Configuration already confirmed"
                : "Save Configuration"
            }
          >
            {confirmedStatus[selectedBuildingIndex][selectedFloorIndex]
              ? "Confirmed"
              : "Confirm"}
          </button>
        ) : null}

        <button onClick={handleSubmit}>Submit</button>
        {timeoutText && (
          <p style={{ color: "red" }} className="timeout-text">
            {timeoutText}
          </p>
        )}
      </div>
    </>
  );
};

export const DisplayConfigurableSlots: React.FC<
  IDisplayConfigurableSlotsProps
> = ({ rows, cols, unavailableSlots, handleConfigurableSlotClick }) => {
  const buttons = [];

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      rowButtons.push(
        <button
          key={index}
          className={`square-button ${
            unavailableSlots[index].isAvailable ? "" : "deSelected"
          }`}
          onClick={() => handleConfigurableSlotClick(index)}
        >
          {index + 1}
        </button>
      );
    }
    buttons.push(
      <div key={i} className="button-row">
        {rowButtons}
      </div>
    );
  }

  return <div>{buttons}</div>;
};

const initiateConfirmedButtons = (localPSDB: IBuildingDB[]): boolean[][] => {
  // fill with true if it's not the first time configuring, else false;
  const fillValue =
    JSON.stringify(localPSDB) !==
    `[{"buildingName":"Building 1","floors":[{"rows":0,"cols":0,"properties":[]}]}]`;
  const result: boolean[][] = [];
  for (let b = 0; b < localPSDB.length; b++) {
    result.push(Array(localPSDB[b].floors.length).fill(fillValue));
  }
  return result;
};

const checkAllConfirmed = (
  confirmedStatus: boolean[][]
): [boolean, number, number] => {
  for (let i = 0; i < confirmedStatus.length; i++) {
    for (let j = 0; j < confirmedStatus[i].length; j++) {
      if (confirmedStatus[i][j] === false) {
        return [false, i, j];
      }
    }
  }
  return [true, -1, -1];
};
