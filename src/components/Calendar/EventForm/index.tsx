import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { convertTimeByTimeZone } from "../../../libraries/time";
import {
    setIsFormVisible,
    setActiveEvent,
    fetchEvents,
} from "../../../features/calendar/calendarSlice";
import { useState, useEffect } from "react";
import EventField from "./EventField";
import { CloseOutlined } from "@ant-design/icons";
import "./styles.css";
import { AppState } from "../../../app/store";
import React from "react";
import { CalendarEventFormData, OnFormDataChange } from "../../../types/events";
import { AnyAction } from "@reduxjs/toolkit";

const EventForm = () => {
    const dispatch = useDispatch();

    const activeEvent = useSelector(
        (state: AppState) => state.calendar.activeEvent
    );
    const isFormVisible = useSelector(
        (state: AppState) => state.calendar.isFormVisible
    );
    const selectedYear = useSelector(
        (state: AppState) => state.calendar.selectedYear
    );
    const selectedMonth = useSelector(
        (state: AppState) => state.calendar.selectedMonth
    );
    const timeZone = useSelector((state: AppState) => state.calendar.timeZone);

    const [formData, setFormData] = useState({} as CalendarEventFormData);

    useEffect(() => {
        const { name, startTime, endTime, location, description } =
            activeEvent || {};

        const formattedData = {
            name: {
                label: "Name",
                value: name || "",
            },
            startTime: {
                label: "Start Time",
                value: startTime
                    ? convertTimeByTimeZone(startTime, timeZone).format(
                          "YYYY-MM-DD HH:mm:ss"
                      )
                    : "",
            },
            endTime: {
                label: "End Time",
                value: endTime
                    ? convertTimeByTimeZone(endTime, timeZone).format(
                          "YYYY-MM-DD HH:mm:ss"
                      )
                    : "",
            },
            location: {
                label: "Location",
                value: location || "",
            },
            description: {
                label: "Description",
                value: description || "",
            },
        };

        const formattedEventDataForForm = formattedData;

        setFormData(formattedEventDataForForm);
    }, [activeEvent, isFormVisible, timeZone]);

    const closeAndResetForm = () => {
        dispatch(setIsFormVisible(false));
        dispatch(setActiveEvent(null));
        setFormData({} as CalendarEventFormData);
    };

    const onFormDataChange: OnFormDataChange = (value, fieldName) => {
        const newFormData = { ...formData };
        newFormData[fieldName].value = value;
        setFormData(newFormData);
    };

    const onFormSubmit = async () => {
        const formDataToSubmit = {} as Record<string, string>;

        Object.keys(formData).forEach(
            (key) => (formDataToSubmit[key] = formData[key].value)
        );

        if (
            !(
                formDataToSubmit.name &&
                formDataToSubmit.startTime &&
                formDataToSubmit.endTime
            )
        ) {
            console.log("Failed to submit form - missing data");
            return;
        }

        if (activeEvent) {
            await fetch(
                `http://localhost:8000/calendarEvents/${activeEvent._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataToSubmit),
                }
            );
        } else {
            await fetch("http://localhost:8000/calendarEvents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSubmit),
            });
        }

        closeAndResetForm();
        dispatch(
            fetchEvents({
                year: selectedYear,
                month: selectedMonth,
                timeZone,
            }) as unknown as AnyAction
        );
    };

    const onEventDelete = async () => {
        if (activeEvent) {
            await fetch(
                `http://localhost:8000/calendarEvents/${activeEvent._id}`,
                {
                    method: "DELETE",
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response failed");
                    }
                    console.log("Deleted successfully:", response);
                    closeAndResetForm();
                    dispatch(
                        fetchEvents({
                            year: selectedYear,
                            month: selectedMonth,
                            timeZone,
                        }) as unknown as AnyAction
                    );
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    };

    return isFormVisible ? (
        <div className="container-side-menu">
            <div className="eventform-container">
                <div className="close-button-container">
                    <CloseOutlined onClick={closeAndResetForm} />
                </div>
                <div className="eventform">
                    {Object.keys(formData).map((fieldName) => (
                        <EventField
                            key={fieldName}
                            fieldInfo={formData[fieldName]}
                            fieldName={fieldName}
                            onFormDataChange={onFormDataChange}
                        />
                    ))}
                </div>
                <div className="button-container">
                    {activeEvent ? (
                        <>
                            <Button type="primary" onClick={onFormSubmit}>
                                Update
                            </Button>
                            <Button type="text" danger onClick={onEventDelete}>
                                Delete
                            </Button>
                        </>
                    ) : (
                        <Button type="primary" onClick={onFormSubmit}>
                            Create
                        </Button>
                    )}
                </div>
            </div>
        </div>
    ) : null;
};

export default EventForm;
