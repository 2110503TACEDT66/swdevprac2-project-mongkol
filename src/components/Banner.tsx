'use client'
import styles from './banner.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import getUserProfile from '@/libs/getUserProfile';

export default function Banner() {

  const covers = ['/img/cover.png', '/img/cover2.png', '/img/cover3.png' , '/img/cover4.png']
  const [index , setIndex] = useState(0);
  const router = useRouter(); 
  const { data:session} = useSession();
  console.log(session?.user.token);

  // if (session) {
  //   const profile = getUserProfile(session.user.token);
  //   console.log(profile);
  // }
  
  return (
    <div className={styles.banner} onClick={() => setIndex(index+1)}>
        <Image src={covers[index%4]} alt='cover' fill={true} objectFit='cover'/>
        <div className={styles.bannerText}>
            <h1 className='text-5xl font-bold '>Welcome to Mongkol Dental Clinic</h1>
            <h3 className='text-xl font-serif drop-shadow-lg'>- Revitalize your smile with expert dental care tailored just for you -</h3>
            <h4 className='text-lg font-serif italic drop-shadow-lg'>"Experience the confidence of a healthy, radiant smile"</h4>
            <div className='mb-10'></div>
            <button
              className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 hover:bg-cyan-600 hover:text-white hover:border-transparent'
              onClick={(e) => { e.stopPropagation(); router.push('/dentist'); }}>
              BOOK NOW
            </button>
        </div>
    </div>
  );
}