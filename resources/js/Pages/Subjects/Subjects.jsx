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

            <h1>Sus asignaturas</h1>

            <JustProfessor>
                <Link href={route('subjects.create')}>
                    <button>Crear nueva asignatura</button>
                </Link>
            </JustProfessor>

            {subjects.length === 0 &&
                <p>Aún no hay ninguna asignatura.</p>}

            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>
                        <Link href={route('subjects.show', {subjectId: subject.id})}>
                            <b>{subject.name}</b>
                        </Link>
                        <JustProfessor>
                            <button onClick={(e) => {
                                deleteSubject(e, subject.id);
                            }}>Eliminar
                            </button>
                        </JustProfessor>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
};

export default Subjects;