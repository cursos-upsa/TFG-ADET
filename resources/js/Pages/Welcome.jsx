import {Head, Link} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

const Welcome = ({auth}) => (
    <GuestLayout>
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
            Enrique Redondo Cortés, 2025
        </footer>
    </GuestLayout>
);

export default Welcome