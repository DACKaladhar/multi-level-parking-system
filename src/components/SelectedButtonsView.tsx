import React from "react";
import "../components-styles/SelectedButtonsView.css";

interface ISelectedButtonsViewProps {
  rows: number;
  cols: number;
  unavailableSlots: boolean[];
}
/**
 * @param rows - Number of rows in the grid.
 * @param cols - Number of columns in the grid.
 * @param unavailableSlots - Boolean array indicating unavailable slots.
 * @returns A grid of Available Parking Slots
 */
export const AvailableParkingSlotsView: React.FC<ISelectedButtonsViewProps> = ({
  rows,
  cols,
  unavailableSlots,
}) => {
  const buttons = [];

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

  return (
    <div className="App">
      <h1>Available Parking Slots</h1>
      <div>
        {buttons.length > 0 ? buttons : <p>Please Configure parking slots.</p>}
      </div>
    </div>
  );
};
