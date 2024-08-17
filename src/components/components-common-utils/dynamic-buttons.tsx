import React, { useState } from "react";

export interface IBuildingDropdown {
  canAddBuilding?: boolean;
  totalBuildings?: number;
}

export const BuildingDropdown: React.FC<IBuildingDropdown> = ({
  canAddBuilding = false, // Set default value to false if not passed
  totalBuildings = 1,
}) => {
  // State to keep track of the buildings
  const [buildings, setBuildings] = useState<string[]>(
    generateBuildingArray(totalBuildings)
  );

  // Function to add a new building
  const addBuilding = () => {
    const newBuilding = `Building ${buildings.length + 1}`;
    setBuildings([...buildings, newBuilding]);
  };

  return (
    <div>
      <select
        id="dynamicBuildingDropdown"
        name="dynamicBuildingDropdown"
        onChange={(e) => {
          if (e.target.value === "addBuilding") {
            addBuilding();
          }
        }}
      >
        {buildings.map((building, index) => (
          <option key={index} value={building.toLowerCase().replace(" ", "")}>
            {building}
          </option>
        ))}

        {/* Conditionally render the "Add a building" option based on canAddBuilding */}
        {canAddBuilding && (
          <>
            <option disabled>──────────</option>
            <option value="addBuilding" className="add-building-option">
              Add a building
            </option>
          </>
        )}
      </select>
    </div>
  );
};

const generateBuildingArray = (n: number): string[] => {
  const buildings: string[] = [];
  for (let i = 1; i <= n; i++) {
    buildings.push(`Building ${i}`);
  }
  return buildings;
};
