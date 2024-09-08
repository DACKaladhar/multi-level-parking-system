import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
} from "./components-common-utils/common-parking-slot.interface";
import { IParkingSlotsDB } from "./configuration-panel-container";
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
    editedMaintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => {
    // Save maintenanceSlot data to maintenanceSlotsDB
    const updatedMSDB: IMaintenanceSlot[][] = [...maintenanceSlotsDB];
    const previousOptions: IMaintenanceSlotType =
      updatedMSDB[buildingIndex][floorIndex].maintenanceSlots[selectedSlot];

    // if other fields are not selected assign them to previous || default properties
    const filteredMaintenanceSlot: IMaintenanceSlotType = {
      isAvailable: editedMaintenanceSlot.isAvailable,
      maintenanceStatus:
        editedMaintenanceSlot?.maintenanceStatus ??
        previousOptions?.maintenanceStatus,
      securityType:
        editedMaintenanceSlot?.securityType ?? previousOptions?.securityType,
      parkingSlotType:
        editedMaintenanceSlot?.parkingSlotType ??
        previousOptions?.parkingSlotType,
      vehicleType:
        editedMaintenanceSlot?.vehicleType ?? previousOptions?.vehicleType,
    };

    updatedMSDB[buildingIndex][floorIndex].maintenanceSlots[selectedSlot] =
      filteredMaintenanceSlot;
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
