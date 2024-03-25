import Link from "next/link"
import Card from "./Card"

export default async function DentistCatalog({dentistJson} : {dentistJson : Promise<dentistJson>}) {

    const dentistJsonReady = await dentistJson
    // console.log(dentistJsonReady)

    return (
        <>
        Explore {dentistJsonReady?.count} hospitals in our catalog
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