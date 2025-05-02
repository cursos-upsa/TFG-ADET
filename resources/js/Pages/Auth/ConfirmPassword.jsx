import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div>
            <Head title="Confirmar contraseña" />

            <div>
                Esta es un área segura de la aplicación. Por favor, confirma tu contraseña para continuar.
            </div>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && (
                        <div>
                            {errors.password}
                        </div>
                    )}
                </div>

                <div>
                    <button type="submit" disabled={processing}>
                        Confirmar
                    </button>
                </div>
            </form>
        </div>
    );
}
