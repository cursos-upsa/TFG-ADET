const DoubtForm = ({doubtId, data, setData, createdAt, question, answer,}) => {
    const doubtData = data.doubts.find(item => item.id === doubtId);
    const {state, comment} = doubtData;

    const handleStateChange = (e) => {
        const newState = e.target.value;
        setData(prevData => ({
            ...prevData,
            doubts: prevData.doubts.map(item =>
                item.id === doubtId
                    ? {...item, state: newState}
                    : item
            )
        }));
    }

    const handleCommentChange = (e) => {
        const newComment = e.target.value;
        setData(prevData => ({
            ...prevData,
            doubts: prevData.doubts.map(item =>
                item.id === doubtId
                    ? {...item, comment: newComment}
                    : item
            )
        }));
    }

    const placeholderTextArea = {
        approved: 'Añada un comentario que complemente la respuesta...',
        approvedToMemory: 'Añada un comentario que complemente la respuesta y que se añadirá a la memoria del asistente...',
        rejected: 'Explique por qué se rechaza la respuesta...',
    }[state] || null;

    return (
        <li>
            <p>
                <b>{question}</b>
                <br/>
                <small>({new Date(createdAt).toLocaleString()})</small>
            </p>
            <p>
                <b>Respuesta: </b>
                {answer}
            </p>
            <div>
                <label>
                    <input type="radio" name={`doubts-${doubtId}`} value="pending"
                           checked={state === 'pending'} onChange={handleStateChange}/>
                    Pendiente
                </label>
                <label>
                    <input type="radio" name={`doubts-${doubtId}`} value="approved"
                           checked={state === 'approved'} onChange={handleStateChange}/>
                    Aceptar
                </label>
                <label>
                    <input type="radio" name={`doubts-${doubtId}`} value="approvedToMemory"
                           checked={state === 'approvedToMemory'} onChange={handleStateChange}/>
                    Aceptar e incluir en la memoria
                </label>
                <label>
                    <input type="radio" name={`doubts-${doubtId}`} value="rejected"
                           checked={state === 'rejected'} onChange={handleStateChange}/>
                    Rechazar
                </label>
                <label>
                    <input type="radio" name={`doubts-${doubtId}`} value="discarded"
                           checked={state === 'discarded'} onChange={handleStateChange}/>
                    Descartar
                </label>
            </div>
            {placeholderTextArea &&
                <textarea name={`doubts-${doubtId}-comment`} placeholder={placeholderTextArea}
                          value={comment} onChange={handleCommentChange}/>}
        </li>
    );
};

export default DoubtForm;