import Image from "next/image";
import getDentist from "@/libs/getDentist";
import Link from "next/link";

export default async function DentistDetailPage({ params }: { params: { did: string } }) {

    const dentistDetail = await getDentist(params.did);

    return (
        <main className="text-center p-5">
            <div className="flex flex-row my-5 items-center">
                {/* <Image src={hospitalDetail.data.picture} alt='Hospital Image'width={0} height={0} sizes="100vw" className="rounded-lg w-[30%] mr-[30px]"/> */}
                <div className="text-md text-left">Name : {dentistDetail.data.name}</div>
                <div className="text-md ">Experience : {dentistDetail.data.yearsOfExperience}</div>
                <div className="text-md ">Expertise : {dentistDetail.data.areaOfExpertise}</div>

                <Link href={`/booking?dentist=${params.did}`}>
                    <button className="block rounded-md bg-sky-600">
                        Make Reservation
                    </button>
                </Link>
            </div>
        </main>
    );
}