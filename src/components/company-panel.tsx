import React, { useState } from "react";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
// import { ConfigureRowColSlots } from "./ConfigureRowColSlots";
import { CreatorPanel } from "./CreatorPanel";
import { IParkingSlotsDB } from "./CreatorPanel";
import { MaintenancePanelRenderer } from "./maintenance-panel-renderer";
import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
  ParkingSlotType,
  SecurityType,
  VehicleType,
} from "./components-common-utils/common-parking-slot.interface";

interface ICompanyPanelRenderer {
  parkingSlotsDB: IParkingSlotsDB[][];
  setParkingSlotsDB: React.Dispatch<React.SetStateAction<IParkingSlotsDB[][]>>;
  maintenanceSlotsDB: IMaintenanceSlot[][];
  setMaintenanceSlotsDB: React.Dispatch<
    React.SetStateAction<IMaintenanceSlot[][]>
  >;
}

export const CompanyPanelRenderer: React.FC<ICompanyPanelRenderer> = ({
  parkingSlotsDB,
  setParkingSlotsDB,
  maintenanceSlotsDB,
  setMaintenanceSlotsDB,
}) => {
  const [view, setView] = useState<"view" | "config" | "maintenance">("view");
  // const [parkingSlotsDB, setParkingSlotsDB] =
  //   useState<IParkingSlotsDB[][]>(mainParkingSlotsDB);
  // const [maintenanceSlotsDB, setMaintenanceSlotsDB] = useState<
  //   IMaintenanceSlot[][]
  // >(
  //   // either registering or initializing
  //   mainMaintenanceSlotsDB || syncMaintainanceSlotsDB(parkingSlotsDB)
  // );

  const handleSubmission = (db: IParkingSlotsDB[][]) => {
    // Submission from the Creator Panel
    setParkingSlotsDB(db);
    setView("maintenance");
    // if user configures again them , THIS SHOULDn't happen
    setMaintenanceSlotsDB(syncMaintainanceSlotsDB(db, maintenanceSlotsDB));
  };

  const handleMaintenanceSave = (
    parkingSlotsDB: IParkingSlotsDB[][],
    maintenanceSlotsDB: IMaintenanceSlot[][],
    maintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => {
    // Save maintenanceSlot data to maintenanceSlotsDB
    const prevDB = [...maintenanceSlotsDB];
    prevDB[buildingIndex][floorIndex].maintenanceSlots[selectedSlot] =
      maintenanceSlot;

    setMaintenanceSlotsDB(syncMaintainanceSlotsDB(parkingSlotsDB, prevDB));
  };

  console.log("parkingSlotsDB", parkingSlotsDB);
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
        <MaintenancePanelRenderer
          parkingSlotsDB={parkingSlotsDB}
          maintenanceSlotsDB={maintenanceSlotsDB}
          handleMaintenanceSave={handleMaintenanceSave}
        />
      )}
    </>
  );
};

export const syncMaintainanceSlotsDB = (
  parkingSlotsDB: IParkingSlotsDB[][],
  maintenanceSlotsDB?: IMaintenanceSlot[][]
): IMaintenanceSlot[][] => {
  let resultDB: IMaintenanceSlot[][] = [];

  for (let b = 0; b < parkingSlotsDB.length; b++) {
    let buildingMaintenance: IMaintenanceSlot[] = [];

    for (let f = 0; f < parkingSlotsDB[b].length; f++) {
      let floorSlotTypes: IMaintenanceSlotType[] = [];

      for (
        let slotNo = 0;
        slotNo < parkingSlotsDB[b][f].slots.length;
        slotNo++
      ) {
        // Store isAvailable for each slot
        const isAvailable =
          !!parkingSlotsDB[b][f].slots[slotNo] ||
          !!maintenanceSlotsDB?.[b]?.[f]?.maintenanceSlots[slotNo]?.isAvailable;
        const maintenanceStatus =
          maintenanceSlotsDB?.[b]?.[f]?.maintenanceSlots?.[slotNo]
            ?.maintenanceStatus || undefined; // default Maintenance Status is undefined
        const parkingSlotType =
          maintenanceSlotsDB?.[b]?.[f]?.maintenanceSlots?.[slotNo]
            ?.parkingSlotType || ParkingSlotType.Regular; // default Parking Slot Type is Regular
        const securityType =
          maintenanceSlotsDB?.[b]?.[f]?.maintenanceSlots?.[slotNo]
            ?.securityType || SecurityType.Monitored; // default Security Type is Monitored
        const vehicleType =
          maintenanceSlotsDB?.[b]?.[f]?.maintenanceSlots?.[slotNo]
            ?.vehicleType || VehicleType.FourWheeler; // default Vehicle Type is Four Wheeler
        floorSlotTypes.push({
          isAvailable,
          maintenanceStatus: maintenanceStatus,
          securityType: securityType,
          parkingSlotType: parkingSlotType,
          vehicleType: vehicleType, // initiate all of them with P instead of leaving blank
        });
      }

      // Push the entire floor to the buildingMaintenance array
      buildingMaintenance.push({
        rows: parkingSlotsDB[b][f].rows,
        cols: parkingSlotsDB[b][f].cols,
        maintenanceSlots: floorSlotTypes,
      });
    }

    // Push the buildingMaintenance array to resultDB
    resultDB.push(buildingMaintenance);
  }

  return resultDB;
};
