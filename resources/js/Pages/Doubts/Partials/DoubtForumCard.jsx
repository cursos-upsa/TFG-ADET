import ReactionButton from "@/Pages/Doubts/Partials/ReactionButton.jsx";

const DoubtForumCard = ({
                            doubtId,
                            subjectName,
                            reviewerName,
                            professorName,
                            state,
                            updatedAt,
                            question,
                            answer,
                            comment,
                            reactionCounts,
                            userReactions
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
            <form>
                <ReactionButton
                    reactionType="useful"
                    text="Útil"
                    doubtId={doubtId}
                    count={reactionCounts.useful}
                    hasReacted={userReactions.useful}/>
                <ReactionButton
                    reactionType="clear"
                    text="Queda claro"
                    doubtId={doubtId}
                    count={reactionCounts.clear}
                    hasReacted={userReactions.clear}/>
                <ReactionButton
                    reactionType="explain_in_class_please"
                    text="Explicar en clase"
                    doubtId={doubtId}
                    count={reactionCounts.explain_in_class_please}
                    hasReacted={userReactions.explain_in_class_please}/>
            </form>
        </li>
    );
};

export default DoubtForumCard;