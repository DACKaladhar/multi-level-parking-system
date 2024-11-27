import React from "react";
import { IBuildingDB } from "./components-common-utils/common-parking-slot.interface";
import { ParkingSlotsViewRenderer } from "./parking-slots-view-renderer";

interface IMonitorPanelContainer {
  PSDB: IBuildingDB[];
}

/**
 * This is the primary component where company admins manage automated EV
 * parking and real-time parking system features. It handles all related functionalities and interactions.
 * @param PSDB - DB related to the slot properties
 * @returns - A Static Panel where company can use to monitor the real time parking slots data in action
 */

export const MonitorPanelContainer: React.FC<IMonitorPanelContainer> = ({
  PSDB,
}) => {
  return (
    <>
      <ParkingSlotsViewRenderer
        // onSlotClick={onSlotClick}  // might need in future
        PSDB={PSDB}
      />
    </>
  );
};
