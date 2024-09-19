import { useEffect, useState } from "react";
import { CompanyPanelRenderer } from "./company-panel-renderer";
import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
  IParkingSlotsDB,
  // MaintenanceStatus,
  PanelMode,
  ParkingSlotType,
  SecurityType,
  VehicleType,
} from "./components-common-utils/common-parking-slot.interface";
import { ErrorPage, LoadingPage } from "./components-common-utils/common-pages";

/**
 * This is the primary component which handles configuring, maintaining and monitoring
 * the parking facility of a company.
 * @returns Application where user can configure, maintain, monitor the parking facility,
 * and navigate between them using navigation bar .
 */

export const CompanyPanelContainer: React.FC = () => {
  const [parkingSlotsDB, setParkingSlotsDB] = useState<IParkingSlotsDB[][]>([
    [{ rows: 0, cols: 0, slots: [] }],
  ]);
  const [maintenanceSlotsDB, setMaintenanceSlotsDB] = useState<
    IMaintenanceSlot[][]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [panelMode, setPanelMode] = useState<PanelMode>(PanelMode.Monitor);

  const handleNavButtonClick = (selectedState: PanelMode) => {
    panelMode !== PanelMode.Configure
      ? setPanelMode(selectedState)
      : alert("Please submit the slots before changing the mode.");
  };

  const writeIntoPSDB = async (psdb: IParkingSlotsDB[][]) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/parking-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(psdb),
      });

      if (!response.ok) throw new Error("Failed to update PSDB");
      const result = await response.json();
      console.log(result.message);
      setParkingSlotsDB(psdb);
      const updatedMaintenanceSlots = syncMaintainanceSlotsDB(
        psdb,
        maintenanceSlotsDB
      );
      await writeIntoMSDB(updatedMaintenanceSlots);
      setPanelMode(PanelMode.Maintenance);
    } catch (error) {
      console.error("Error updating PSDB:", error);
    }
  };

  const writeIntoMSDB = async (msdb: IMaintenanceSlot[][]) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/maintenance-slots",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(msdb),
        }
      );

      if (!response.ok)
        throw new Error("Failed to update maintenance slots DB");
      const result = await response.json();
      console.log(result.message);
      setMaintenanceSlotsDB(msdb);
    } catch (error) {
      console.error("Error writing to maintenance slots DB:", error);
    }
  };

  const fetchParkingSlots = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/parking-slots");
      if (!response.ok) throw new Error("Failed to fetch parking slots");
      const { data } = await response.json();
      setParkingSlotsDB(data);
    } catch (error) {
      console.error("Error fetching parking slots:", error);

      // Handle error with type checking
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const fetchMaintenanceSlots = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/maintenance-slots"
      );
      if (!response.ok) throw new Error("Failed to fetch maintenance slots");
      const { data } = await response.json();
      setMaintenanceSlotsDB(data);
    } catch (error) {
      console.error("Error fetching maintenance slots:", error);

      // Handle error with type checking
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      await fetchParkingSlots();
      await fetchMaintenanceSlots();
      setLoading(false);
    };

    fetchData();
  }, []);

  // Prevent rendering the CompanyPanelRenderer, while fetch is still running/loading
  if (loading) {
    return (
      <div>
        <LoadingPage message="Fetching your Parking Facility..." />
      </div>
    );
  }

  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <nav>
        <button onClick={() => handleNavButtonClick(PanelMode.Monitor)}>
          Monitor State
        </button>
        <button onClick={() => handleNavButtonClick(PanelMode.Configure)}>
          Configuration State
        </button>
        <button onClick={() => handleNavButtonClick(PanelMode.Maintenance)}>
          Maintenance State
        </button>
      </nav>

      <CompanyPanelRenderer
        parkingSlotsDB={parkingSlotsDB}
        writeIntoPSDB={writeIntoPSDB}
        maintenanceSlotsDB={maintenanceSlotsDB}
        writeIntoMSDB={writeIntoMSDB}
        panelMode={panelMode}
      />
    </>
  );
};

export const syncMaintainanceSlotsDB = (
  parkingSlotsDB: IParkingSlotsDB[][],
  maintenanceSlotsDB?: IMaintenanceSlot[][]
): IMaintenanceSlot[][] => {
  // To make MSDB on sync with updated or latest PSDB
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
          vehicleType: vehicleType,
        });
      }

      buildingMaintenance.push({
        rows: parkingSlotsDB[b][f].rows,
        cols: parkingSlotsDB[b][f].cols,
        maintenanceSlots: floorSlotTypes,
      });
    }

    resultDB.push(buildingMaintenance);
  }

  return resultDB;
};
