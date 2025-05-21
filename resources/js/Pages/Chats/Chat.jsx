import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import Loader from "@/Components/Loader.jsx";

const Chat = ({subjectName, threadId, messages, newChat = false}) => {
    const {data, setData, post, processing} = useForm({
        threadId: threadId,
        message: '',
    })

    function submit(e) {
        e.preventDefault()
        post(route('chats.store'))
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
                        {JSON.stringify(messages)}
                    </Deferred>
                </>
            )}
            <hr/>
            <form onSubmit={submit}>
                <label>
                    <textarea name={"message"}
                              placeholder={"Escribe aquí tu mensaje..."}
                              value={data.message}
                              onChange={(e) => setData('message', e.target.value)}/>
                </label>
                <button type={"submit"} disabled={processing}>
                    Enviar
                </button>
            </form>
        </AuthenticatedLayout>
    );
};

export default Chat;
