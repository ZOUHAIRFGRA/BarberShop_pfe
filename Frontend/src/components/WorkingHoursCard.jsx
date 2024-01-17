import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile, faClock } from "@fortawesome/free-solid-svg-icons";

const WorkingHoursCard = ({ workingHours, phone }) => {
  return (
    <div className="card">
      <div className="card-header">
        <p className="card-title">
          {" "}
          <FontAwesomeIcon icon={faMobile} /> {phone}
        </p>
      </div>
      <div className="card-body">
        <table className="table">
          <thead></thead>
          <tbody>
            {workingHours.map((day, index) => (
              <tr key={index}>
                <td>{day.dayOfWeek}</td>
                <td>{day.workingHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkingHoursCard;
