import {BookingWithRelations} from "@/types/app";

interface FullCalendarEvent {
    title: string;
    start: string;
    end: string;
    [key: string]: any; // Untuk properti tambahan yang mungkin diperlukan
}

export const MapBookingToCalendarEvent = (booking: BookingWithRelations): FullCalendarEvent => {
    return {
        title: `${booking.room.name} - ${booking.purpose} `, // Atur judul sesuai kebutuhan
        start: booking.startDate.toISOString(),
        end: booking.endDate.toISOString(),
        id: booking.id,
        // Tambahkan properti lain yang mungkin diperlukan
    };
};