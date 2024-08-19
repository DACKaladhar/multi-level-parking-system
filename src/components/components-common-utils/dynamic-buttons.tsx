import React, { useEffect, useState } from "react";

export interface IBuildingDropdown {
  canAddBuilding?: boolean;
  totalBuildings?: number;
  onBuildingChange?: (selectedBuilding: number, totalBuildings: number) => void;
}

export interface IFloorDropdown {
  canAddFloor?: boolean;
  totalFloors?: number;
  selectedFloor?: number;
  onFloorChange?: (selectedFloor: number, totalFloors: number) => void;
}

/**
 * @param canAddBuilding - Enables BuildingDropdown to add new buildings
 * @param totalBuildings - Start with default totalBuildings number of buildings
 * @param onBuildingChange - Callback for parent to see the selected building and total buildings created
 * @returns - A Building Dropdown component which has ability to add new buildings or just select existing buildings
 */
export const BuildingDropdown: React.FC<IBuildingDropdown> = ({
  canAddBuilding = false, // Set default value to false if not passed
  totalBuildings = 1,
  onBuildingChange,
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
    onBuildingChange?.(buildings.length, buildings.length + 1);
  };

  const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "addBuilding") {
      addBuilding();
    } else {
      const index = parseInt(value);
      setSelectedBuildingIndex(index);
      onBuildingChange?.(index, buildings.length);
    }
  };

  return (
    <div>
      <select
        id="dynamicBuildingDropdown"
        name="dynamicBuildingDropdown"
        onChange={handleBuildingChange}
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
 * @param onFloorChange - Callback for parent to see the selected floor and total floors created
 * @param selectedFloor - Exclusively used to re-render dropdown, when new selectedFloorIndex is being sent typically ( when new building is added or selected)
 * @returns - A FLoor Dropdown component which has ability to add new floors or just select existing floors
 */
export const FloorDropdown: React.FC<IFloorDropdown> = ({
  canAddFloor = false, // Set default value to false if not passed
  totalFloors = 1,
  onFloorChange,
  selectedFloor = 0,
}) => {
  // State to keep track of the buildings
  const [floors, setFloors] = useState<string[]>(
    generateFloorArray(totalFloors)
  );
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  // Update selectedFloorIndex when selectedFloor prop changes
  useEffect(() => {
    setSelectedFloorIndex(selectedFloor);
    setFloors(generateFloorArray(totalFloors));
  }, [selectedFloor, totalFloors]);

  const addFloor = () => {
    const newFloor = `Floor ${floors.length + 1}`;
    setFloors([...floors, newFloor]);
    setSelectedFloorIndex(floors.length);
    onFloorChange?.(floors.length, floors.length + 1);
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "addFloor") {
      addFloor();
    } else {
      const index = parseInt(value);
      setSelectedFloorIndex(index);
      onFloorChange?.(index, floors.length);
    }
  };

  return (
    <div>
      <select
        id="dynamicFloorDropdown"
        name="dynamicFloorDropdown"
        onChange={handleFloorChange}
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
