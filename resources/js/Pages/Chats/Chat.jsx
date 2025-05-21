import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Chat = ({subjectId, chatInfo}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Chat"/>
            {subjectId}
            {JSON.stringify(chatInfo)}
        </AuthenticatedLayout>
    );
};

export default Chat;