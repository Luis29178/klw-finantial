import React, { useState, useEffect } from "react";
import "./Appointments.css";
import { DayPicker } from "react-day-picker";
import "../../Components/Calender/DayPickerStyles.css";

import { addYears } from "date-fns";

const Appointments = () => {
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [purpose, setPurpose] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [disabledDays, setDisabledDays] = useState(undefined);
  // Function to generate an array of dates that are Tuesday, Thursday, or Saturday within a specified range

  const tempHours = [
    "10:00am - 11:00am",
    "11:30am - 12:30pm",
    "01:00pm - 02:00pm",
    "02:30pm - 03:30pm",
    "04:00pm - 05:00pm",
  ];
  const generateTargetDaysArray = () => {
    const startDate = new Date(); // Start date (today)
    const endDate = addYears(startDate, 5); // End date 5 years later

    const isTargetDay = (date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek === 0 || dayOfWeek === 4 || dayOfWeek === 6; // 0 for Sunday, 4 for Thursday, 6 for Saturday
    };
    const targetDaysArray = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (isTargetDay(date)) {
        targetDaysArray.push(new Date(date)); // Push a new instance of the date to avoid reference issues
      }
    }

    return targetDaysArray;
  };

  useEffect(() => {
    // Generate targetDaysArray and disabledDays
    const targetDaysArray = generateTargetDaysArray();
    setDisabledDays([{ before: new Date() }, ...targetDaysArray]);
  }, []);

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  const timeTable = (
    <div className="time_table">
      <div className="hours_column">
        {tempHours.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <p
                key={item}
                className={
                  selectedTime === item ? "time_text_selected" : "time_text"
                }
                onClick={() => {
                  selectedTime !== item
                    ? setSelectedTime(item)
                    : setSelectedTime(undefined);

                  console.log(`selected day ${item}`);
                }}
              >
                {item}
              </p>
            );
          }
          return null;
        })}
      </div>
      <div className="hours_column">
        {tempHours.map((item, index) => {
          if (index % 2 === 1) {
            return (
              <p
                key={item}
                className={
                  selectedTime === item ? "time_text_selected" : "time_text"
                }
                onClick={() => {
                  selectedTime !== item
                    ? setSelectedTime(item)
                    : setSelectedTime(undefined);

                  console.log(`selected day ${item} `);
                }}
              >
                {item}
              </p>
            );
          }
          return null;
        })}
      </div>
    </div>
  );

  return (
    <div className="appointmentContainer">
      <div className="appointment">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={setSelectedDay}
          disabled={disabledDays}
          showOutsideDays
          footer={selectedDay !== undefined ? timeTable : <></>}
        />

        {selectedTime !== undefined && selectedDay !== undefined ? (
          <div className="purpose_notes_box">
            <div className="purpose_notes">
              <p className="purpose_notes_text">Purpose of Appointment:</p>
              <textarea
                className="purpose_notes_input"
                placeholder="Please provide a brief description of what you are looking to discuss."
                onChange={(e) => setPurpose(e.target.value)}
              />
              <input
                className="appointment_email_input"
                type="email"
                placeholder="your@email.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="submit_button_box">
                <button className="submit_button">Submit</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Appointments;
