import {Deferred, Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Loader from "@/Components/Loader.jsx";
import Chats from "@/Pages/Subjects/Partials/Chats.jsx";
import usePopStateReload from "@/Hooks/usePopStateReload.js";
import DoubtProcessingControl from "@/Pages/Subjects/Partials/DoubtProcessingControl.jsx";

const Subject = ({
                     id,
                     name,
                     description,
                     created_at,
                     chats,
                     unprocessedChatsNumber,
                     doubtsNumber,
                     pendingDoubtsNumber
                 }) => {
    usePopStateReload();

    return (
        <AuthenticatedLayout>
            <Head title={name}/>
            <h1>{name}</h1>
            <p><small>Creación: {created_at}</small></p>
            <p>{description}</p>
            <hr/>

            <Deferred fallback={<Loader>Cargando...</Loader>} data={"unprocessedChatsNumber"}>
                <DoubtProcessingControl unprocessedChatsNumber={unprocessedChatsNumber}
                                        subjectId={id}/>
            </Deferred>
            <Deferred fallback={<Loader>Cargando...</Loader>} data={["doubtsNumber", "pendingDoubtsNumber"]}>
                {doubtsNumber === 0 ?
                    <p>No hay dudas de los alumnos para esta asignatura.</p> :
                    <Link>
                        Ver dudas de los alumnos {pendingDoubtsNumber > 0 ? `(${pendingDoubtsNumber} pendientes)` : ''}
                    </Link>}
            </Deferred>
            <Deferred fallback={<Loader>Cargando los chats...</Loader>} data={"chats"}>
                <Chats chats={chats}
                       subjectId={id}/>
            </Deferred>
        </AuthenticatedLayout>
    );
};

export default Subject;