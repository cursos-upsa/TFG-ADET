const DoubtForumCard = ({
                            doubtId,
                            subjectName,
                            reviewerName,
                            professorName,
                            state,
                            updatedAt,
                            question,
                            answer,
                            comment
                        }) => {
    const stateText = {
        approved: 'validado',
        rejected: 'rechazado',
    } [state];
    const titleText = professorName ?
        `El profesor ${professorName} ha compartido esta duda, como contenido ${stateText}:` :
        `El profesor ${reviewerName} ha ${stateText} la respuesta a esta duda de un alumno:`

    return (
        <li>
            <b>{subjectName}</b>
            <p>{titleText}</p>
            <blockquote>
                <small>{updatedAt}</small>
                <p>
                    <i>{question}</i>
                </p>
                <p>{answer}</p>
            </blockquote>
            {comment &&
                <blockquote>
                    <p>{comment}</p>
                    <cite>- {reviewerName}</cite>
                </blockquote>}
            <hr/>
            {/* TODO: add the reaction buttons. */}
        </li>
    );
};

export default DoubtForumCard;