import React, { useState } from "react";
import "../components-styles/parking-slots-view.css";
import {
  BuildingDropdown,
  FloorDropdown,
} from "./components-common-utils/dynamic-buttons";
import {
  IMaintenanceSlot,
  IMaintenanceSlotType,
  IParkingSlotsDB,
  ParkingSlotType,
  VehicleType,
} from "./components-common-utils/common-parking-slot.interface";

interface IParkingSlotsViewRenderer {
  parkingSlotsDB: IParkingSlotsDB[][];
  onSlotClick?: (
    buildingIndex: number,
    floorIndex: number,
    slotNumber: number
  ) => void;
  maintenanceSlotsDB?: IMaintenanceSlot[][];
}

/**
 *  A dynamic component that renders a grid of parking slots across
 * all floors and buildings. It can be utilized anywhere, with
 * customizable interactions via the onSlotClick Callback.
 * @param parkingSlotsDB - A 2D array representing the parking slots database, where each element is an object containing rows, cols, and slots.
 * @param maintenanceSlotsDB - For displaying the slot properties on each respective slot
 * @callback onSlotClick - A customized callback for handling slot clicks in the view
 * @returns {JSX.Element} A grid of parking slots are being rendered.
 */

export const ParkingSlotsViewRenderer: React.FC<IParkingSlotsViewRenderer> = ({
  parkingSlotsDB,
  onSlotClick,
  maintenanceSlotsDB,
}) => {
  const [selectedBuildingIndex, setSelectedBuildingIndex] = useState<number>(0);
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(0);

  const handleBuildingChange = (selectedBuilding: number): void => {
    setSelectedBuildingIndex(selectedBuilding);
    setSelectedFloorIndex(0);
  };

  const handleFloorChange = (selectedFloor: number): void => {
    setSelectedFloorIndex(selectedFloor);
  };

  const buttons = [];
  const rows = parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].rows;
  const cols = parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].cols;
  const unavailableSlots =
    parkingSlotsDB[selectedBuildingIndex][selectedFloorIndex].slots;

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      rowButtons.push(
        <button
          key={index}
          className={`square-button ${
            unavailableSlots[index] ? "" : "disappear"
          }`}
          onClick={() => {
            onSlotClick &&
              onSlotClick(selectedBuildingIndex, selectedFloorIndex, index);
          }}
          style={{
            backgroundImage:
              unavailableSlots[index] &&
              maintenanceSlotsDB &&
              maintenanceSlotsDB[selectedBuildingIndex][selectedFloorIndex]
                ?.maintenanceSlots[index]
                ? `url("${getVehicleImageUrl(
                    maintenanceSlotsDB[selectedBuildingIndex][
                      selectedFloorIndex
                    ].maintenanceSlots[index]
                  )}")`
                : "none",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="badge-slotType">
            {/* Either only one of below should be displayed */}
            {false && <span className="badge-text"></span>}
            {unavailableSlots[index] &&
              maintenanceSlotsDB?.[selectedBuildingIndex]?.[selectedFloorIndex]
                ?.maintenanceSlots[index].isAvailable &&
              maintenanceSlotsDB?.[selectedBuildingIndex]?.[selectedFloorIndex]
                ?.maintenanceSlots[index]?.parkingSlotType && (
                // showing badge only if slot is available and parking slot type is defined
                <img
                  src={
                    maintenanceSlotsDB &&
                    maintenanceSlotsDB[selectedBuildingIndex][
                      selectedFloorIndex
                    ]?.maintenanceSlots[index]
                      ? getSlotTypeImageUrl(
                          maintenanceSlotsDB[selectedBuildingIndex][
                            selectedFloorIndex
                          ].maintenanceSlots[index]
                        )
                      : ""
                  }
                  alt=""
                  className="badge-img"
                />
              )}
          </div>
        </button>
      );
    }
    buttons.push(
      <div key={i} className="button-row">
        {rowButtons}
      </div>
    );
  }

  return (
    <div className="parking-facility-view">
      <div className="button-row">
        <div className="unique-div">
          {buttons.length > 0 ? (
            <>
              <h1 style={{ fontWeight: "lighter" }}>
                Parking Slots of Your Company
              </h1>
              <BuildingDropdown
                canAddBuilding={false}
                onBuildingChange={handleBuildingChange}
                totalBuildings={parkingSlotsDB.length}
              />
              <FloorDropdown
                canAddFloor={false}
                onFloorChange={handleFloorChange}
                selectedFloor={selectedFloorIndex}
                totalFloors={parkingSlotsDB[selectedBuildingIndex].length}
              />
              {buttons} {/** All the slots are being rendered here */}
            </>
          ) : (
            <>
              <p style={{ fontWeight: "lighter" }}>
                Please Configure parking slots.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getVehicleImageUrl = (slotTypeInfo: IMaintenanceSlotType) => {
  switch (slotTypeInfo.vehicleType) {
    case VehicleType.TwoWheeler:
      return "../public-assets/vehicle-types/2wheeler-4.png";
    case VehicleType.FourWheeler:
      return "../public-assets/vehicle-types/4wheeler-5.png";
    case VehicleType.Handicapped:
      return "../public-assets/vehicle-types/handicapped-2.png";
    case VehicleType.CustomizedVehicle:
      return "../public-assets/vehicle-types/customized-vehicle-1.png";
    case VehicleType.Cab:
      return "../public-assets/vehicle-types/Cab-3.png";
    case VehicleType.Truck:
      return "../public-assets/vehicle-types/Truck-2.png";
    case VehicleType.Bicycle:
      return "../public-assets/vehicle-types/Bicycle-1.png";
    case VehicleType.Dual:
      return "../public-assets/vehicle-types/Dual-1.png";
    default:
      return ""; // Return an empty string or a default image path
  }
};

const getSlotTypeImageUrl = (slotTypeInfo: IMaintenanceSlotType) => {
  switch (slotTypeInfo.parkingSlotType) {
    case ParkingSlotType.ElectricVehicle:
      return "../public-assets/slot-types/plant.png";
    case ParkingSlotType.LongTermParking:
      return "../public-assets/slot-types/calender.png";
    case ParkingSlotType.OpenParking:
      return "../public-assets/slot-types/open.png";
    case ParkingSlotType.Reserved:
      return "../public-assets/slot-types/reserved.png";
    case ParkingSlotType.VisitorsParking:
      return "../public-assets/slot-types/visitor.png";
    case ParkingSlotType.Regular:
      return "../public-assets/slot-types/parking.png";
    default:
      return ""; // Return an empty string or a default image path
  }
};
