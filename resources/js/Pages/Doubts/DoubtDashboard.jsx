import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import DoubtForm from "@/Pages/Doubts/Partials/DoubtForm.jsx";

const DoubtDashboard = ({subjectName, doubts}) => {

    return (
        <AuthenticatedLayout>
            <Head title={"Dudas pendientes"}/>
            <h1>{subjectName}</h1>
            <h2>Dudas pendientes</h2>
            <ul>
                {doubts.map(({id, state, created_at, question, answer}) =>
                    <DoubtForm key={id}
                               doubtId={id}
                               state={state}
                               createdAt={created_at}
                               question={question}
                               answer={answer}/>
                )}
            </ul>
        </AuthenticatedLayout>
    );
};

export default DoubtDashboard;