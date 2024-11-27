import { useState } from "react";
import { CompanyPanelRenderer } from "./company-panel-renderer";
import {
  IBuildingDB,
  PanelMode,
} from "./components-common-utils/common-parking-slot.interface";

/**
 * This is the primary component which handles configuring, maintaining and monitoring
 * the parking facility of a company.
 * @returns Application where user can configure, maintain, monitor the parking facility,
 * and navigate between them using navigation bar .
 */

export const CompanyPanelContainer: React.FC = () => {
  const [PSDB, setPSDB] = useState<IBuildingDB[]>(
    [
      {
        buildingName: "Building 1",
        floors: [
          {
            rows: 0,
            cols: 0,
            properties: [],
          },
        ],
      },
    ] // first time ||
    // fetch from database
  );
  const [panelMode, setPanelMode] = useState<PanelMode>(PanelMode.Monitor);

  const handleNavButtonClick = (selectedState: PanelMode) => {
    if (panelMode !== PanelMode.Configure) {
      setPanelMode(selectedState);
    } else if (selectedState !== PanelMode.Configure) {
      alert("Please submit the slots before changing the mode.");
    }
  };

  const writeIntoPSDB = (psdb: IBuildingDB[]) => {
    // Write into remote PSdb & if it successfull do below else write failure logic...
    setPSDB(psdb);

    // ... write the necessary code after db updatation (promises resolves)
    setPanelMode(PanelMode.Maintenance);
  };

  return (
    <>
      <nav>
        <button
          onClick={() => {
            handleNavButtonClick(PanelMode.Monitor);
          }}
        >
          Monitor State
        </button>
        <button
          onClick={() => {
            handleNavButtonClick(PanelMode.Configure);
          }}
        >
          Configuration State
        </button>
        <button
          onClick={() => {
            handleNavButtonClick(PanelMode.Maintenance);
          }}
        >
          Maintenance State
        </button>
      </nav>

      <CompanyPanelRenderer
        PSDB={PSDB}
        writeIntoPSDB={writeIntoPSDB}
        panelMode={panelMode}
      />
      {/* YOU MUST REMOVE THE BELOW SECTION COMPLETELY LATER! */}
      {panelMode === PanelMode.Monitor && (
        <button
          onClick={() => {
            alert("Nothings here!");
          }}
        >
          TAKE DUMMY SLOTS
        </button>
      )}
    </>
  );
};
