import {Head, Link} from '@inertiajs/react';

export default function Welcome({auth, canLogin, canRegister}) {
    return (
        <>
            <Head title="Bienvenido"/>
            <header>
                <nav>
                    <ul>
                        {auth.user ?
                            <li>
                                <Link href={route('dashboard')}>
                                    Panel de control
                                </Link>
                            </li>
                            :
                            <>
                                <li>
                                    <Link href={route('login')}>
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('register')}>
                                        Registrarse
                                    </Link>
                                </li>
                            </>}
                    </ul>
                </nav>
            </header>
            <main>
                ¡Bienvenido!
            </main>
            <footer>
                Breeze sin Tailwind CSS
            </footer>
        </>
    );
}
