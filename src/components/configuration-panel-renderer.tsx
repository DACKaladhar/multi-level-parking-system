// import {
//   BuildingDropdown,
//   FloorDropdown,
// } from "./components-common-utils/dynamic-buttons";
// import { DisplayConfigurableSlots } from "./ConfigureRowColSlots";

export const ConfigureRowColSlots: React.FC = () => {
  // __inputs__:
  //   parkingSlotsDB
  //   writeNewParkingSlotsDB

  // initiate:
  // buildingIndex- hook 0
  // floorIndex- hook 0
  // localPSDB- hook ParkingSlotsDB
  // totRowsIn_BF- hook based on localPSDB[buildingIndex][floorIndex]
  // totColsIn_BF- hook based on localPSDB[buildingIndex][floorIndex]
  // confirmButtons- hook based on localPSDB

  // useEffect: [localPSDB] dependency
  // set totRowsIn_BF
  // set totColsIn_BF
  // set confirmButtons

  // local functions:
  // handleFloorChange(floorIndexChosen, totalFloors):
  // new floor is added:
  // set LocalPSDB by adding the new floor to that buildingIndex, floorIndex
  // --( useEffect above should auto-set totRowsIn_BF, totColsIn_BF)
  // set confirmButtons adding new floors confirm state as false
  // else: just shifted to existing floor
  // set totRowsIn_BF
  // set totColsIn_BF
  // set confirmButtons[]

  // handleBuildingChange(buildingIndexChosen, totalBuildings):
  // new building is added:

  return (
    <>
      {/* <FloorDropdown /> */}

      {/* <BuildingDropdown /> */}

      {/* <DisplayConfigurableSlots /> */}
    </>
  );
};
