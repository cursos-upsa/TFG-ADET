import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({mustVerifyEmail, status}) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil"/>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-indigo-800 mb-6">Perfil</h1>

                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <UpdateProfileInformationForm 
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
