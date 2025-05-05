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
            <h2>Información del perfil</h2>
            <p>Actualiza la información del perfil y la dirección de correo electrónico de tu cuenta.</p>

            <form onSubmit={submit}>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input id="name"
                           type={"text"}
                           value={data.name}
                           onChange={(e) => setData('name', e.target.value)}
                           required
                           autoComplete="name"/>
                    {errors.name &&
                        <div>{errors.name}</div>}
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email"
                           type="email"
                           value={data.email}
                           onChange={(e) => setData('email', e.target.value)}
                           required
                           autoComplete="username"/>
                    {errors.email &&
                        <div>{errors.email}</div>}
                </div>

                {mustVerifyEmail &&
                    user.email_verified_at === null &&
                    <div>
                        <p>
                            Tu dirección de correo electrónico no está verificada.
                            <Link href={route('verification.send')}
                                  method="post"
                                  as="button">
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && <div>
                            Se ha enviado un nuevo enlace de verificación a tu
                            dirección de correo electrónico.
                        </div>}
                    </div>}

                <div>
                    <button disabled={processing}>Guardar</button>

                    {recentlySuccessful &&
                        <p>Guardado.</p>}
                </div>
            </form>
        </section>
    );
}
