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
            <h1>Plataforma de apoyo al estudio con inteligencia artificial</h1>
            <p>
                Esta aplicación web es el resultado práctico del Trabajo Fin de
                Grado <small>Desarrollo de un sistema inteligente de apoyo al
                proceso pedagógico</small>. Su propósito es explorar el uso de la
                inteligencia artificial generativa como una herramienta de
                asistencia en el ámbito educativo, facilitando la resolución
                de dudas y la comunicación entre alumnos y profesores.
            </p>
        </main>
        <footer>
            Enrique Redondo Cortés, 2025
        </footer>
    </GuestLayout>
);

export default Welcome