import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import DoubtForm from "@/Pages/Doubts/Partials/DoubtForm.jsx";
import ErrorList from "@/Components/ErrorList.jsx";

const DoubtDashboard = ({subjectId, subjectName, doubts}) => {
    const {data, setData, post, processing, errors} = useForm({
        doubts: doubts.map(({id, state, comment}) => ({
            id,
            state,
            comment
        }))
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('doubts.store', {subjectId}))
    }

    return (
        <AuthenticatedLayout>
            <Head title={"Dudas pendientes"}/>
            <h1>{subjectName}</h1>
            <h2>Dudas pendientes</h2>
            <form onSubmit={submit}>
                <button type={"submit"} disabled={processing}>
                    Guardar
                </button>
                <output>
                    <ErrorList formErrors={errors}/>
                </output>
                <ol>
                    {doubts.map(({id, created_at, question, answer}) =>
                        <DoubtForm key={id}
                                   doubtId={id}
                                   data={data}
                                   setData={setData}
                                   createdAt={created_at}
                                   question={question}
                                   answer={answer}/>
                    )}
                </ol>
            </form>
        </AuthenticatedLayout>
    );
};

export default DoubtDashboard;