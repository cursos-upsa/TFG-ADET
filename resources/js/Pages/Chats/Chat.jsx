// noinspection JSCheckFunctionSignatures

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import Loader from "@/Components/Loader.jsx";
import ErrorList from "@/Components/ErrorList.jsx";

const Chat = ({subjectId, subjectName, threadId, messages}) => {
    const {data, setData, post, processing, errors} = useForm({
        subjectId: subjectId,
        threadId: threadId,
        newUserMessage: '',
    })

    function submit(e) {
        e.preventDefault()
        post(
            route('chats.store'),
            {
                // Avoid changind the URL to /chats/store, so reloading the page doesn't fail.
                preserveUrl: true,
                preserveScroll: true,
                onSuccess: () => {
                    setData('newUserMessage', '');
                },
                // Tell Inertia to only update the messages array.
                only: ['messages']
            })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Chat"/>

            <h3>Chat para la asignatura <i>{subjectName}</i>.</h3>
            <Deferred fallback={<Loader>Cargando conversación...</Loader>} data={"messages"}>
                {messages?.map((message, index) => {
                        if (index % 2 === 0) {
                            return <p key={index}><b>{message}</b></p>;
                        }
                        return <p key={index}>{message}</p>;
                    }
                )}
                {processing && data.newUserMessage ?
                    (
                        <>
                            <p key={messages.length}><b>{data.newUserMessage}</b></p>
                            <Loader>Generando respuesta...</Loader>
                        </>
                    ) : null}
            </Deferred>

            <form onSubmit={submit}>
                <label>
                    <textarea name={"newUserMessage"}
                              placeholder={"Escribe aquí tu mensaje..."}
                              value={data.newUserMessage}
                              onChange={(e) => setData('newUserMessage', e.target.value)}/>
                </label>
                <button type={"submit"} disabled={processing}>
                    Enviar
                </button>
                <output>
                    <ErrorList formErrors={errors}/>
                </output>
            </form>
        </AuthenticatedLayout>
    );
};

export default Chat;
