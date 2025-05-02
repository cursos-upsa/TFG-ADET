import {Link, usePage} from '@inertiajs/react';

export default function AuthenticatedLayout({children}) {
    const user = usePage().props.auth.user;

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
                </ul>
                <div>
                    <Link href={route('profile.edit')}>{user.name}</Link>
                    <Link href={route('logout')} method="post" as="button">Cerrar sesión</Link>
                </div>
            </nav>
            {children}
        </div>
    );
}
