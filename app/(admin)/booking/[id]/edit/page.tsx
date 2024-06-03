import {getBookingById} from "@/data/booking";
import {BookingEditForm} from "./_components/booking-edit-form";

const BookingEditPage = async ({params}: {params: {id: string}}) => {

    const booking = await getBookingById(params.id);

    if(!booking) return null;

    return (
        <div className="container mx-auto max-w-4xl">
            <BookingEditForm defaultData={booking} />
        </div>
    )
}

export default BookingEditPage;