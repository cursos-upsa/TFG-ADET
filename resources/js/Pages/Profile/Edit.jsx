import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({mustVerifyEmail, status}) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil"/>
            <h2>Perfil</h2>
            <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail}
                                          status={status}/>
            <UpdatePasswordForm/>
            <DeleteUserForm/>
        </AuthenticatedLayout>
    );
}
