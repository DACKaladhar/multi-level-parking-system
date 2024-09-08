import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
} from "./components-common-utils/common-parking-slot.interface";
import { IParkingSlotsDB } from "./CreatorPanel";
import { MaintenancePanelRenderer } from "./maintenance-panel-renderer";

export interface IMaintenancePanelContainer {
  parkingSlotsDB: IParkingSlotsDB[][];
  maintenanceSlotsDB: IMaintenanceSlot[][];
  writeIntoMSDB: (msdb: IMaintenanceSlot[][]) => void;
}

export const MaintenancePanelContainer: React.FC<
  IMaintenancePanelContainer
> = ({ parkingSlotsDB, maintenanceSlotsDB, writeIntoMSDB }) => {
  const handleMaintenanceSave = (
    parkingSlotsDB: IParkingSlotsDB[][],
    maintenanceSlotsDB: IMaintenanceSlot[][],
    maintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => {
    // Save maintenanceSlot data to maintenanceSlotsDB
    const updatedMSDB = [...maintenanceSlotsDB];
    updatedMSDB[buildingIndex][floorIndex].maintenanceSlots[selectedSlot] =
      maintenanceSlot;

    writeIntoMSDB(updatedMSDB);
  };

  return (
    <>
      <MaintenancePanelRenderer
        parkingSlotsDB={parkingSlotsDB}
        maintenanceSlotsDB={maintenanceSlotsDB}
        handleMaintenanceSave={handleMaintenanceSave}
      />
    </>
  );
};
