import {Link, usePage, router} from '@inertiajs/react';
import NotificationsModal from './Partials/NotificationsModal';

const AuthenticatedLayout = ({children}) => {
    const {auth, notificationsData} = usePage().props;
    const user = auth.user;
    const userRole = {
        student: 'Estudiante',
        professor: 'Profesor'
    }[user.role];

    const onDialogOpen = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('showNotifications', 'true');

        router.get(url.pathname + url.search, {}, {
            preserveState: true,
            preserveScroll: true
        });
    }

    const onDialogClose = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('showNotifications');

        router.get(url.pathname + url.search, {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                    <li>
                        <Link href={route('dashboard')}>Panel de control</Link>
                    </li>
                    <li>
                        <Link href={route('subjects.index')}>Asignaturas</Link>
                    </li>
                    <li>
                        <Link href={route('forum.index')}>Foro</Link>
                    </li>
                </ul>
                <div>
                    <button onClick={onDialogOpen}
                            aria-label="Notificaciones">
                        🔔
                    </button>
                    <NotificationsModal
                        data={notificationsData}
                        onClose={onDialogClose}/>

                    <Link href={route('profile.edit')}>{user.name} - {userRole}</Link>
                    <Link href={route('logout')} method="post" as="button">Cerrar sesión</Link>
                </div>
            </nav>

            <main>
                {children}
            </main>

            <footer>
                Enrique Redondo Cortés, 2025
            </footer>
        </div>
    );
};

export default AuthenticatedLayout