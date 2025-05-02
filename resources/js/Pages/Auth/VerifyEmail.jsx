import {Head, Link, useForm} from '@inertiajs/react';

export default function VerifyEmail({status}) {
    const {post, processing} = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div>
            <Head title="Verificación de correo electrónico"/>

            <div>
                ¡Gracias por registrarte! Antes de que puedas comenzar a usar la aplicación, por favor verifica tu dirección de correo electrónico
                haciendo clic en el enlace que se te ha enviado. Si no recibiste el correo electrónico, te enviaremos
                otro.
            </div>

            {status === 'verification-link-sent' && (
                <div>
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que se registró previamente.
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <button type="submit" disabled={processing}>
                        Reenviar correo de verificación
                    </button>

                    <Link href={route('logout')}
                          method="post"
                          as="button">
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </div>
    );
}
