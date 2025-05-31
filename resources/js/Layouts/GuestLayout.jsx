import {Link} from '@inertiajs/react';

const GuestLayout = ({children}) => (
    <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <ul className="flex space-x-8">
                            <li className="inline-flex items-center px-1 pt-1 text-sm font-medium">
                                <Link href="/">Inicio</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <main className="flex-1 overflow-auto mt-16 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200 mb-12">
                    {children}
                </div>
            </div>
        </main>
        <footer className="bg-white border-t border-gray-200 py-4 fixed bottom-0 left-0 right-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500 mb-0">
                    Enrique Redondo Cortés, 2025
                </p>
            </div>
        </footer>
    </div>
);

export default GuestLayout
