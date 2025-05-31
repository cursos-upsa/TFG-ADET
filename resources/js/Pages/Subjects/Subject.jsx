import {Deferred, Head, Link} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Loader from "@/Components/Loader.jsx";
import Chats from "@/Pages/Subjects/Partials/Chats.jsx";
import usePopStateReload from "@/Hooks/usePopStateReload.js";
import DoubtProcessingControl from "@/Pages/Subjects/Partials/DoubtProcessingControl.jsx";
import JustProfessor from "@/Layouts/JustProfessor.jsx";

const Subject = ({
                     id,
                     name,
                     description,
                     created_at,
                     chats,
                     unprocessedChatsNumber,
                     pendingDoubtsNumber
                 }) => {
    usePopStateReload();

    return (
        <AuthenticatedLayout>
            <Head title={name}/>

            <div className="mb-8">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold text-indigo-800 mb-2">{name}</h1>
                    <p className="text-sm text-gray-500 mt-2">Creación: {created_at}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>

            <hr className="my-8 border-gray-200"/>

            <JustProfessor>
                <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4">Área de profesor</h3>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <Deferred fallback={<Loader>Cargando...</Loader>} data={"unprocessedChatsNumber"}>
                                <DoubtProcessingControl unprocessedChatsNumber={unprocessedChatsNumber}
                                                    subjectId={id}/>
                            </Deferred>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <Deferred fallback={<Loader>Cargando...</Loader>} data={"pendingDoubtsNumber"}>
                                {pendingDoubtsNumber === 0 ? (
                                    <p className="text-gray-600">No hay dudas pendientes de los alumnos para esta asignatura.</p>
                                ) : (
                                    <Link 
                                        href={route('doubts.show', {subjectId: id})}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Administrar dudas pendientes de los alumnos ({pendingDoubtsNumber})
                                    </Link>
                                )}
                            </Deferred>
                        </div>
                    </div>
                </div>
            </JustProfessor>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
                <Deferred fallback={<div className="text-center py-8"><Loader>Cargando los chats...</Loader></div>} data={"chats"}>
                    <Chats chats={chats} subjectId={id}/>
                </Deferred>
            </div>
        </AuthenticatedLayout>
    );
};

export default Subject;
