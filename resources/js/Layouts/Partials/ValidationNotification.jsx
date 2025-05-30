import React from 'react';

export default function ValidationNotification({ notification }) {
    return (
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
    );
}