"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import id from '@fullcalendar/core/locales/id';
import {BookingWithRelations} from "@/types/app";
import {MapBookingToCalendarEvent} from "@/components/map-booking-to-calendar-event";
import {useState} from "react";
import {useRouter} from "next/navigation";

interface IProps {
    events: BookingWithRelations[]
}

export const FullCalendarView = ({events}: IProps) => {

    const router = useRouter();

    const calendarEvents = events.map(MapBookingToCalendarEvent);
    const [view, setView] = useState("dayGridMonth");

    const handleClick = (id: string) => {
        router.push(`/booking/${id}/detail`);
    }

    return (
        <div>
            {/*<select value={view} onChange={handleViewChange}>*/}
            {/*    <option value="dayGridMonth">Month View</option>*/}
            {/*    <option value="dayGridYear">Year View</option>*/}
            {/*    <option value="timeGridDay">Day View</option>*/}
            {/*    <option value="timeGridWeek">Week View</option>*/}
            {/*    <option value="resourceTimelineWeek">resourceTimelineWeek</option>*/}
            {/*</select>*/}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin]}
                initialView={view}
                locales={[id]}
                events={calendarEvents}
                height={700}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineWeek,dayGridYear,dayGridMonth,timeGridWeek'
                }}
                nowIndicator={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                eventClick={e => handleClick(e.event.id)}
            />
        </div>
    )
}

const CustomCalendarView = ({event}: any) => {
    return (
        <div>
            <div className='view-title'>
                {event.name}
            </div>
            <div className='view-events'>
                event
            </div>
        </div>
    )
}