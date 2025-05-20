import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";

const Subjects = ({subjects}) => {

    const showSubject = (subjectId) => {
        router.get(route('subjects.show', {subjectId}))
    }

    const deleteSubject = (subjectId) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta asignatura?')) {
            router.delete(route('subjects.destroy', {subjectId}))
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={"Asignaturas"}/>

            {subjects.length === 0 &&
                <p>Aún no hay ninguna asignatura</p>}

            <Link href={route('subjects.create')}>
                <button>Crear nueva asignatura</button>
            </Link>

            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id} onClick={() => showSubject(subject.id)}>
                        <b>{subject.name}</b> {subject.description}
                        <button onClick={() => deleteSubject(subject.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
};

export default Subjects;