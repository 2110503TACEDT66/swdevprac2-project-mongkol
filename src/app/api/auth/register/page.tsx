'use client'
import { useState } from 'react';
import userLogin from '@/libs/userLogIn';
import userRegister from '@/libs/userRegister';
import Image from 'next/image';

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
        <main className="bg-white m-5 p-5 rounded-xl shadow-md w-2/3 mx-auto">
        <form onSubmit={userRegis} className="flex justify-center">
            <table className="w-1/3">
                <tbody>
                    <tr className='h-10'>
                        <td className="text-left pr-4"><label htmlFor="name" className="text-black font-serif">Name: </label></td>
                        <td><input type="text" required id="name" name="name" placeholder="Name" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr className='h-10'>
                        <td className="text-left pr-4"><label htmlFor="tel" className="text-black font-serif">Tel: </label></td>
                        <td><input type="text" required id="tel" name="tel" placeholder="Tel" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr className='h-10'>
                        <td className="text-left pr-4"><label htmlFor="email" className="text-black font-serif">Email: </label></td>
                        <td><input type="text" required id="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} /></td>
                    </tr>
                    <tr className='h-10'>
                        <td className="text-left pr-4"><label htmlFor="password" className="text-black font-serif">Password:</label></td>
                        <td><input type="password" required id="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-xl">Register</button>
        </form>
        <Image src="/img/smileFace.png" width="400" height="300" alt='smiling face' className='mx-auto rounded-xl mt-10'></Image>
    </main>
    );
}