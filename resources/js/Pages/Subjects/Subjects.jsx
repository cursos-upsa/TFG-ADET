import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import JustProfessor from "@/Layouts/JustProfessor.jsx";

const Subjects = ({subjects}) => {

    const deleteSubject = (e, subjectId) => {
        e.stopPropagation();  // Avoid triggering the parent's <li> click event.

        router.delete(route('subjects.destroy', {subjectId}), {
            onBefore: () => confirm('¿Estás seguro de que quieres eliminar esta asignatura?')
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title={"Asignaturas"}/>

            <div className="mb-8">
                <h1>Sus asignaturas</h1>

                <JustProfessor>
                    <div className="mt-4">
                        <Link href={route('subjects.create')}>
                            <button
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 4v16m8-8H4"/>
                                </svg>
                                Crear nueva asignatura
                            </button>
                        </Link>
                    </div>
                </JustProfessor>
            </div>

            {subjects.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                    <p className="text-gray-500">Aún no hay ninguna asignatura.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {subjects.map((subject) => (
                        <li key={subject.id} className="bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center p-4">
                                <Link
                                    href={route('subjects.show', {subjectId: subject.id})}
                                    className="text-indigo-600 font-medium"
                                >
                                    <span className="font-bold">{subject.name}</span>
                                </Link>
                                <JustProfessor>
                                    <button
                                        onClick={(e) => {
                                            deleteSubject(e, subject.id);
                                        }}
                                        className="text-red-500 bg-white border border-red-300 rounded-md px-3 py-1 text-sm"
                                    >
                                        Eliminar
                                    </button>
                                </JustProfessor>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </AuthenticatedLayout>
    );
};

export default Subjects;