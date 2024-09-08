import React, { useState } from "react";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
// import { ConfigureRowColSlots } from "./ConfigureRowColSlots";
import {
  IParkingSlotsDB,
  ConfigurationPanelContainer,
} from "./configuration-panel-container";
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
        <ConfigurationPanelContainer
          parkingSlotsDB={parkingSlotsDB}
          writeIntoPSDB={writeIntoPSDB}
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
