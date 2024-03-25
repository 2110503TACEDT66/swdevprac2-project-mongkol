import Link from "next/link"
import Card from "./Card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import Dentist from "@/db/models/Dentist"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { dentistItem } from "../../interface"
import { dentistJson } from "../../interface"

export default async function DentistCatalog({dentistJson} : {dentistJson : Promise<dentistJson>}) {

    const dentistJsonReady = await dentistJson
    
    // console.log(dentistJsonReady)

    const session = await getServerSession(authOptions)
    if (!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token)
    // console.log(profile)

    const addDentist = async (addDentistForm: FormData) => {
        "use server"
        const name = addDentistForm.get("name")
        const yearsOfExperience = addDentistForm.get("yearsOfExperience")
        const areaOfExpertise = addDentistForm.get("areaOfExpertise")

        try {
            await dbConnect()
            const dentist = await Dentist.create({
                name,
                yearsOfExperience,
                areaOfExpertise
            })
            console.log("Created")
        } catch (error) {
            console.log(error)
        }
        revalidateTag("Dentist")
        redirect("/dentist")
    }


    return (
        <>
        Check {dentistJsonReady?.count} of our dentists in the clinic

        <div style={{ margin: "20px", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignContent: "space-around" }}>
                {
                dentistJsonReady.data.map((dentistItem:dentistItem) => (
                    <Link href={`/dentist/${dentistItem.id}`} className="w-1/4 m-3">
                        <Card dentistName={dentistItem.name} yearOfExperience={dentistItem.yearsOfExperience} expertise={dentistItem.areaOfExpertise} />
                    </Link>
                ))  
                }
        </div>
        </>
    )
}