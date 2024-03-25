import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="h-12 fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-200 flex flex-row justify-end shadow-2xl" style={{backgroundColor:'#E2E2E0'}}>
            {/* <Image src='/img/home.png' width='10px'></Image> */}
            <TopMenuItem title="Home" pageRef='/' />
            {/* <TopMenuItem title="Booking" pageRef="/booking"/> */}
            <TopMenuItem title="View Booking" pageRef='/cart' />

            {
                session ?  null : <TopMenuItem title="Sign-In" pageRef='/api/auth/register' />
            }

            {
                session ? <Link href="/api/auth/signout">
                    <div className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 absolute left-0 top-0  rounded z-30 hover:bg-cyan-600 hover:text-white hover:border-transparent'>
                    Log-out</div></Link> :
                        <Link href="/api/auth/signin">
                    <div className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 absolute left-0 top-0  rounded z-30 hover:bg-cyan-600 hover:text-white hover:border-transparent'>
                    Log-in</div></Link>
            }
        </div>
    );
}