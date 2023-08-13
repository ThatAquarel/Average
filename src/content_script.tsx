import React from "react";
import ReactDOM from "react-dom";
import { StatsGridIcons, generateStatCardsData } from "./ui/stat_cards";
import { fetchTable } from "./data/fetch_table";

function render_react() {
  const tables = document.getElementsByClassName("BlueTableau");
  if (!tables.length) return;

  const react_root = document.createElement("div");

  ReactDOM.render(
    <div>
      <StatsGridIcons data={generateStatCardsData()} />
    </div >,
    react_root
  );

  tables[0].parentElement?.prepend(react_root);
}

render_react();

console.log(fetchTable());
