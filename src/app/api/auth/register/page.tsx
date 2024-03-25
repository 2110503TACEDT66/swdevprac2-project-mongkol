'use client'
import { useState } from 'react';
import userLogin from '@/libs/userLogIn';
import userRegister from '@/libs/userRegister';


export default function Register() {
    const [reg, setreg] = useState({
        name: '',
        tel: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setreg({ ...reg, [e.target.name]: e.target.value });
    };

    const userRegis = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await userRegister(reg.name, reg.tel, reg.email, reg.password);
        window.location.href = '/';
    };

    return (
        <main className="bg-slate-100 m-5 p-5">
        <form onSubmit={userRegis} className="flex justify-center">
            <table className="w-1/2">
                <tbody>
                    <tr className='pb-3'>
                        <td className="text-right pr-4"><label htmlFor="name" className="text-gray-700">Name</label></td>
                        <td><input type="text" required id="name" name="name" placeholder="Name" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td className="text-right pr-4"><label htmlFor="tel" className="text-gray-700">Tel</label></td>
                        <td><input type="text" required id="tel" name="tel" placeholder="Tel" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td className="text-right pr-4"><label htmlFor="email" className="text-gray-700">Email</label></td>
                        <td><input type="text" required id="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td className="text-right pr-4"><label htmlFor="password" className="text-gray-700">Password</label></td>
                        <td><input type="password" required id="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Register</button>
        </form>
    </main>
    );
}