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

    // Define state-based styling
    const stateColors = {
        approved: 'border-green-500 bg-green-50',
        rejected: 'border-red-500 bg-red-50',
    };

    const cardColorClass = stateColors[state] || 'border-gray-300 bg-white';

    return (
        <li className="mb-6">
            <div className={`rounded-lg shadow-md overflow-hidden border-l-4 ${cardColorClass} transition-all duration-300 hover:shadow-lg`}>
                {/* Card Header */}
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-indigo-700">{subjectName}</h3>
                        <span className="text-sm text-gray-500">{updatedAt}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{titleText}</p>
                </div>

                {/* Card Body */}
                <div className="px-6 py-4">
                    <blockquote className="mb-4">
                        <p className="italic text-gray-600 mb-2">
                            {question}
                        </p>
                        <p className="text-gray-800 font-medium">{answer}</p>
                    </blockquote>

                    {comment && (
                        <blockquote className="bg-gray-50 p-4 rounded-md border-l-4 border-indigo-300 mb-4">
                            <p className="text-gray-700">{comment}</p>
                            <cite className="text-sm text-gray-600 block mt-2">- {reviewerName}</cite>
                        </blockquote>
                    )}
                </div>

                {/* Card Footer - Reactions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <form className="flex flex-wrap justify-center">
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
                </div>
            </div>
        </li>
    );
};

export default DoubtForumCard;
