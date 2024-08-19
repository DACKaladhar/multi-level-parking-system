import React, { useState } from "react";
import "../components-styles/ConfigureRowColSlots.css";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";

interface IDisplayConfigurableSlotsProps {
  rows: number;
  cols: number;
  unavailableSlots: boolean[];
  handleConfigurableSlotClick: (index: number) => void;
}

export const ConfigureRowColSlots = () =>
  // rows,
  // cols, ee rendu pampali so that
  // saved (hook): boolean, decides state of save button,
  // setSave (hook): save button will be enabled on any change
  // deselectedParkingSlots (hook): for displaying saved slots if already saved
  // setDeselectedParkingSlots (hook): for setting new state
  {
    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [deselectedParkingSlots, setDeselectedParkingSlots] = useState<
      boolean[]
    >([]);

    const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0) {
        setRows(value);
        setDeselectedParkingSlots(new Array(value * cols).fill(true));
      }
    };

    const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value) && value >= 0) {
        setCols(value);
        setDeselectedParkingSlots(new Array(rows * value).fill(true));
      }
    };

    const handleConfigurableSlotClick = (index: number) => {
      setDeselectedParkingSlots((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    };

    const handleSubmit = () => {
      setSubmitted(true);
    };

    if (submitted) {
      return (
        <AvailableParkingSlotsView
          rows={rows}
          cols={cols}
          unavailableSlots={deselectedParkingSlots}
        />
      );
    }

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
              onChange={handleRowsChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="colsInput">Columns:</label>
            <input
              id="colsInput"
              type="number"
              placeholder="Enter Number of Columns"
              onChange={handleColsChange}
            />
          </div>
        </div>

        <DisplayConfigurableSlots
          rows={rows}
          cols={cols}
          unavailableSlots={deselectedParkingSlots}
          handleConfigurableSlotClick={handleConfigurableSlotClick}
        />
        <button onClick={handleSubmit}>Submit</button>
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
