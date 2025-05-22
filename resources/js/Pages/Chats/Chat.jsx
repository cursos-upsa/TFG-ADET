// noinspection JSCheckFunctionSignatures

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import Loader from "@/Components/Loader.jsx";
import {useEffect} from "react";

const Chat = ({subjectId, subjectName, threadId, messages = [], newChat = false}) => {
    const {data, setData, post, processing} = useForm({
        subjectId: subjectId,
        threadId: threadId,
        messages,
        newUserMessage: '',
    })

    useEffect(() => {
        if (messages.length > 0) {
            setData('messages', messages);
        }
    }, [messages]);

    function submit(e) {
        e.preventDefault()
        post(route('chats.store'))
        setData('newUserMessage', '');
    }


    return (
        <AuthenticatedLayout>
            <Head title="Chat"/>
            {newChat && (
                <h3>Nuevo chat para la asignatura <i>{subjectName}</i>.</h3>
            )}
            {!newChat && (
                <>
                    <h3>Chat para la asignatura <i>{subjectName}</i>.</h3>
                    <Deferred fallback={<Loader>Cargando conversación...</Loader>} data={"messages"}>
                        {messages.map((message, index) => {
                                if (index % 2 === 0) {
                                    return <p key={index}><b>{message}</b></p>;
                                }
                                return <p key={index}>{message}</p>;
                            }
                        )}
                    </Deferred>
                </>
            )}
            <hr/>
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
            </form>
        </AuthenticatedLayout>
    );
};

export default Chat;
