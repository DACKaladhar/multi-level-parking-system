import React from "react";
import { MonitorPanelContainer } from "./monitor-panel-container";
import { ConfigurationPanelContainer } from "./configuration-panel-container";
import {
  IBuildingDB,
  PanelMode,
} from "./components-common-utils/common-parking-slot.interface";
import { MaintenancePanelContainer } from "./maintenance-panel-container";

interface ICompanyPanelRenderer {
  PSDB: IBuildingDB[];
  writeIntoPSDB: (psdb: IBuildingDB[]) => void;
  panelMode: PanelMode;
}

/**
 *
 * @param PSDB - current state of parking facility
 * @param panelMode - selected panel mode by the user
 * @callback writeIntoPSDB - a callback function which writes the updated parking facility to PSDB
 * @returns Conditionally renders the selected panel based on panelMode property
 */

export const CompanyPanelRenderer: React.FC<ICompanyPanelRenderer> = ({
  PSDB,
  writeIntoPSDB,
  panelMode,
}) => {
  return (
    <>
      {panelMode === PanelMode.Monitor && <MonitorPanelContainer PSDB={PSDB} />}

      {panelMode === PanelMode.Configure && (
        <ConfigurationPanelContainer
          PSDB={PSDB}
          writeIntoPSDB={writeIntoPSDB}
        />
      )}

      {panelMode === PanelMode.Maintenance && (
        <MaintenancePanelContainer PSDB={PSDB} writeIntoPSDB={writeIntoPSDB} />
      )}
    </>
  );
};
