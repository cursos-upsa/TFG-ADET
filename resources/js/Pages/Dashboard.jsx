import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';

const Dashboard = ({auth}) => (
    <AuthenticatedLayout>
        <Head title="Panel de control"/>
        <h2>Panel de control</h2>
        <h3>¡Hola, {auth.user.name}!</h3>
    </AuthenticatedLayout>
);

export default Dashboard