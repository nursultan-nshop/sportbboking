import React, { useState } from "react";
import "../css/ScheduleTable.css";

const days = [
  "Today",
  "Tue 01.08",
  "Wed 02.08",
  "Thu 03.08",
  "Fri 04.08",
  "Sat 05.07",
  "Sun 06.07",
];

const times = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
  "22:00 - 23:00",
];

export default function ScheduleTable({ venueName }) {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  const handleBook = async () => {
    if (!selectedDay || !selectedTime) {
      setMessage("Күн мен уақытты таңдаңыз");
      return;
    }

    try {
      const res = await fetch("http://localhost:3002/api/bookings/by-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          venue_name: venueName,
          date: selectedDay,
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Сәтті брондалды!");
      } else {
        setMessage(data.error || "Қате пайда болды");
      }
    } catch (e) {
      setMessage("Сервер қатесі");
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">SCHEDULE</h2>

      <div className="schedule-table">
        <table>
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <th
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={selectedDay === day ? "selected" : ""}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {days.map((day) => (
                  <td
                    key={day + time}
                    className={
                      selectedDay === day && selectedTime === time
                        ? "selected"
                        : ""
                    }
                    onClick={() => {
                      setSelectedDay(day);
                      setSelectedTime(time);
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="book-button" onClick={handleBook}>
        Book slot
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
