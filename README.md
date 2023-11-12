# Calendar App

## Description

This is a vertical calendar app which shows events monthly. The app allows you to see calendar events for a given month, create new events, update existing events, and delete existing events.

The app was built using React.js, Typescript, and Ant Design components.

## Setup

To run the application locally:

1. Install dependencies using a package manager such as `npm` or `yarn`. If using `npm`, you can install dependencies by running the following command at the root directory of this project:

`npm install`

2. Ensure that the Calendar Backend app is running locally. You can find the repository for the backend here: https://github.com/Kyoka-Yamamoto/calendar-backend

## Usage

### Demo

https://github.com/Kyoka-Yamamoto/calendar-frontend/assets/55196803/ba2bf334-338f-48ad-a2ef-49181d95011a

### Viewing Events

Events for the month will be displayed on the day they start. The current day will be highlighted on the current month by a blue circle around the day number. You can change the selected month using the selectors at the top of the application.

### Creating Events

You can create an event by clicking on the number of the day, or in the empty space for a day with no events. A modal will open where you can enter the name, start time, end time, location, and description of the event. Location and description are optional fields. After entering the details for the event, you can click the `Create` button to create the event. After creating the event, it will show on the calendar.

### Modifying Events

You can update an existing event by clicking on the event in the calendar. This will open up a modal where you can either:

-   Update event details by changing the contents of the details and clicking the `Update` button
-   Delete the event by clicking the `Delete` button

Updating or deleting an event will show the changes immediately in the calendar.
