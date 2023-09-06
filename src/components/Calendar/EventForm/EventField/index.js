import { useSelector } from "react-redux";
import { getInitialDateForDateField } from "../../../../libraries/time";
import { Input, Form, DatePicker, Space } from "antd";
import "./styles.css";

const EventField = ({ fieldInfo, fieldName, onFormDataChange }) => {
  const activeDay = useSelector((state) => state.calendar.activeDay);

  const onDateSelection = (date) => {
    onFormDataChange(date.toString(), fieldName);
  };
  const onInputChange = (e) => {
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
