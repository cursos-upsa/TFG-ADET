import {Link} from "@inertiajs/react";

const MatriculationList = ({students}) => {
    return (
        <div>
            <h4>Escoja alumnos para matricular en la nueva asignatura:</h4>
            <ul>
                {students.map(({id, name}) => (
                    <li>
                        {name}
                        <Link>
                            Matricular
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default MatriculationList;