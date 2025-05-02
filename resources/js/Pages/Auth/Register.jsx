import {Head, Link, useForm} from '@inertiajs/react';

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div>
            <Head title="Registro"/>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required/>
                    {errors.name && <div>{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required/>
                    {errors.email && <div>{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required/>
                    {errors.password && <div>{errors.password}</div>}
                </div>

                <div>
                    <label htmlFor="password_confirmation">Confirmar contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required/>
                    {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
                </div>

                <div>
                    <Link href={route('login')}>
                        ¿Ya estás registrado? Inicia sesión
                    </Link>
                    <button type="submit" disabled={processing}>
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
}
