const DoubtForm = ({doubtId, state, createdAt, question, answer,}) => {

    return (
        <li>
            <u>ID: {doubtId}</u>
            <ul>
                <li>Estado: {state}</li>
                <li>Fecha: {createdAt}</li>
                <li>Pregunta: {question}</li>
                <li>Respuesta: {answer}</li>
            </ul>
        </li>
    );
};

export default DoubtForm;