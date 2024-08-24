import React, { useEffect, useState } from "react";
import "../components-styles/ConfigureRowColSlots.css";
import { IParkingSlotsDB } from "./CreatorPanel";

export interface IConfigureRowColSlots {
  savedRows: number;
  savedCols: number;
  building: number;
  floor: number;
  callbackOnSave: (
    row: number,
    col: number,
    slotsDB: IParkingSlotsDB[][],
    building: number,
    floor: number
  ) => void;
  slotsDB: IParkingSlotsDB[][];
}
interface IDisplayConfigurableSlotsProps {
  rows: number;
  cols: number;
  unavailableSlots: boolean[];
  handleConfigurableSlotClick: (index: number) => void;
}

export const ConfigureRowColSlots: React.FC<{
  selectedBuildingFloorSlots: IConfigureRowColSlots;
  onSubmission: (db: IParkingSlotsDB[][]) => void; // New prop
}> = ({ selectedBuildingFloorSlots, onSubmission }) =>
  // rows,
  // cols, ee rendu pampali so that
  // saved (hook): boolean, decides state of save button,
  // setSave (hook): save button will be enabled on any change
  // deselectedParkingSlots (hook): for displaying saved slots if already saved
  // setDeselectedParkingSlots (hook): for setting new state
  {
    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);
    const [instantParkingSlots, setInstantParkingSlots] = useState<boolean[]>(
      []
    );
    const [alreadySaved, setAlreadySaved] = useState<boolean>(false);
    // for post submitted you can delete these
    const [timeoutText, setTimeoutText] = useState("");

    const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAlreadySaved(false);
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0) {
        setRows(value);
        setInstantParkingSlots(new Array(value * cols).fill(true));
      }
    };

    const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setAlreadySaved(false);
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0) {
        setCols(value);
        setInstantParkingSlots(new Array(rows * value).fill(true));
      }
    };

    const handleConfigurableSlotClick = (index: number) => {
      if (alreadySaved) {
        setAlreadySaved(false);
      }
      setInstantParkingSlots((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    };

    const handleSubmit = () => {
      const result = checkAllSaved(selectedBuildingFloorSlots.slotsDB);
      if (result[2] === 1) {
        onSubmission(selectedBuildingFloorSlots.slotsDB);
      } else {
        // result is [i, j], where i is row and j is column
        const [i, j] = [result[0], result[1]];
        setTimeoutText(
          `Please save the slots for building ${i + 1} and floor ${j + 1}.`
        );

        // Hide the text after 5 seconds (5000 ms)
        setTimeout(() => setTimeoutText(""), 3000);
      }
    };

    const handleSaveButton = () => {
      if (rows && cols) {
        // passing the required DB after built here directly ( avoiding buildings problem- just adding the buildings[not floor] is not updating the DB Solve later)
        selectedBuildingFloorSlots.slotsDB[selectedBuildingFloorSlots.building][
          selectedBuildingFloorSlots.floor
        ] = {
          rows: rows,
          cols: cols,
          slots: instantParkingSlots,
        };
        selectedBuildingFloorSlots.callbackOnSave(
          rows,
          cols,
          selectedBuildingFloorSlots.slotsDB,
          selectedBuildingFloorSlots.building,
          selectedBuildingFloorSlots.floor
        );
        setAlreadySaved(true);
      } else {
        console.log("Please configure the slots before saving");
      }
    };

    useEffect(() => {
      // If slots are already saved for selected building, floor got from Creator Panel
      const savedOptions =
        selectedBuildingFloorSlots.slotsDB[selectedBuildingFloorSlots.building][
          selectedBuildingFloorSlots.floor
        ];

      if (savedOptions && savedOptions.slots.length > 0) {
        // Initialize state with saved options
        setRows(savedOptions.rows);
        setCols(savedOptions.cols);
        setInstantParkingSlots(savedOptions.slots);
        setAlreadySaved(true);
      } else {
        setRows(0);
        setCols(0);
        setInstantParkingSlots(savedOptions.slots);
        setAlreadySaved(false);
      }
    }, [
      selectedBuildingFloorSlots.building,
      selectedBuildingFloorSlots.floor,
      selectedBuildingFloorSlots.slotsDB,
    ]);

    return (
      <div className="ConfigureRowColSlots">
        <h1>Configure your parking slots</h1>
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="rowsInput">Rows:</label>
            <input
              id="rowsInput"
              type="number"
              placeholder="Enter Number of Rows"
              value={rows}
              onChange={handleRowsChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="colsInput">Columns:</label>
            <input
              id="colsInput"
              type="number"
              placeholder="Enter Number of Columns"
              value={cols}
              onChange={handleColsChange}
            />
          </div>
        </div>

        <DisplayConfigurableSlots
          rows={rows}
          cols={cols}
          unavailableSlots={instantParkingSlots}
          handleConfigurableSlotClick={handleConfigurableSlotClick}
        />
        {rows && cols ? (
          <button
            onClick={handleSaveButton}
            style={{
              backgroundColor: alreadySaved ? "#4CAF50" : "#008CBA", // Green if already saved, Blue if not
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              opacity: alreadySaved ? 0.6 : 1, // Slightly transparent if already saved
              pointerEvents: alreadySaved ? "none" : "auto", // Disable button if already saved
              transition: "background-color 0.3s ease, opacity 0.3s ease", // Smooth transition for background and opacity
            }}
            title={
              alreadySaved
                ? "Configuration already saved"
                : "Save Configuration"
            }
          >
            {alreadySaved ? "Saved" : "Save"}
          </button>
        ) : null}

        <button onClick={handleSubmit}>Submit</button>
        {timeoutText && (
          <p style={{ color: "red" }} className="timeout-text">
            {timeoutText}
          </p>
        )}
      </div>
    );
  };

/**
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @param unavailableSlots - Boolean array indicating unavailable slots.
 * @param handleConfigurableSlotClick - Callback for slot click events.
 *
 * @returns A grid of configurable slot buttons.
 */
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
            unavailableSlots[index] ? "" : "deSelected"
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

const checkAllSaved = (parkingSlotsDB: IParkingSlotsDB[][]): number[] => {
  for (let i = 0; i < parkingSlotsDB.length; i++) {
    for (let j = 0; j < parkingSlotsDB[i].length; j++) {
      if (!parkingSlotsDB[i][j].slots.length) {
        return [i, j, 0];
      }
    }
  }
  return [0, 0, 1];
};
