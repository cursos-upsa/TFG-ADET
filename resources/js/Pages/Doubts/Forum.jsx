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

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {subjectList.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-lg text-gray-600">
                            Actualmente, usted no está matriculado en ninguna asignatura.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-indigo-800 mb-2">
                                Foro de dudas resueltas
                            </h1>
                            <h2 className="text-xl text-indigo-600 mb-6">
                                {subjectTitle}
                            </h2>

                            <div className="max-w-md mx-auto mb-8">
                                <SubjectSelect
                                    subjectId={subjectId}
                                    subjectList={subjectList}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <ForumContent
                                doubts={doubts}
                                reactionCounts={reactionCounts}
                                userReactions={userReactions}
                            />
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default Forum;
