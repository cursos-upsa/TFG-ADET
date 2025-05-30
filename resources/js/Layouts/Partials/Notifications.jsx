import React from 'react';
import ValidationNotification from './ValidationNotification';
import ReactionNotification from './ReactionNotification';

const Notifications = ({notifications}) => {
    if (!notifications || notifications.length === 0) {
        return <p>No tienes notificaciones</p>;
    }

    return (
        <div>
            {notifications.map((notification, i) => (
                <div key={i}>
                    <hr/>
                    {notification.type === 'validation' ?
                        <ValidationNotification notification={notification}/> :
                        <ReactionNotification notification={notification}/>}
                </div>
            ))}
        </div>
    );
};

export default Notifications