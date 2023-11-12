import { useSelector } from "react-redux";
import { getInitialDateForDateField } from "../../../../libraries/time";
import { Input, Form, DatePicker, Space } from "antd";
import "./styles.css";
import {
    CalendarEventFormData,
    CalendarEventFormDataValue,
    OnFormDataChange,
} from "../../../../types/events";
import { AppState } from "../../../../app/store";
import { ChangeEvent } from "react";
import React from "react";
import { Dayjs } from "dayjs";

interface EventFieldProps {
    fieldInfo: CalendarEventFormDataValue;
    fieldName: keyof CalendarEventFormData;
    onFormDataChange: OnFormDataChange;
}

const EventField = ({
    fieldInfo,
    fieldName,
    onFormDataChange,
}: EventFieldProps) => {
    const activeDay = useSelector(
        (state: AppState) => state.calendar.activeDay
    );

    const onDateSelection = (date: Dayjs) => {
        onFormDataChange(date.toString(), fieldName);
    };
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFormDataChange(e.target.value, fieldName);
    };
    return (
        <Space>
            <Form.Item className="form-item" label={fieldInfo.label}>
                {fieldName === "startTime" || fieldName === "endTime" ? (
                    <DatePicker
                        showTime
                        value={
                            fieldInfo.value
                                ? getInitialDateForDateField(fieldInfo.value)
                                : getInitialDateForDateField(activeDay)
                        }
                        onOk={onDateSelection}
                    />
                ) : (
                    <Input value={fieldInfo.value} onChange={onInputChange} />
                )}
            </Form.Item>
        </Space>
    );
};

export default EventField;
