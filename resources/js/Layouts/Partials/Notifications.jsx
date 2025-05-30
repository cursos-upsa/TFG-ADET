import React from 'react';
import ValidationNotification from './ValidationNotification';
import ReactionNotification from './ReactionNotification';

export default function Notifications({ notifications }) {
    if (!notifications || notifications.length === 0) {
        return (
            <div>
                No tienes notificaciones
            </div>
        );
    }

    return (
        <div>
            {notifications.map((notification, i) => (
                <div key={i}>
                    <hr/>
                    {notification.type === 'validation' ? (
                        <ValidationNotification notification={notification} />
                    ) : (
                        <ReactionNotification notification={notification} />
                    )}
                </div>
            ))}
        </div>
    );
}