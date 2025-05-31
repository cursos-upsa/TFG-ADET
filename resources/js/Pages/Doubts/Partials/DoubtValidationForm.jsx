const DoubtValidationForm = ({doubtId, data, setData, createdAt, question, answer,}) => {
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

    // Define state-based styling
    const stateColors = {
        pending: 'border-yellow-500',
        approved: 'border-green-500',
        approvedToMemory: 'border-blue-500',
        rejected: 'border-red-500',
        discarded: 'border-gray-500',
    };

    const borderColorClass = stateColors[state] || 'border-gray-300';

    return (
        <li className="mb-8 bg-white rounded-lg shadow-md overflow-hidden border-l-4 transition-all duration-300 hover:shadow-lg p-0 list-none">
            <div className={`${borderColorClass}`}>
                {/* Question and Answer Section */}
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{question}</h3>
                        <small className="text-gray-500 block">({new Date(createdAt).toLocaleString()})</small>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <p className="font-medium text-gray-700 mb-1">Respuesta:</p>
                        <p className="text-gray-800">{answer}</p>
                    </div>
                </div>

                {/* Validation Controls Section */}
                <div className="bg-gray-100 p-6 border-t border-gray-200">
                    <div className="flex flex-wrap justify-center gap-3 mb-4">
                        <label
                            className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name={`doubts-${doubtId}`}
                                value="pending"
                                checked={state === 'pending'}
                                onChange={handleStateChange}
                                className="mr-2 w-4 h-4 text-yellow-600 bg-gray-200 border-gray-300 focus:ring-yellow-500"
                            />
                            <span className="text-yellow-600">Pendiente</span>
                        </label>
                        <label
                            className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name={`doubts-${doubtId}`}
                                value="approved"
                                checked={state === 'approved'}
                                onChange={handleStateChange}
                                className="mr-2 w-4 h-4 text-green-600 bg-gray-200 border-gray-300 focus:ring-green-500"
                            />
                            <span className="text-green-600">Aceptar</span>
                        </label>
                        <label
                            className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name={`doubts-${doubtId}`}
                                value="approvedToMemory"
                                checked={state === 'approvedToMemory'}
                                onChange={handleStateChange}
                                className="mr-2 w-4 h-4 text-blue-600 bg-gray-200 border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-blue-600">Aceptar e incluir en la memoria</span>
                        </label>
                        <label
                            className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name={`doubts-${doubtId}`}
                                value="rejected"
                                checked={state === 'rejected'}
                                onChange={handleStateChange}
                                className="mr-2 w-4 h-4 text-red-600 bg-gray-200 border-gray-300 focus:ring-red-500"
                            />
                            <span className="text-red-600">Rechazar</span>
                        </label>
                        <label
                            className="inline-flex items-center px-3 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name={`doubts-${doubtId}`}
                                value="discarded"
                                checked={state === 'discarded'}
                                onChange={handleStateChange}
                                className="mr-2 w-4 h-4 text-gray-600 bg-gray-200 border-gray-300 focus:ring-gray-500"
                            />
                            <span className="text-gray-600">Descartar</span>
                        </label>
                    </div>

                    {placeholderTextArea && (
                        <div className="flex mt-4">
            <textarea
                name={`doubts-${doubtId}-comment`}
                placeholder={placeholderTextArea}
                value={comment}
                onChange={handleCommentChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
            />
                        </div>
                    )}
                </div>
            </div>
        </li>
    );
};

export default DoubtValidationForm;
