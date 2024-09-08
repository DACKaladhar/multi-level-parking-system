import React, { useState } from "react";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
// import { ConfigureRowColSlots } from "./ConfigureRowColSlots";
import { CreatorPanel } from "./CreatorPanel";
import { IParkingSlotsDB } from "./CreatorPanel";
import { IMaintenanceSlot } from "./components-common-utils/common-parking-slot.interface";
import { MaintenancePanelContainer } from "./maintenance-panel-container";

interface ICompanyPanelRenderer {
  parkingSlotsDB: IParkingSlotsDB[][];
  writeIntoPSDB: (psdb: IParkingSlotsDB[][]) => void;
  maintenanceSlotsDB: IMaintenanceSlot[][];
  writeIntoMSDB: (msdb: IMaintenanceSlot[][]) => void;
}

export const CompanyPanelRenderer: React.FC<ICompanyPanelRenderer> = ({
  parkingSlotsDB,
  writeIntoPSDB,
  maintenanceSlotsDB,
  writeIntoMSDB,
}) => {
  const [view, setView] = useState<"view" | "config" | "maintenance">("view");

  // This should be there in the creator-panel-container
  const handleSubmission = (db: IParkingSlotsDB[][]) => {
    // Submission from the Creator Panel
    writeIntoPSDB(db);
    setView("maintenance");
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
          maintenanceSlotsDB={maintenanceSlotsDB}
          onConfigure={() => setView("config")}
          // onSlotClick={} might need to pass in future after building
        />
      )}

      {view === "config" && (
        <CreatorPanel
          parkingSlotsDB={parkingSlotsDB}
          writeIntoPSDB={writeIntoPSDB}
          handleSubmission={handleSubmission}
        />
      )}

      {view === "maintenance" && (
        <MaintenancePanelContainer
          parkingSlotsDB={parkingSlotsDB}
          maintenanceSlotsDB={maintenanceSlotsDB}
          writeIntoMSDB={writeIntoMSDB}
        />
      )}
    </>
  );
};
