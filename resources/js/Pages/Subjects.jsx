import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Subjects = () => {
    return (
        <AuthenticatedLayout>
            <Head title={"Asignaturas"}/>
            Aquí se mostrarán todas las asignaturas del usuario actual.
        </AuthenticatedLayout>
    );
};

export default Subjects;