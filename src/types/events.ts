export interface CalendarEventType extends Record<string, string> {
    name: string,
    startTime: string,
    endTime: string,
    location: string,
    description: string,
}

export interface CalendarEventFormDataValue extends Record<string, string> {
    label: string;
    value: string;
}

export interface CalendarEventFormData extends Record<string, CalendarEventFormDataValue> {
    name: CalendarEventFormDataValue,
    startTime: CalendarEventFormDataValue,
    endTime: CalendarEventFormDataValue,
    location: CalendarEventFormDataValue,
    description: CalendarEventFormDataValue,
}

export interface OnFormDataChange {
    (value: string, fieldName: keyof CalendarEventFormData): void;
}
