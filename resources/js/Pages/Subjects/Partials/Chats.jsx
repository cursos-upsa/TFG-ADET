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
            <h3>Chats</h3>
            <Link href={route('chats.create', {subjectId})}>
                <button>Crear nuevo chat</button>
            </Link>
            {!chats || chats.length === 0 ?
                <p>Aún no tiene ningún chat en esta asignatura.</p> :
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id}>
                            <Link href={route('chats.show', {chatId: chat.id})}>
                                Chat. {chat.last_activity_formatted}
                            </Link>
                            <button onClick={(e) => {
                                deleteChat(e, chat.id);
                            }}>Eliminar
                            </button>
                        </li>
                    ))}
                </ul>}
        </div>
    );
};

export default Chats;