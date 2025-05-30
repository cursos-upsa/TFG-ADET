import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import SubjectSelect from "@/Pages/Doubts/Partials/SubjectSelect.jsx";
import ForumContent from "@/Pages/Doubts/Partials/ForumContent.jsx";

const Forum = ({subjectId, subjectList, doubts, reactionCounts, userReactions}) => {
    const subjectName = subjectList.find(subject => subject.id === parseInt(subjectId))?.name;
    const subjectTitle = subjectName ?
        `Asignatura "${subjectName}"` :
        "Todas las asignaturas";

    return (
        <AuthenticatedLayout>
            <Head title={"Foro de dudas resueltas"}/>
            {subjectList.length === 0 ?
                <p>Actualmente, usted no está matriculado en ninguna asignatura.</p> :
                <>
                    <h1>Foro de dudas resueltas</h1>
                    <h2>{subjectTitle}</h2>
                    <SubjectSelect subjectId={subjectId}
                                   subjectList={subjectList}/>
                    <ForumContent doubts={doubts}
                                  reactionCounts={reactionCounts}
                                  userReactions={userReactions}
                    />
                </>}
        </AuthenticatedLayout>
    );
};

export default Forum;
