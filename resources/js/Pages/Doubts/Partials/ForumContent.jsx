import DoubtForumCard from "@/Pages/Doubts/Partials/DoubtForumCard.jsx";

const ForumContent = ({doubts, reactionCounts, userReactions}) => {

    if (doubts.length === 0) {
        return <p>Aún no hay contenido en este foro.</p>
    }

    return (
        <ul>
            {doubts.map(({
                             id,
                             subject_name,
                             reviewer_name,
                             professor_name,
                             state,
                             updated_at_formatted,
                             question,
                             answer,
                             comment
                         }) => {
                const doubtReactionCounts = reactionCounts?.[id] || {
                    useful: 0,
                    clear: 0,
                    explain_in_class_please: 0
                };
                const doubtUserReactions = userReactions?.[id] || {
                    useful: false,
                    clear: false,
                    explain_in_class_please: false
                };

                return (
                    <DoubtForumCard key={id}
                                    doubtId={id}
                                    subjectName={subject_name}
                                    reviewerName={reviewer_name}
                                    professorName={professor_name}
                                    state={state}
                                    updatedAt={updated_at_formatted}
                                    question={question}
                                    answer={answer}
                                    comment={comment}
                                    reactionCounts={doubtReactionCounts}
                                    userReactions={doubtUserReactions}/>
                );
            })}
        </ul>
    );
};

export default ForumContent;