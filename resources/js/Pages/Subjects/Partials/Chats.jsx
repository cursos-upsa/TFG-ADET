import {Link} from "@inertiajs/react";

const Chats = ({chats}) => {
    console.log(chats);

    return (
        <div>
            <h3>Chats</h3>
            <button>Crear nuevo chat</button>
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