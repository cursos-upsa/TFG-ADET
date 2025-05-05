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
            <h2>Eliminar cuenta</h2>
            <p>
                Una vez que tu cuenta sea eliminada, todos sus recursos y datos
                serán eliminados permanentemente. Antes de eliminar tu cuenta,
                por favor descarga cualquier dato o información que desees
                conservar.
            </p>

            <button onClick={confirmUserDeletion}>
                Eliminar cuenta
            </button>

            {confirmingUserDeletion &&
                <div>
                    <div>
                        <form onSubmit={deleteUser}>
                            <h2>
                                ¿Estás seguro de que quieres eliminar tu cuenta?
                            </h2>

                            <p>
                                Una vez que tu cuenta sea eliminada, todos sus recursos y
                                datos serán eliminados permanentemente. Por favor, introduce tu
                                contraseña para confirmar que deseas eliminar permanentemente
                                tu cuenta.
                            </p>

                            <div>
                                <label htmlFor="password">Contraseña</label>

                                <input id="password"
                                       type="password"
                                       name="password"
                                       ref={passwordInput}
                                       value={data.password}
                                       onChange={(e) => setData('password', e.target.value)}
                                       placeholder="Contraseña"/>

                                {errors.password &&
                                    <div>{errors.password}</div>}
                            </div>

                            <div>
                                <button type="button"
                                        onClick={closeModal}>
                                    Cancelar
                                </button>

                                <button disabled={processing}>
                                    Eliminar cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                    <div onClick={closeModal}></div>
                </div>}
        </section>
    );
}
