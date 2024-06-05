
import { FullCalendarView } from "@/components/full-calendar";

import {getAllDataWithApprovedLogs} from "@/data/booking"

const CalendarPage = async () => {

    const bookings = await getAllDataWithApprovedLogs();

    return (
        <div>
          <FullCalendarView events={bookings} />
        </div>
    )
}

export default CalendarPage