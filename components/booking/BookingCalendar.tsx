import React from "react";
import { Calendar, View, DateLocalizer } from "react-big-calendar";
import moment from "moment";

import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const allViews: View[] = ["day", "work_week"];

interface Props {
  localizer: DateLocalizer;
  events: CalendarEvent[];
}

interface CalendarEvent {
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  desc?: string;
  resourceId?: string;
  tooltip?: string;
}

function SelectableCalendar({ localizer, events }: Props) {
  return (
    <>
      <Calendar
        selectable={true}
        localizer={localizer}
        events={events}
        defaultView="work_week"
        views={allViews}
        step={60}
        timeslots={1}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        scrollToTime={new Date()}
        onSelecting={() => false}
      />
    </>
  );
}

export default function BookingCalendar({
  events,
}: {
  events: CalendarEvent[];
}) {
  return (
    <div
      className="shadow-lg booking-card"
      style={{ height: "300px", padding: "10px" }}
    >
      <SelectableCalendar localizer={localizer} events={events} />
    </div>
  );
}
