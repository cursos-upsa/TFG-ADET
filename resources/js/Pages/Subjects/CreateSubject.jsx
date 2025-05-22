import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import ErrorList from "@/Components/ErrorList.jsx";

const CreateSubject = () => {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
        extra_instructions: '',
        files: [],
    })

    function submit(e) {
        e.preventDefault()
        post(route('subjects.store'))
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