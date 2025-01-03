import * as React from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ToggleBooks({ setListView, setGridView }) {
  const [view, setView] = React.useState("list");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <div className="toggle-group">
      <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
        <ToggleButton value="module" aria-label="module" onClick={setGridView}>
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value="list" aria-label="list" onClick={setListView}>
          <ViewListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
