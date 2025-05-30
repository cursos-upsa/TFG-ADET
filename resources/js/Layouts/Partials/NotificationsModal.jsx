import {useEffect, useRef} from 'react';

export default function NotificationsModal({data, onClose}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (data && dialogRef.current) {
            dialogRef.current.showModal();
            return;
        }
        dialogRef.current?.close();
    }, [data]);

    const handleClose = () => {
        onClose();
    };

    return (
        <dialog ref={dialogRef}>
            <div>
                <div>
                    <h2>Notificaciones</h2>
                    <button onClick={handleClose}>Cerrar</button>
                </div>

                {data && data.length > 0 ? (
                    <div>
                        {data.map((notification, i) => (
                            <div key={i}>
                                <hr/>

                                {notification.type === 'validation' ? (
                                    <div>
                                        <div>
                                            <span>{notification.state === 'approved' ? 'Aprobada' : 'Rechazada'} </span>
                                            <span>
                                                {new Date(notification.updated_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p>{notification.question}</p>
                                        <p>{notification.answer}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <span>Nueva reacción </span>
                                            <span>
                                                {new Date(notification.updated_at).toLocaleString()}
                                            </span>
                                        </div>
                                        <p>
                                            <span>{notification.reaction_type}</span> en tu duda:
                                        </p>
                                        <p>{notification.doubt_question}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        No tienes notificaciones
                    </div>
                )}
            </div>
        </dialog>
    );
}
