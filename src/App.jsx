import { useState } from "react";
import Table from "./components/pTable/Table";
import useElementStatus from "./hooks/useElementStatus";
import "./App.css";

function App() {
  const { statusMap, loading } = useElementStatus();

  // Convert statuses to the `assigned` prop (unavailable => assigned)
  const assigned = Object.keys(statusMap)
    .filter((z) => statusMap[z] === "unavailable")
    .map((z) => Number(z));

  return (
    <>
      <h1>The Parade of Elements</h1>
      {loading && (
        <div style={{ fontSize: 12, opacity: 0.7 }}>loading availability…</div>
      )}

      <Table assigned={assigned} readOnly />
    </>
  );
}

export default App;
