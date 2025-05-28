import {Link, usePage} from '@inertiajs/react';

export default function AuthenticatedLayout({children}) {
    const user = usePage().props.auth.user;
    const userRole = {
        student: 'Estudiante',
        professor: 'Profesor'
    }[user.role];

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
                    <Link href={route('profile.edit')}>{user.name} - {userRole}</Link>
                    <Link href={route('logout')} method="post" as="button">Cerrar sesión</Link>
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
