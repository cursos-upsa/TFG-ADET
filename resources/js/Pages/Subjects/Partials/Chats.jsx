import {Link} from "@inertiajs/react";

const Chats = ({chats, subjectId}) => {

    return (
        <div>
            <h3>Chats</h3>
            <Link href={route('chats.create', {subjectId})}>
                <button>Crear nuevo chat</button>
            </Link>
            {chats.length === 0 ?
                <p>Aún no tiene ningún chat en esta asignatura.</p> :
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id}>
                            <Link href={route('chats.show', {chatId: chat.id})}>
                                Chat {chat.id}
                            </Link>
                        </li>
                    ))}
                </ul>}
        </div>
    );
};

export default Chats;