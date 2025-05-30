import React from 'react';

const ReactionNotification = ({ notification }) => {
    const {updated_at, reaction_type, doubt_question} = notification;
    const formattedUpdatedAt = new Date(updated_at).toLocaleString();

    return (
        <div>
            <div>
                <span>📣 ¡Alguien ha reaccionado a tu duda! </span>
                <span>{formattedUpdatedAt}</span>
            </div>
            <p>
                Alguien ha marcado tu duda como <strong>{reaction_type}</strong>
            </p>
            <p><strong>Tu pregunta:</strong> "{doubt_question}"</p>
            <p>✨ Gracias por contribuir con tus dudas a la comunidad.</p>
        </div>
    );
};

export default ReactionNotification