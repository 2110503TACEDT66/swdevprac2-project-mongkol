"use client"
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
            <div className='text-center p-4 h-1/4'>
                {/* <Image src={imgSrc} alt='Product Picture' fill={true} className='object-cover rounded-t-lg' /> */}
                <div className='text-black'>Dentist Name : {dentistName}</div>
                <div className='text-black'>Year Of Experience : {yearOfExperience}</div>
                <div className='text-black'>Expertise : {expertise}</div>
                <div className='mb-4'></div>
            </div>
        </InteractiveCard>
    );
}
