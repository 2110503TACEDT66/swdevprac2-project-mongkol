export default async function getUserProfile(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        }})

    if (!response.ok) throw new Error('Failed to fetch User Profile')

    return await response.json()
}   