import React, { useState } from "react";
import { AvailableParkingSlotsView } from "./AvailableParkingSlotsView";
// import { ConfigureRowColSlots } from "./ConfigureRowColSlots";
import { CreatorPanel } from "./CreatorPanel";
import { IParkingSlotsDB } from "./CreatorPanel";

export const CompanyPanel: React.FC = () => {
  const [view, setView] = useState<"view" | "config" | "maintenance">("view");
  const [parkingSlotsDB, setParkingSlotsDB] = useState<IParkingSlotsDB[][]>([
    [{ rows: 0, cols: 0, slots: [], saved: true }],
  ]);

  const handleSubmission = (db: IParkingSlotsDB[][]) => {
    setParkingSlotsDB(db);
    setView("view");
  };

  return (
    <>
      <nav>
        <button onClick={() => setView("view")}>View State</button>
        <button onClick={() => setView("config")}>Configuration State</button>
        <button onClick={() => setView("maintenance")}>
          Maintenance State
        </button>
      </nav>

      {view === "view" && (
        <AvailableParkingSlotsView
          parkingSlotsDB={parkingSlotsDB}
          onConfigure={() => setView("config")}
        />
      )}

      {view === "config" && (
        <CreatorPanel
          parkingSlotsDB={parkingSlotsDB}
          setParkingSlotsDB={setParkingSlotsDB}
          handleSubmission={handleSubmission}
        />
      )}

      {view === "maintenance" && (
        <div>Maintenance State (Under development)</div>
      )}
    </>
  );
};
