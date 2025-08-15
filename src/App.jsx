import { useState } from "react";
import Table from "./components/pTable/Table";
import "./App.css";

function App() {
  const assigned = [6, 8, 26, 79]; // C, O, Fe, Au
  const pending = [1, 17]; // H, Cl

  return (
    <>
      <h1>The Parade of Elements</h1>

      <Table assigned={assigned} pending={pending} readOnly />
    </>
  );
}

export default App;
