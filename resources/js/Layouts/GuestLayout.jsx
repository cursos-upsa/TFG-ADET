import {Link} from '@inertiajs/react';

export default function GuestLayout({children}) {
    return (
        <div>
            <div>
                <Link href="/">Inicio</Link>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
