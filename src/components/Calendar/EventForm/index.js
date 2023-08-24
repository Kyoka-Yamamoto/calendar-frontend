import { useState, useEffect } from "react";
import EventField from "./EventField";
import "./styles.css";

const EventForm = ({ isFormVisible, calendarEventId }) => {
  const initialFormState = {
    name: {
      label: "Name",
      value: null,
    },
    startTime: {
      label: "Start Time",
      value: null,
    },
    endTime: {
      label: "End Time",
      value: null,
    },
    location: {
      label: "Location",
      value: null,
    },
    description: {
      label: "Description",
      value: null,
    },
  };

  const [formData, setFormData] = useState(initialFormState);

  const onFormDataChange = (e, fieldName) => {
    const newFormData = { ...formData };
    newFormData[fieldName].value = e.target.value;
    setFormData(newFormData);
  };

  const onFormSubmit = async () => {
    const formDataToSubmit = {};

    Object.keys(formData).forEach(
      (key) => (formDataToSubmit[key] = formData[key].value)
    );

    await fetch("http://localhost:8000/calendarEvents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSubmit),
    });
  };

  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  useEffect(() => {
    if (calendarEventId) {
      setIsDeleteButtonVisible(true);
    } else {
      setIsDeleteButtonVisible(false);
    }
  }, [calendarEventId]);

  const onEventDelete = async () => {
    await fetch(`http://localhost:8000/calendarEvents/${calendarEventId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Deleted successfully:", data);
      })
      .then((error) => {
        console.log("Error:", error);
      });
  };

  return isFormVisible ? (
    <div className="container-side-menu">
      <div className="eventform">
        {Object.keys(formData).map((fieldName) => (
          <EventField
            fieldInfo={formData[fieldName]}
            fieldName={fieldName}
            onChange={onFormDataChange}
          />
        ))}
        <button onClick={onFormSubmit}>Create</button>
        {isDeleteButtonVisible && (
          <button onClick={onEventDelete}>Delete</button>
        )}
      </div>
    </div>
  ) : null;
};

export default EventForm;
