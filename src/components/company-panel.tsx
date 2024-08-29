import React, { useState } from "react";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
// import { ConfigureRowColSlots } from "./ConfigureRowColSlots";
import { CreatorPanel } from "./CreatorPanel";
import { IParkingSlotsDB } from "./CreatorPanel";
import { MaintenancePanel } from "./maintenance-panel-renderer";
import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
  VehicleType,
} from "./components-common-utils/common-parking-slot.interface";

export const CompanyPanel: React.FC = () => {
  const [view, setView] = useState<"view" | "config" | "maintenance">("view");
  const [parkingSlotsDB, setParkingSlotsDB] = useState<IParkingSlotsDB[][]>([
    [{ rows: 0, cols: 0, slots: [] }],
  ]);
  const [maintenanceSlotsDB, setMaintenanceSlotsDB] = useState<
    IMaintenanceSlot[][]
  >(setupMaintainanceSlotsDB(parkingSlotsDB));

  const handleSubmission = (db: IParkingSlotsDB[][]) => {
    setParkingSlotsDB(db);
    setView("view");
    // if user configures again them this will reset, THIS SHOULDn't happen
    setMaintenanceSlotsDB(setupMaintainanceSlotsDB(db));
  };

  const handleMaintenanceSave = (
    maintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => {
    // Save maintenanceSlot data to maintenanceSlotsDB
    setMaintenanceSlotsDB((prevDB) => {
      const newDB = [...prevDB];
      newDB[buildingIndex][floorIndex].maintenanceSlots[selectedSlot] =
        maintenanceSlot;

      return newDB;
    });
  };

  console.log(parkingSlotsDB);
  console.log("maintenanceSlotsDB", maintenanceSlotsDB);
  return (
    <>
      <nav>
        <button onClick={() => setView("view")}>View State</button>
        <button onClick={() => setView("config")}>Configuration State</button>
        <button onClick={() => setView("maintenance")}>
          Maintenance State
        </button>
      </nav>

      {view === "view" && (
        <AvailableParkingSlotsView
          parkingSlotsDB={parkingSlotsDB}
          onConfigure={() => setView("config")}
          maintenanceSlotsDB={maintenanceSlotsDB}
          // onSlotClick={} might need to pass in future after building
        />
      )}

      {view === "config" && (
        <CreatorPanel
          parkingSlotsDB={parkingSlotsDB}
          setParkingSlotsDB={setParkingSlotsDB}
          handleSubmission={handleSubmission}
        />
      )}

      {view === "maintenance" && (
        <MaintenancePanel
          parkingSlotsDB={parkingSlotsDB}
          maintenanceSlotsDB={maintenanceSlotsDB}
          setMaintenanceSlotsDB={setMaintenanceSlotsDB}
          handleMaintenanceSave={handleMaintenanceSave}
        />
      )}
    </>
  );
};

const setupMaintainanceSlotsDB = (
  parkingSlotsDB: IParkingSlotsDB[][]
): IMaintenanceSlot[][] => {
  let resultDB: IMaintenanceSlot[][] = [];

  for (let b = 0; b < parkingSlotsDB.length; b++) {
    let buildingMaintenance: IMaintenanceSlot[] = [];

    for (let f = 0; f < parkingSlotsDB[b].length; f++) {
      let floorSlots: IMaintenanceSlotType[] = [];

      for (
        let slotNo = 0;
        slotNo < parkingSlotsDB[b][f].slots.length;
        slotNo++
      ) {
        // Store isAvailable for each slot
        const isAvailable = parkingSlotsDB[b][f].slots[slotNo];
        floorSlots.push({
          isAvailable,
          vehicleType: VehicleType.CustomizedVehicle, // initiate all of them with P instead of leaving blank
        });
      }

      // Push the entire floor to the buildingMaintenance array
      buildingMaintenance.push({
        rows: parkingSlotsDB[b][f].rows,
        cols: parkingSlotsDB[b][f].cols,
        maintenanceSlots: floorSlots,
      });
    }

    // Push the buildingMaintenance array to resultDB
    resultDB.push(buildingMaintenance);
  }

  return resultDB;
};
