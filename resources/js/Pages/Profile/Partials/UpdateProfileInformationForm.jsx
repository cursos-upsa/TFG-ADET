import {useForm, usePage, Link} from '@inertiajs/react';

export default function UpdateProfileInformation({mustVerifyEmail, status}) {
    const user = usePage().props.auth.user;

    const {data, setData, patch, errors, processing, recentlySuccessful} = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Información del perfil</h2>
            <p className="text-gray-600 text-sm mb-6">Actualiza la información del perfil y la dirección de correo electrónico de tu cuenta.</p>

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input 
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                    </label>
                    <input 
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                        <p className="text-yellow-700 text-sm">
                            Tu dirección de correo electrónico no está verificada.
                            <Link 
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 text-indigo-600 hover:text-indigo-500 underline"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-green-700 text-sm">
                                Se ha enviado un nuevo enlace de verificación a tu
                                dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-end pt-2">
                    <button 
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
                    >
                        Guardar
                    </button>

                    {recentlySuccessful && (
                        <p className="text-green-600 ml-3">Guardado.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
