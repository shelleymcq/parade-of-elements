import React, {useState, useEffect} from "react";
import "./countdown.css"

const countdown_target = new Date("2026-09-03T23:59:59")

const getRemainingTime = () => {
    const totalRemaining = countdown_target - new Date();
    // convert to ms
    const days = Math.floor(totalRemaining / (1000*24*60*60));
    const hours = Math.floor((totalRemaining / (100*60*60)) % 24);  // remove the days
    const minutes = Math.floor((totalRemaining / (1000*60)) % 60);  //remove the hours

    return {days, hours, minutes};
};

export default function Countdown() {

    const [timeLeft, setTimeLeft] = useState(() => getRemainingTime());

    // update countdown every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getRemainingTime())
        }, 60000);

        return() => {
            clearInterval(timer);
        };
    }, []);
    
    return (
        <div className="countdown">
            <h2>Countdown to Dragon Con 2026</h2>
            <div className="content">
                <div className="box">
                    <div className="value">
                        <span>{timeLeft.days}</span>
                    </div>
                    <span className="label">days</span>
                </div>
                <div className="box">
                    <div className="value">
                        <span>{timeLeft.hours}</span>
                    </div>
                    <span className="label">hours</span>
                </div>
                <div className="box">
                    <div className="value">
                        <span>{timeLeft.minutes}</span>
                    </div>
                    <span className="label">minutes</span>
                </div>
            </div>
        </div>
    )
}

