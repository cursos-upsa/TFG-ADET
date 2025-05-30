import React from 'react';
import ValidationNotification from './ValidationNotification';
import ReactionNotification from './ReactionNotification';

const Notifications = ({notifications}) => {
    if (!notifications || notifications.length === 0) {
        return <p className="text-gray-500 text-center py-4">No tienes notificaciones</p>;
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification, i) => (
                <div key={i} className="pt-4 first:pt-0">
                    {i > 0 && <hr className="mb-4 border-gray-200" />}
                    <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                        {notification.type === 'validation' ?
                            <ValidationNotification notification={notification}/> :
                            <ReactionNotification notification={notification}/>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Notifications
