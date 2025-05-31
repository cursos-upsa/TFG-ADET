import {useForm} from '@inertiajs/react';
import {useRef} from 'react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Actualizar contraseña</h2>
            <p className="text-gray-600 text-sm mb-6">Asegúrate de que tu cuenta esté utilizando una contraseña larga y aleatoria para mantenerla segura.</p>

            <form onSubmit={updatePassword} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                        Contraseña actual
                    </label>
                    <input 
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.current_password && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.current_password}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Nueva contraseña
                    </label>
                    <input 
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                        Confirmar contraseña
                    </label>
                    <input 
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.password_confirmation && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>

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
