import React from 'react';

export default function ReactionNotification({ notification }) {
    return (
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
    );
}