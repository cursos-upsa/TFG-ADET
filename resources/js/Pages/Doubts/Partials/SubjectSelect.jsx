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
            only: ['subjectId', 'doubts']
        });
    }

    return (
        <label>
            <select name="visibleSubject"
                    defaultValue={subjectId || ""}
                    onChange={handleChange}>
                <option value="">Todas las asignaturas</option>
                {subjectList.map(({id, name}) => (
                    <option key={id} value={id}>
                        {name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SubjectSelect;
