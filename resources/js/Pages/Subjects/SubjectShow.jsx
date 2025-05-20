import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const SubjectShow = ({name, description, created_at}) => {
    return (
        <AuthenticatedLayout>
            <Head title={name}/>

            <h1>{name}</h1>
            <p><small>Creación: {created_at}</small></p>
            <p>{description}</p>
        </AuthenticatedLayout>
    );
};

export default SubjectShow;