import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

const Dashboard = ({auth}) => {
    return (
        <AuthenticatedLayout>
            <Head title="Panel de control"/>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-indigo-800">¡Hola, {auth.user.name}!</h1>
                <p className="text-gray-600 mt-2">Bienvenido a tu panel de control</p>
            </div>

            <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-indigo-700 mb-6 text-center">
                    ¿Qué quieres hacer?
                </h3>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Link href={route('subjects.index')} className="block p-6 text-center">
                            <div className="text-indigo-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Mis Asignaturas</h4>
                            <p className="text-gray-600">Accede a tus asignaturas y gestiona tus chats</p>
                        </Link>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Link href={route('forum.index')} className="block p-6 text-center">
                            <div className="text-indigo-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">Foro de Dudas</h4>
                            <p className="text-gray-600">Consulta y participa en el foro de dudas</p>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard
