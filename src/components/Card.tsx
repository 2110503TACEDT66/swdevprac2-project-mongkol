import React from 'react';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';

export default function Card({ dentistName, yearOfExperience, expertise }: { dentistName: string, yearOfExperience: number, expertise: string }) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return (
        <InteractiveCard contentName={dentistName}>
            <div className='text-center p-4'>
                <div className="relative h-40 w-full mb-5">
                    <Image src='/img/dentist.png' alt='Product Picture' layout="fill" objectFit="cover" className='rounded-t-lg' />
                </div>
                <div className='text-black font-bold'>Dentist Name : {dentistName}</div>
                <div className='text-black italic'>Year Of Experience : {yearOfExperience}</div>
                <div className='text-black italic'>Expertise : {expertise}</div>
            </div>
        </InteractiveCard>
    );
}
