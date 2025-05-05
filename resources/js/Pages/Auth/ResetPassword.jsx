import {Head, useForm} from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function ResetPassword({token, email}) {
    const {data, setData, post, processing, errors, reset} = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Restablecer contraseña"/>
            <form onSubmit={submit}>
                <input type="hidden" name="token" value={data.token}/>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email"
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
                    <input id="password"
                           type="password"
                           name="password"
                           value={data.password}
                           autoComplete="new-password"
                           autoFocus
                           onChange={(e) => setData('password', e.target.value)}
                           required/>
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirmar contraseña</label>
                    <input id="password_confirmation"
                           type="password"
                           name="password_confirmation"
                           value={data.password_confirmation}
                           autoComplete="new-password"
                           onChange={(e) => setData('password_confirmation', e.target.value)}
                           required/>
                    {errors.password_confirmation && (
                        <div>{errors.password_confirmation}</div>
                    )}
                </div>
                <div>
                    <button type="submit" disabled={processing}>
                        Restablecer contraseña
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
