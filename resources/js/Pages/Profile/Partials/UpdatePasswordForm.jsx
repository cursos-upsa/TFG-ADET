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
            <h2>Actualizar contraseña</h2>
            <p>Asegúrate de que tu cuenta esté utilizando una contraseña larga y aleatoria para mantenerla segura.</p>

            <form onSubmit={updatePassword}>
                <div>
                    <label htmlFor="current_password">Contraseña actual</label>
                    <input id="current_password"
                           ref={currentPasswordInput}
                           value={data.current_password}
                           onChange={(e) => setData('current_password', e.target.value)}
                           type="password"
                           autoComplete="current-password"
                    />
                    {errors.current_password &&
                        <div>{errors.current_password}</div>}
                </div>

                <div>
                    <label htmlFor="password">Nueva contraseña</label>
                    <input id="password"
                           ref={passwordInput}
                           value={data.password}
                           onChange={(e) => setData('password', e.target.value)}
                           type="password"
                           autoComplete="new-password"
                    />
                    {errors.password &&
                        <div>{errors.password}</div>}
                </div>

                <div>
                    <label htmlFor="password_confirmation">Confirmar contraseña</label>
                    <input id="password_confirmation"
                           value={data.password_confirmation}
                           onChange={(e) => setData('password_confirmation', e.target.value)}
                           type="password"
                           autoComplete="new-password"
                    />
                    {errors.password_confirmation &&
                        <div>{errors.password_confirmation}</div>}
                </div>

                <div>
                    <button disabled={processing}>Guardar</button>
                    {recentlySuccessful &&
                        <p>Guardado.</p>}
                </div>
            </form>
        </section>
    );
}
