import { useState } from "react";
import Table from "./components/pTable/Table";
import useElementStatus from "./hooks/useElementStatus";
import Countdown from "./components/countdownTimer/Countdown";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import "./App.css";

function App() {
  const { statusMap, loading } = useElementStatus();

  // Convert statuses to the `assigned` prop (unavailable => assigned)
  const assigned = Object.keys(statusMap)
    .filter((z) => statusMap[z] === "unavailable")
    .map((z) => Number(z));

  return (
    <>
      <Countdown />
      <Header />
      {loading && (
        <div style={{ fontSize: 12, opacity: 0.7 }}>loading availabile elements…</div>
      )}

      <Table assigned={assigned} readOnly />
      <Footer />
    </>
  );
}

export default App;
