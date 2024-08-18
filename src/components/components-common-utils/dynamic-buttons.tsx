import React, { useState } from "react";

export interface IBuildingDropdown {
  canAddBuilding?: boolean;
  totalBuildings?: number;
}

export interface IFloorDropdown {
  canAddFloor?: boolean;
  totalFloors?: number;
}

/**
 * @param canAddBuilding - Enables BuildingDropdown to add new buildings
 * @param totalBuildings - Start with default totalBuildings number of buildings
 * @returns - A Building Dropdown component which has ability to add new buildings or just select existing buildings
 */
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

/**
 * @param canAddFloor - Enables FloorDropdown to add new floors
 * @param totalFloors - Start with default totalFloor number of floors
 * @returns - A FLoor Dropdown component which has ability to add new floors or just select existing floors
 */
export const FloorDropdown: React.FC<IFloorDropdown> = ({
  canAddFloor = false, // Set default value to false if not passed
  totalFloors = 1,
}) => {
  // State to keep track of the buildings
  const [floors, setFloors] = useState<string[]>(
    generateFloorArray(totalFloors)
  );
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  // Function to add a new building
  const addFloor = () => {
    const newFloor = `Floor ${floors.length + 1}`;
    setFloors([...floors, newFloor]);
    setSelectedFloorIndex(floors.length);
  };

  return (
    <div>
      <select
        id="dynamicFloorDropdown"
        name="dynamicFloorDropdown"
        onChange={(e) => {
          e.target.value === "addFloor"
            ? addFloor()
            : setSelectedFloorIndex(parseInt(e.target.value));
        }}
        value={selectedFloorIndex}
      >
        {floors.map((floor, index) => (
          <option key={index} value={index}>
            {floor}
          </option>
        ))}

        {/* Conditionally render the "Add a floor" option based on canAddFloor */}
        {canAddFloor && (
          <>
            <option disabled>──────────</option>
            <option value="addFloor" className="add-floor-option">
              Add a floor
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

const generateFloorArray = (n: number): string[] => {
  const floors: string[] = [];
  for (let i = 1; i <= n; i++) {
    floors.push(`Floor ${i}`);
  }
  return floors;
};
