const MatriculationList = ({students, studentIds, onStudentsChange}) => {

    const handleCheckboxChange = (e) => {
        const value = parseInt(e.target.value);

        const newSelectedStudentIds = studentIds.includes(value) ?
            studentIds.filter(id => id !== value) :
            [...studentIds, value];

        onStudentsChange(newSelectedStudentIds);
    };

    return (
        <div>
            <h4>Escoja alumnos para matricular en la nueva asignatura:</h4>
            <ul>
                {students.map(({id, name}) => (
                    <li key={id}>
                        <label>
                            <input className={"bg-gray-200"}
                                type="checkbox"
                                name="studentIds"
                                value={id}
                                onChange={handleCheckboxChange}
                            />
                            {name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatriculationList;
