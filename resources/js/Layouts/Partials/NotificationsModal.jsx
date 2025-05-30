import React from 'react';
import useNotificationsDialog from '../../Hooks/useNotificationsDialog';
import Notifications from './Notifications';

const NotificationsModal = ({data, onClose}) => {
    const dialogRef = useNotificationsDialog(data);

    const handleClose = () => {
        onClose();
    };

    return (
        <dialog ref={dialogRef} className="rounded-lg border border-gray-200 p-0 m-0 w-full max-w-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-medium text-indigo-700 m-0">Notificaciones</h2>
                    <button 
                        onClick={handleClose}
                        className="text-indigo-700 bg-white border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-md p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <Notifications notifications={data} />
                </div>
            </div>
        </dialog>
    );
};

export default NotificationsModal
