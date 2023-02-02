import React from "react";
import ReactDOM from "react-dom";
import { StatsRing } from "./ui/stat_ring";

function render_react() {
  const tables = document.getElementsByClassName("BlueTableau");
  if (!tables.length) return;

  const react_root = document.createElement("div");
  ReactDOM.render(
    <div>
      <StatsRing data={[
          {
            "label": "Page views",
            "stats": "456,578",
            "progress": 65,
            "color": "teal",
            "icon": "up"
          },
          {
            "label": "New users",
            "stats": "2,550",
            "progress": 72,
            "color": "blue",
            "icon": "up"
          },
          {
            "label": "Orders",
            "stats": "4,735",
            "progress": 52,
            "color": "red",
            "icon": "down"
          }
        ]
      }/>
    </div >,
    react_root
  );

  tables[0].parentElement?.prepend(react_root);
}

render_react()
