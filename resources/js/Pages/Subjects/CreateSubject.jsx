import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import ErrorList from "@/Components/ErrorList.jsx";
import MatriculationList from "@/Pages/Subjects/Partials/MatriculationList.jsx";

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

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-indigo-800 mb-6">Crear una asignatura</h1>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-red-800 font-medium">Se han encontrado errores</h3>
                        </div>
                        <ErrorList formErrors={errors}/>
                    </div>
                )}

                <form onSubmit={submit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre de la asignatura:
                        </label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descripción:
                        </label>
                        <textarea 
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="extra_instructions" className="block text-sm font-medium text-gray-700">
                            Instrucciones extra para el asistente:
                        </label>
                        <textarea 
                            id="extra_instructions"
                            name="extra_instructions"
                            value={data.extra_instructions}
                            onChange={(e) => setData('extra_instructions', e.target.value)}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="files" className="block text-sm font-medium text-gray-700">
                            Archivos de contexto:
                        </label>
                        <input 
                            type="file"
                            id="files"
                            name="file"
                            onChange={(e) => setData('files', e.target.files)}
                            multiple
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <Deferred fallback={<p className="text-gray-600 text-center py-4">Cargando lista de alumnos...</p>} data={"students"}>
                            <MatriculationList 
                                students={students}
                                studentIds={data.studentIds}
                                onStudentsChange={handleStudentsChange}
                            />
                        </Deferred>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
                        >
                            Crear asignatura
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateSubject;
