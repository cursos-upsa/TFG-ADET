import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Chat = ({subjectId, subjectName, chatInfo = null}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Chat"/>
            <h3>Chat para {subjectName}, ID {subjectId}</h3>
            {JSON.stringify(chatInfo)}
        </AuthenticatedLayout>
    );
};

export default Chat;