import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const BookingCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
      defaultView={"week"}
      views={["week"]}
      step={60}
      timeslots={1}
      selectable={"true"}
    />
  </div>
);

export default BookingCalendar;
