import {Link, usePage, router} from '@inertiajs/react';
import NotificationsModal from './Partials/NotificationsModal';

const AuthenticatedLayout = ({children}) => {
    const {auth, notificationsData} = usePage().props;
    const user = auth.user;

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
        <div className="min-h-screen flex flex-col bg-gray-100">
            <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <ul className="flex space-x-8">
                                <li className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                    <Link href="/">Inicio</Link>
                                </li>
                                <li className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                    <Link href={route('dashboard')}>Panel de control</Link>
                                </li>
                                <li className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                    <Link href={route('subjects.index')}>Asignaturas</Link>
                                </li>
                                <li className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                    <Link href={route('forum.index')}>Foro</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={onDialogOpen}
                                className="p-2 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-200 hover:scale-105"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                            <NotificationsModal
                                data={notificationsData}
                                onClose={onDialogClose}/>

                            <Link
                                href={route('profile.edit')}
                                className="text-sm font-medium text-gray-700"
                            >
                                {user.name}
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm font-medium text-gray-700 bg-transparent px-3 py-2 rounded-md"
                            >
                                Cerrar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex-1 overflow-auto mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg p-4 border border-gray-200 mb-12">
                        {children}
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-2 fixed bottom-0 left-0 right-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        Enrique Redondo Cortés, 2025
                </div>
            </footer>
        </div>
    );
};

export default AuthenticatedLayout
