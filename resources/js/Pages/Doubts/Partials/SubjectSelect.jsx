import {useForm} from "@inertiajs/react";

const SubjectSelect = ({subjectId, subjectList}) => {
    const {get} = useForm();

    const handleChange = (e) => {
        const newVisibleSubjectId = e.target.value;
        const sanitizedNewVisibleSubjectId = newVisibleSubjectId ? parseInt(newVisibleSubjectId) : null;

        get(route('forum.index', {
            subjectId: sanitizedNewVisibleSubjectId
        }), {
            preserveScroll: true,
        });
    }

    return (
        <div className="relative">
            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por asignatura:
            </label>
            <div className="relative">
                <select 
                    id="subject-select"
                    name="visibleSubject"
                    defaultValue={subjectId || ""}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none bg-white shadow-sm"
                >
                    <option value="">Todas las asignaturas</option>
                    {subjectList.map(({id, name}) => (
                        <option key={id} value={id}>
                            {name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SubjectSelect;
