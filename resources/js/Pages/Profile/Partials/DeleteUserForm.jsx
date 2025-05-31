import {useForm} from '@inertiajs/react';
import {useRef, useState} from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">Eliminar cuenta</h2>
            <p className="text-gray-600 text-sm mb-6">
                Una vez que tu cuenta sea eliminada, todos sus recursos y datos
                serán eliminados permanentemente. Antes de eliminar tu cuenta,
                por favor descarga cualquier dato o información que desees
                conservar.
            </p>

            <div className="flex justify-end">
                <button 
                    onClick={confirmUserDeletion}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                    Eliminar cuenta
                </button>
            </div>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <form onSubmit={deleteUser} className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                ¿Estás seguro de que quieres eliminar tu cuenta?
                            </h2>

                            <p className="text-gray-600 text-sm">
                                Una vez que tu cuenta sea eliminada, todos sus recursos y
                                datos serán eliminados permanentemente. Por favor, introduce tu
                                contraseña para confirmar que deseas eliminar permanentemente
                                tu cuenta.
                            </p>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>

                                <input 
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Contraseña"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />

                                {errors.password && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                                >
                                    Cancelar
                                </button>

                                <button 
                                    disabled={processing}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors duration-200"
                                >
                                    Eliminar cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                    <div onClick={closeModal} className="absolute inset-0 cursor-pointer"></div>
                </div>
            )}
        </section>
    );
}
