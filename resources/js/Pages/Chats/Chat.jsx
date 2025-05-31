// file: resources/js/Pages/Chats/Chat.jsx
// noinspection JSCheckFunctionSignatures

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Deferred, Head, useForm} from "@inertiajs/react";
import Loader from "@/Components/Loader.jsx";
import ErrorList from "@/Components/ErrorList.jsx";
import usePopStateReload from "@/Hooks/usePopStateReload.js";

const Chat = ({subjectId, subjectName, threadId, messages}) => {
    usePopStateReload();
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
                preserveUrl: true,
                preserveScroll: true,
                onSuccess: () => {
                    setData('newUserMessage', '');
                },
                only: ['messages']
            })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Chat"/>

            <div className="h-[81vh] grid grid-rows-[auto_1fr_auto]">
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-indigo-700">
                        Chat para la asignatura <i className="font-medium text-indigo-600">{subjectName}</i>
                    </h3>
                </div>

                <div className="bg-gray-100 rounded-lg border border-gray-200 p-4 mb-6 flex-1 overflow-y-auto min-h-0">
                    <Deferred fallback={<div className="flex justify-center items-center h-full"><Loader>Cargando
                        conversación...</Loader></div>} data={"messages"}>
                        <div className="space-y-4">

                            {messages?.map((message, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <div key={index} className="flex justify-end">
                                                <div
                                                    className="bg-indigo-100 text-indigo-800 p-3 rounded-lg max-w-3/4 border border-indigo-200">
                                                    <p className="m-0 font-medium">{message}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div key={index} className="flex justify-start">
                                            <div className="bg-white p-3 rounded-lg max-w-3/4 border border-gray-200">
                                                <p className="m-0">{message}</p>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                            {processing && data.newUserMessage ? (
                                <>
                                    <div className="flex justify-end">
                                        <div
                                            className="bg-indigo-100 text-indigo-800 p-3 rounded-lg max-w-3/4 border border-indigo-200">
                                            <p className="m-0 font-medium">{data.newUserMessage}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center py-4">
                                        <Loader>Generando respuesta...</Loader>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </Deferred>
                </div>

                <form onSubmit={submit} className="flex-shrink-0">
                    <div className="flex gap-3">
                        <input
                            name="newUserMessage"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 min-w-0"
                            disabled={processing}
                            placeholder="Escribe aquí tu duda..."
                            value={data.newUserMessage}
                            onChange={(e) => setData('newUserMessage', e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 flex-shrink-0"
                        >
                            Enviar
                        </button>
                    </div>
                    <output className="mt-2 block">
                        <ErrorList formErrors={errors}/>
                    </output>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Chat;
