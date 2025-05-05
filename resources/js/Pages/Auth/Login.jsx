import {Head, Link, useForm} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function Login({status, canResetPassword}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = e => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión"/>
            {status &&
                <div>{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email"
                           type="email"
                           name="email"
                           value={data.email}
                           autoComplete="username"
                           autoFocus
                           onChange={e => setData('email', e.target.value)}/>
                    {errors.email &&
                        <div>{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input id="password"
                           type="password"
                           name="password"
                           value={data.password}
                           autoComplete="current-password"
                           onChange={e => setData('password', e.target.value)}/>
                    {errors.password &&
                        <div>{errors.password}</div>}
                </div>

                <div>
                    <label>
                        <input
                            name="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}/>
                        Recuérdame
                    </label>
                </div>

                <div>
                    {canResetPassword &&
                        <Link href={route('password.request')}>
                            ¿Olvidaste tu contraseña?
                        </Link>}

                    <button type="submit" disabled={processing}>
                        Iniciar sesión
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
