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
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);

  // Function to add a new building
  const addBuilding = () => {
    const newBuilding = `Building ${buildings.length + 1}`;
    setBuildings([...buildings, newBuilding]);
    setSelectedBuildingIndex(buildings.length);
  };

  return (
    <div>
      <select
        id="dynamicBuildingDropdown"
        name="dynamicBuildingDropdown"
        onChange={(e) => {
          e.target.value === "addBuilding"
            ? addBuilding()
            : setSelectedBuildingIndex(parseInt(e.target.value));
        }}
        value={selectedBuildingIndex}
      >
        {buildings.map((building, index) => (
          <option key={index} value={index}>
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
