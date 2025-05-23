import {Deferred, Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Loader from "@/Components/Loader.jsx";
import Chats from "@/Pages/Subjects/Partials/Chats.jsx";
import usePopStateReload from "@/Hooks/usePopStateReload.js";

const Subject = ({id, name, description, created_at, chats}) => {
    // fix: arreglar problemas de chaché
    usePopStateReload();

    return (
        <AuthenticatedLayout>
            <Head title={name}/>
            <h1>{name}</h1>
            <p><small>Creación: {created_at}</small></p>
            <p>{description}</p>

            <Deferred fallback={<Loader>Cargando los chats...</Loader>} data={"chats"}>
                <Chats chats={chats}
                       subjectId={id}/>
            </Deferred>
        </AuthenticatedLayout>
    );
};

export default Subject;