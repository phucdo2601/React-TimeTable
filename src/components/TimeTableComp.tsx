import FullCalendar, {
  EventContentArg,
  EventClickArg,
  DateSelectArg,
  EventApi,
} from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";
let id = 0;
const TimeTableComp = () => {
  const listEventInit = [
    {
      id: String(10001),
      title: "Test Event-01",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: String(20002),
      title: "Test Event-02",
      start: new Date().toISOString().split("T")[0] + "T14:05:00",
    },
  ];

  const [initialEvents, setInitialEvents] = React.useState(listEventInit);

  const [events, setEvents] = React.useState<Array<EventApi>>([]);

  React.useEffect(() => {
    console.log("Events", events);
  }, [events]);

  const handleEvents = (events: EventApi[]) => {
    setEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <>
          <b> {eventContent.timeText}</b>
          <b style={{ color: "red" }}> {eventContent.event.title}</b>
        </>
      </>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(`Event is clicked ${clickInfo.event.title}`);
    console.log(clickInfo.event.id);
    //remove mot event
    clickInfo.event.remove();
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Are you selected this event?");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: String(id++),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        customButtons={{
          btn: {
            text: "Custom Button",
            click(ev: MouseEvent, element: HTMLElement) {
              alert("You are Clicked Custom Btn!");
            },
          },
        }}
        dateClick={(e) => {
          console.log("dateClick", e);
        }}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        initialEvents={initialEvents}
        headerToolbar={{
          left: "prev,next today btn",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay btn",
        }}
        //view mac dinh khi khoi chay timetable
        initialView={"dayGridMonth"}
        //khoi tao nhan, chon tren lich
        selectable={true}
        //dc phep chinh sua tren lich
        editable={true}
        eventDragStart={(e) => {
          console.log("Event is started at", e);
        }}
        eventDragStop={(e) => {
          console.log("Event is stooped at", e);
        }}
        eventBackgroundColor={"blue"}
        eventBorderColor={"purple"}
        eventRemove={(e) => {
          console.log("remove event");
        }}
        eventsSet={handleEvents}
        // format lai tieu de hien thi
        // dayHeaderFormat={{
        //   week:'short',
        //   day: 'numeric',
        //   month: 'short',
        // }}

        //bat su kien them moi mot event vao lich
        eventAdd={(e) => {
          console.log("Event is added: ", e);
        }}
        //bat su kien thay doi mot event vao lich
        eventChange={(e) => {
          console.log("Event is changed: ", e);
        }}
        dayMaxEvents={true}
        weekends={true}
        locales={allLocales}
        firstDay={1}
        locale={"vi"}
        buttonText={{
          day: "Day",
          prev: "Pre",
          nextYear: "Next Year",
          next: "Next",
          month: "Month",
          today: "Today",
          week: "Week",
        }}
      />
    </>
  );
};

export default TimeTableComp;
