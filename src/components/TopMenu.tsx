import styles from './topmenu.module.css';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions);

    return (
        <div className="h-12 fixed top-0 left-0 right-0 z-30 border-t border-b border-gray-200 flex flex-row justify-end" style={{backgroundColor:'#E2E2E0'}}>
            <TopMenuItem title="Booking" pageRef="/booking"/>
            <TopMenuItem title="View Booking" pageRef='/cart' />
            {/* <Image src={"/img/logo.png"} className="h-full w-auto ml-8" alt='Logo' width={0} height={0} sizes='100vh'/>  */}
            {
                session ? <Link href="/api/auth/signout">
                    <div className='flex items-center absolute left-0 h-full px-2 text-black text-sm mr-2 rounded-xl' style={{backgroundColor: '#A2C7C0'}}>
                    Sign-out</div></Link> :
                <Link href="/api/auth/signin">
                    <div className='flex items-center absolute left-0 h-full px-2 text-black text-sm ml-2 underline'>
                    Sign-in</div></Link>
            }
        </div>
    );
}