import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import SubjectSelect from "@/Pages/Doubts/Partials/SubjectSelect.jsx";
import ForumContent from "@/Pages/Doubts/Partials/ForumContent.jsx";

const Forum = ({subjectId, subjectList, doubts}) => {

    return (
        <AuthenticatedLayout>
            <Head title={"Foro de dudas resueltas"}/>
            {subjectList.length === 0 ?
                <p>Actualmente, usted no está matriculado en ninguna asignatura.</p> :
                <>
                    <SubjectSelect subjectId={subjectId}
                                   subjectList={subjectList}/>
                    <ForumContent doubts={doubts}/>
                </>}
        </AuthenticatedLayout>
    );
};

export default Forum;