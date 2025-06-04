import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import ErrorList from "@/Components/ErrorList.jsx";
import MatriculationList from "@/Pages/Subjects/Partials/MatriculationList.jsx";
import Loader from "@/Components/Loader.jsx";

const CreateSubject = ({students}) => {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
        extra_instructions: '',
        files: [],
        studentIds: [],
    })

    function submit(e) {
        e.preventDefault()
        post(route('subjects.store'))
    }

    const handleStudentsChange = (selectedStudentIds) => {
        setData('studentIds', selectedStudentIds);
    }

    return (
        <AuthenticatedLayout>
            <Head title={"Crear asignatura"}/>
            <h1>Crear una asignatura</h1>
            <form onSubmit={submit}>
                <label>
                    Nombre de la asignatura:
                    <input type="text"
                           name="name"
                           value={data.name}
                           onChange={(e) => setData('name', e.target.value)}/>
                </label>
                <label>
                    Descripción:
                    <textarea name="description"
                              value={data.description}
                              onChange={(e) => setData('description', e.target.value)}/>
                </label>
                <label>
                    Instrucciones extra para el asistente:
                    <textarea name="extra_instructions"
                              value={data.extra_instructions}
                              onChange={(e) => setData('extra_instructions', e.target.value)}/>
                </label>
                <label>
                    Archivos de contexto:
                    <input type="file"
                           name="file"
                           onChange={(e) => setData('files', e.target.files)}
                           multiple/>
                </label>
                <Deferred fallback={<Loader>Cargando lista de alumnos...</Loader>} data={"students"}>
                    <MatriculationList 
                        students={students}
                        studentIds={data.studentIds}
                        onStudentsChange={handleStudentsChange}/>
                </Deferred>
                <button type="submit" disabled={processing}>
                    Crear asignatura
                </button>
                <output>
                    <ErrorList formErrors={errors}/>
                </output>
            </form>
        </AuthenticatedLayout>
    );
};

export default CreateSubject;
