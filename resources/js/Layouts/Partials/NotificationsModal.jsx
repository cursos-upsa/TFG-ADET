import React from 'react';
import useNotificationsDialog from '../../Hooks/useNotificationsDialog';
import Notifications from './Notifications';

const NotificationsModal = ({data, onClose}) => {
    const dialogRef = useNotificationsDialog(data);

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
                <Notifications notifications={data} />
            </div>
        </dialog>
    );
};

export default NotificationsModal