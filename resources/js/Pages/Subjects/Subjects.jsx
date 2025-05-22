import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";

const Subjects = ({subjects}) => {

    const showSubject = (subjectId) => {
        router.get(route('subjects.show', {subjectId}))
    }

    const deleteSubject = (e, subjectId) => {
        e.stopPropagation();  // Avoid triggering the parent's <li> click event.

        router.delete(route('subjects.destroy', {subjectId}), {
            onBefore: () => confirm('¿Estás seguro de que quieres eliminar esta asignatura?')
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title={"Asignaturas"}/>

            <Link href={route('subjects.create')}>
                <button>Crear nueva asignatura</button>
            </Link>

            {subjects.length === 0 &&
                <p>Aún no hay ninguna asignatura.</p>}

            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id} onClick={() => showSubject(subject.id)}>
                        <b>{subject.name}</b> {subject.description}
                        <button onClick={(e) => {
                            deleteSubject(e, subject.id);
                        }}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
};

export default Subjects;
