import {Head, useForm} from '@inertiajs/react';

export default function ForgotPassword({status}) {
    const {data, setData, post, processing, errors} = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div>
            <Head title="Contraseña olvidada"/>

            <div>
                ¿Olvidaste tu contraseña? No hay problema. Solo dinos tu dirección de correo electrónico y te enviaremos un
                enlace para restablecer la contraseña.
            </div>

            {status && (
                <div>
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email"
                           type="email"
                           name="email"
                           value={data.email}
                           autoFocus
                           onChange={(e) => setData('email', e.target.value)}
                           required/>
                    {errors.email && <div>{errors.email}</div>}
                </div>

                <div>
                    <button type="submit" disabled={processing}>
                        Enviar enlace para restablecer contraseña
                    </button>
                </div>
            </form>
        </div>
    );
}
