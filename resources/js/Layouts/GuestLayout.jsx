import {Link} from '@inertiajs/react';

const GuestLayout = ({children}) => (
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

export default GuestLayout