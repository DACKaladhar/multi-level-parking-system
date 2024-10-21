import React from "react";
import {
  IMaintenanceSlot,
  IParkingSlotsDB,
} from "./components-common-utils/common-parking-slot.interface";
import { ParkingSlotsViewRenderer } from "./parking-slots-view-renderer";

interface IMonitorPanelContainer {
  parkingSlotsDB: IParkingSlotsDB[][];
  maintenanceSlotsDB?: IMaintenanceSlot[][];
}

/**
 * This is the primary component where company admins manage automated EV
 * parking and real-time parking system features. It handles all related functionalities and interactions.
 * @param parkingSlotsDB - Main DB IParkingSlots
 * @param maintnanceSlotsDB - DB related to the slot properties
 * @returns - A Static Panel where company can use to monitor the real time parking slots data in action
 */

export const MonitorPanelContainer: React.FC<IMonitorPanelContainer> = ({
  parkingSlotsDB,
  maintenanceSlotsDB,
}) => {
  return (
    <>
      <ParkingSlotsViewRenderer
        parkingSlotsDB={parkingSlotsDB}
        // onSlotClick={onSlotClick}  // might need in future
        maintenanceSlotsDB={maintenanceSlotsDB}
      />
    </>
  );
};
