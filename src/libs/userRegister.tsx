export default async function userRegister(userName:string ,  userTel:string , userEmail:string , userPassword:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/register` , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            password: userPassword,
        })
    })
    if (!response.ok) {
        // throw new Error('Failed to fetch User Profile')
        alert("This email is already registered")
    }

    return await response.json()
}