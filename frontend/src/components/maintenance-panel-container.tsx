import {
  IBuildingDB,
  IMaintenanceSlotType,
} from "./components-common-utils/common-parking-slot.interface";
import { MaintenancePanelRenderer } from "./maintenance-panel-renderer";

export interface IMaintenancePanelContainer {
  PSDB: IBuildingDB[];
  writeIntoPSDB: (psdb: IBuildingDB[]) => void;
}

/**
 * This component allows for editing slot properties for each parking facility and updates
 * the main MSDB via a callback.
 * @param parkingSlotsDB - The structure of parking facility
 * @callback writeIntoMSDB - This callback handles saving the current edits into main database
 * @returns - A renderer that displays an editable view of the parking facility, enabling users to modify slot properties.
 */

export const MaintenancePanelContainer: React.FC<
  IMaintenancePanelContainer
> = ({ PSDB, writeIntoPSDB }) => {
  const handleMaintenanceSave = (
    psdb: IBuildingDB[],
    editedMaintenanceSlot: IMaintenanceSlotType,
    buildingIndex: number,
    floorIndex: number,
    selectedSlot: number
  ) => {
    // Save maintenanceSlot data to maintenanceSlotsDB
    const updatedPSDB: IBuildingDB[] = [...psdb];
    const previousOptions: IMaintenanceSlotType =
      updatedPSDB[buildingIndex].floors[floorIndex].properties[selectedSlot];

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

    updatedPSDB[buildingIndex].floors[floorIndex].properties[selectedSlot] =
      filteredMaintenanceSlot;
    writeIntoPSDB(updatedPSDB);
  };

  return (
    <>
      <MaintenancePanelRenderer
        PSDB={PSDB}
        handleMaintenanceSave={handleMaintenanceSave}
      />
    </>
  );
};
