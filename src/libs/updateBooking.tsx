export default async function updateBooking(bookingId: string, token: string , apptDate:Date , dentistId:string , dentistName:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            bookDate: apptDate,
            dentist: dentistId,
            dentistname : dentistName
        })
    });

    if (!response.ok) {
        console.log(response.status);
        const errorResponse = await response.json();
        console.log(errorResponse);
        throw new Error("Failed to update booking");
    }

    return await response.json();
}
