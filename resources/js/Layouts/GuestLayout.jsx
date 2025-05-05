import {Link} from '@inertiajs/react';

export default function GuestLayout({children}) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Inicio</Link>
                    </li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}
