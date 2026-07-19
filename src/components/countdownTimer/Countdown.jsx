import { useEffect, useState } from "react";
import "./countdown.css";

const COUNTDOWN_TARGET = new Date("2026-09-05T10:00");

const getRemainingTime = () => {
  const totalRemaining = Math.max(0, COUNTDOWN_TARGET.getTime() - Date.now());

  return {
    days: Math.floor(totalRemaining / (1000 * 60 * 60 * 24)),
    hours: Math.floor((totalRemaining / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((totalRemaining / (1000 * 60)) % 60),
  };
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getRemainingTime()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Countdown to Dragon Con 2026">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
