import DoubtForumCard from "@/Pages/Doubts/Partials/DoubtForumCard.jsx";

const ForumContent = ({doubts, reactionCounts, userReactions}) => {

    if (doubts.length === 0) {
        return (
            <div className="bg-gray-50 rounded-lg p-8 text-center shadow-sm">
                <p className="text-gray-600 text-lg">Aún no hay contenido en este foro.</p>
            </div>
        );
    }

    return (
        <div className="py-4">
            <ul className="space-y-6 list-none p-0">
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
        </div>
    );
};

export default ForumContent;
