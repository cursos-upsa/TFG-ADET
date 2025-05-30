import {Link, usePage, router} from '@inertiajs/react';
import NotificationsModal from './Partials/NotificationsModal';

export default function AuthenticatedLayout({children}) {
    const {auth, notificationsData} = usePage().props;
    const user = auth.user;
    const userRole = {
        student: 'Estudiante',
        professor: 'Profesor'
    }[user.role];

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
                    <button
                        onClick={() => {
                            const url = new URL(window.location.href);
                            url.searchParams.set('showNotifications', 'true');
                            router.get(url.pathname + url.search, {}, {
                                preserveState: true,
                                preserveScroll: true
                            });
                        }}
                        aria-label="Notificaciones"
                    >
                        🔔
                    </button>
                    <Link href={route('profile.edit')}>{user.name} - {userRole}</Link>
                    <Link href={route('logout')} method="post" as="button">Cerrar sesión</Link>
                </div>
            </nav>
            <main>
                {children}
            </main>

            <NotificationsModal
                data={notificationsData}
                onClose={onDialogClose}/>
        </div>
    );
}
