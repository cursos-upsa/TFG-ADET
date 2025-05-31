import {Link, router} from "@inertiajs/react";

const Chats = ({chats, subjectId}) => {

    const deleteChat= (e, chatId) => {
        e.stopPropagation();  // Avoid triggering the parent's <li> click event.

        router.delete(route('chats.destroy', {chatId}), {
            onBefore: () => confirm('¿Estás seguro de que quieres eliminar este chat?')
        })
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-indigo-700 m-0">Chats</h3>
                <Link href={route('chats.create', {subjectId})}>
                    <button className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear nuevo chat
                    </button>
                </Link>
            </div>

            {!chats || chats.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                    <p className="text-gray-500">Aún no tiene ningún chat en esta asignatura.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                    {chats.map((chat) => (
                        <li key={chat.id} className="bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center p-4">
                                <Link
                                    href={route('chats.show', {chatId: chat.id})}
                                    className="text-indigo-600 font-medium"
                                >
                                    Chat. {chat.last_activity_formatted}
                                </Link>
                                <button
                                    onClick={(e) => {
                                        deleteChat(e, chat.id);
                                    }}
                                    className="text-red-500 bg-white border border-red-300 rounded-md px-3 py-1 text-sm"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Chats;