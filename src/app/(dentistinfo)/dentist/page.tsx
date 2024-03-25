import DentistCatalog from "@/components/DentistCatalog";
import getDentists from "@/libs/getDentists";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function car() {

    const hospitals = getDentists();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Dentist</h1>
            <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
                <DentistCatalog dentistJson={hospitals} />
            </Suspense>
        </main>
    );
}