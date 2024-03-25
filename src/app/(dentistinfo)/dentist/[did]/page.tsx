import Image from "next/image";
import getDentist from "@/libs/getDentist";
import Link from "next/link";

export default async function DentistDetailPage({ params }: { params: { did: string } }) {

    const dentistDetail = await getDentist(params.did);

    return (
        <main className="text-center p-5">
            <div className="text-2xl font-bold mb-5">Dentist Detail</div>
            <div className="relative w-45 h-64 mb-8">
                <Image src='/img/dentist.png' alt='Dentist Picture' layout="fill" objectFit="cover" className='rounded-t-lg' />
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="text-left px-4 py-2 w-1/4 font-semibold">Name:</td>
                            <td className="px-4 py-2">{dentistDetail.data.name}</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="text-left px-4 py-2 font-semibold">Experience:</td>
                            <td className="px-4 py-2">{dentistDetail.data.yearsOfExperience}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="text-left px-4 py-2 font-semibold">Expertise:</td>
                            <td className="px-4 py-2">{dentistDetail.data.areaOfExpertise}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Link href={`/booking?dentist=${params.did}`}>
                <button className="block rounded-md bg-sky-600 mt-5 mx-auto px-4 py-2 text-white font-semibold shadow-md hover:bg-sky-700">
                    Make Reservation
                </button>
            </Link>
        </main>
    );
}
