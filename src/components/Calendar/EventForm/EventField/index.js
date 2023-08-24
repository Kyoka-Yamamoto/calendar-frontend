const EventField = ({ fieldInfo, fieldName, onChange }) => {
  return (
    <div>
      <label>{fieldInfo.label}</label>
      <input value={fieldInfo.value} onChange={(e) => onChange(e, fieldName)} />
    </div>
  );
};

export default EventField;
