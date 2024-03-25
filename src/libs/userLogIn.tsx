export default async function userLogin(userEmail:string, userPassword:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })
    if (!response.ok) {
        throw new Error('Failed to fetch User Profile')
    }

    return await response.json()
}