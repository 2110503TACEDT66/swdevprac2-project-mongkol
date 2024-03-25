export default async function createBooking(did: string, token: string, apptDate: Date , userName:string , dentistName:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/dentists/${did}/bookings`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            bookDate: apptDate,
            username: userName,
            dentistname : dentistName
        })
    });

    if (!response.ok) {
        // throw new Error("Cannot create reservation");
        console.log(response.status);
        console.log(response.json)
        // console.log(response.)
    }
    window.location.href = '/cart';
    return await response.json();
}