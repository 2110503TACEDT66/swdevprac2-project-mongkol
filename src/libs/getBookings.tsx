export default async function getBookings(token: string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/bookings`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }})

    // console.log(response)

    if (!response.ok) throw new Error('Failed to fetch User Profile')

    return await response.json()
}   