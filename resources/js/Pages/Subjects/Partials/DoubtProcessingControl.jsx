import {router} from "@inertiajs/react";
import {useState} from "react";

const DoubtProcessingControl = ({unprocessedChatsNumber, subjectId}) => {
    const [processing, setProcessing] = useState(false)

    const processAllChats = () => {
        router.get(route('chats.process', {subjectId}),
            {},
            {
                onBefore: () => confirm('¿Desea procesar todos los chats de esta asignatura ahora?'),
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            })
    }

    if (unprocessedChatsNumber === 0) {
        return (
            <div>
                <p>Todos los chats de esta asignatura han sido procesados.</p>
            </div>
        );
    }
    const numberText = unprocessedChatsNumber === 1 ? 'un' : unprocessedChatsNumber;
    const chatText = unprocessedChatsNumber === 1 ? 'chat nuevo' : 'chats nuevos';

    return (
        <div>
            <p>Hay {numberText} {chatText} sin procesar.</p>
            <button onClick={processAllChats} disabled={processing}>
                {processing ?
                    'Procesando...' :
                    'Procesar todos los chats'}
            </button>
        </div>
    );
};

export default DoubtProcessingControl;