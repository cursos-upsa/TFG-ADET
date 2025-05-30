import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

const Dashboard = ({auth}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Panel de control"/>
            <h1>¡Hola, {auth.user.name}!</h1>

            <h3>
                ¿Qué quieres hacer?
            </h3>
            <ul>
                <li>
                    <Link href={route('subjects.index')}>
                        Ir a mis asignaturas
                    </Link>
                </li>
                <li>
                    <Link href={route('forum.index')}>
                        Ir al foro de dudas
                    </Link>
                </li>
            </ul>

        </AuthenticatedLayout>
    );
};

export default Dashboard