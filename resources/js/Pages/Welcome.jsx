import {Head, Link} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

const Welcome = ({auth}) => (
    <GuestLayout>
        <Head title="Bienvenido"/>
        <header className="mb-8">
            <nav className="flex justify-end">
                <ul className="flex space-x-6">
                    {auth.user ?
                        <li>
                            <Link 
                                href={route('dashboard')}
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                            >
                                Panel de control
                            </Link>
                        </li>
                        :
                        <>
                            <li>
                                <Link 
                                    href={route('login')}
                                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={route('register')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
                                >
                                    Registrarse
                                </Link>
                            </li>
                        </>}
                </ul>
            </nav>
        </header>
        <main className="space-y-8">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-indigo-800">Plataforma de apoyo al estudio con inteligencia artificial</h1>
                <p className="text-gray-700 leading-relaxed">
                    Esta aplicación web es el resultado práctico del Trabajo Fin de
                    Grado <small className="text-gray-500">Desarrollo de un sistema inteligente de apoyo al
                    proceso pedagógico</small>. Su propósito es explorar el uso de la
                    inteligencia artificial generativa como una herramienta de
                    asistencia en el ámbito educativo, facilitando la resolución
                    de dudas y la comunicación entre alumnos y profesores.
                </p>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
                <h2 className="text-xl font-semibold text-indigo-700 mb-3">¿Cómo funciona?</h2>
                <p className="text-gray-700 mb-4">
                    Esta plataforma utiliza modelos avanzados de inteligencia artificial para proporcionar 
                    respuestas precisas a tus dudas académicas, facilitando el proceso de aprendizaje.
                </p>
                <div className="flex justify-center mt-6">
                    {!auth.user && (
                        <Link 
                            href={route('register')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-sm transition-colors duration-200 font-medium"
                        >
                            Comenzar ahora
                        </Link>
                    )}
                </div>
            </div>
        </main>
    </GuestLayout>
);

export default Welcome
