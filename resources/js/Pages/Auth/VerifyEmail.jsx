import {Head, Link, useForm} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function VerifyEmail({status}) {
    const {post, processing} = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificación de correo electrónico"/>

            <div className="mb-6 text-gray-600 text-sm">
                ¡Gracias por registrarte! Antes de que puedas comenzar a usar la aplicación, por favor verifica tu dirección de correo electrónico
                haciendo clic en el enlace que se te ha enviado. Si no recibiste el correo electrónico, te enviaremos
                otro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que se registró previamente.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col space-y-4">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
                    >
                        Reenviar correo de verificación
                    </button>

                    <Link 
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 text-center"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
