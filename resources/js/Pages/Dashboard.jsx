import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

export default function Dashboard({auth}) {
    return (
        <AuthenticatedLayout>
            <Head title="Panel de control"/>
            <h2>Panel de control</h2>
            <h3>¡Hola, {auth.user.name}!</h3>
        </AuthenticatedLayout>
    );
}
