import DoubtForumCard from "@/Pages/Doubts/Partials/DoubtForumCard.jsx";

const ForumContent = ({doubts}) => {

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
                         }) =>
                <DoubtForumCard key={id}
                                doubtId={id}
                                subjectName={subject_name}
                                reviewerName={reviewer_name}
                                professorName={professor_name}
                                state={state}
                                updatedAt={updated_at_formatted}
                                question={question}
                                answer={answer}
                                comment={comment}/>)}
        </ul>
    );
};

export default ForumContent;