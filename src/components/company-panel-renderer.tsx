import React from "react";
import { MonitorPanelContainer } from "./monitor-panel-container";
import { ConfigurationPanelContainer } from "./configuration-panel-container";
import {
  IMaintenanceSlot,
  IParkingSlotsDB,
  PanelMode,
} from "./components-common-utils/common-parking-slot.interface";
import { MaintenancePanelContainer } from "./maintenance-panel-container";

interface ICompanyPanelRenderer {
  parkingSlotsDB: IParkingSlotsDB[][];
  writeIntoPSDB: (psdb: IParkingSlotsDB[][]) => void;
  maintenanceSlotsDB: IMaintenanceSlot[][];
  writeIntoMSDB: (msdb: IMaintenanceSlot[][]) => void;
  panelMode: PanelMode;
}

/**
 *
 * @param parkingSlotsDB - current state of parking facility
 * @param maintenanceSlotsDB - current state of parking facility slot properties
 * @param panelMode - selected panel mode by the user
 * @callback writeIntoPSDB - a callback function which writes the updated parking facility to PSDB
 * @callback writeIntoMSDB - a callback function which writes the updated maintenance slots database
 * @returns Conditionally renders the selected panel based on panelMode property
 */

export const CompanyPanelRenderer: React.FC<ICompanyPanelRenderer> = ({
  parkingSlotsDB,
  writeIntoPSDB,
  maintenanceSlotsDB,
  writeIntoMSDB,
  panelMode,
}) => {
  return (
    <>
      {panelMode === PanelMode.Monitor && (
        <MonitorPanelContainer
          parkingSlotsDB={parkingSlotsDB}
          maintenanceSlotsDB={maintenanceSlotsDB}
        />
      )}

      {panelMode === PanelMode.Configure && (
        <ConfigurationPanelContainer
          parkingSlotsDB={parkingSlotsDB}
          writeIntoPSDB={writeIntoPSDB}
        />
      )}

      {panelMode === PanelMode.Maintenance && (
        <MaintenancePanelContainer
          parkingSlotsDB={parkingSlotsDB}
          maintenanceSlotsDB={maintenanceSlotsDB}
          writeIntoMSDB={writeIntoMSDB}
        />
      )}
    </>
  );
};
