const ValidationNotification = ({notification}) => {
    const {updated_at, state, question, answer, comment} = notification;
    const formattedUpdatedAt = new Date(updated_at).toLocaleString();

    const {emoji, stateText, messageText, closingText} = {
        approved: {
            emoji: "✅",
            stateText: "aprobada",
            messageText: "¡Enhorabuena! El profesor ha validado tu pregunta y su respuesta. " +
                "Ahora forma parte del material de consulta y ayudará a otros compañeros.",
            closingText: "🎉 ¡Gracias por tu valiosa contribución al aprendizaje colectivo!"
        },
        rejected: {
            emoji: "❌",
            stateText: "revisada",
            messageText: "El profesor ha revisado esta duda y ha realizado algunas observaciones. " +
                "La respuesta que se muestra a continuación podría no ser del todo precisa o completa. " +
                "Te recomendamos leer con atención el comentario del profesor para entender mejor la aclaración.",
            closingText: "💡 ¡No te preocupes! Cada revisión es una oportunidad para aprender y mejorar. " +
                "Si algo no queda claro, vuelve a consultar."
        }
    }[state];

    return (
        <div>
            <div>
                <span>{emoji} Tu duda ha sido {stateText}</span> <span>{formattedUpdatedAt}</span>
            </div>
            <p>{messageText}</p>
            <p>
                <strong>Tu duda:</strong> "{question}"
            </p>
            <p>
                <strong>Respuesta (IA):</strong> "{answer}"
            </p>
            {comment &&
                <p>
                    <strong>Comentario del profesor:</strong> "{comment}"
                </p>}
            <p>{closingText}</p>
        </div>
    );
};

export default ValidationNotification