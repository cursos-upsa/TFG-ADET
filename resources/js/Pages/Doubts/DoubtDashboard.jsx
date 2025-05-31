import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import DoubtValidationForm from "@/Pages/Doubts/Partials/DoubtValidationForm.jsx";
import ErrorList from "@/Components/ErrorList.jsx";
import { useState, useEffect } from "react";

const DoubtDashboard = ({subjectId, subjectName, doubts}) => {
    const {data, setData, post, processing, errors} = useForm({
        doubts: doubts.map(({id, state, comment}) => ({
            id,
            state,
            comment
        }))
    });

    const [isHeaderSticky, setIsHeaderSticky] = useState(false);

    // Handle scroll event to make header sticky
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsHeaderSticky(scrollPosition > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('doubts.store', {subjectId}));
    };

    return (
        <AuthenticatedLayout>
            <Head title={"Dudas pendientes"}/>

            {/* Sticky Header */}
            <div 
                className={`${
                    isHeaderSticky 
                        ? 'fixed top-0 left-0 right-0 z-50 shadow-md transform translate-y-0 transition-transform duration-300' 
                        : 'transform -translate-y-full transition-transform duration-300'
                } bg-white py-3 px-6 border-b border-gray-200`}
                style={{ display: isHeaderSticky ? 'block' : 'none' }}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-indigo-700 m-0">{subjectName}</h3>
                        <span className="text-gray-500">|</span>
                        <h3 className="text-lg font-medium text-gray-700 m-0">Dudas pendientes</h3>
                    </div>
                    <button 
                        type="submit" 
                        form="doubt-form"
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Guardar cambios
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold text-indigo-800 mb-1">{subjectName}</h1>
                        <h2 className="text-xl font-medium text-gray-700">Dudas pendientes</h2>
                    </div>
                    <button 
                        type="submit" 
                        form="doubt-form"
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-sm transition-colors duration-200 flex items-center self-start"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Guardar cambios
                    </button>
                </div>

                {/* Error Messages */}
                {Object.keys(errors).length > 0 && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-red-800 font-medium">Se han encontrado errores</h3>
                        </div>
                        <ErrorList formErrors={errors}/>
                    </div>
                )}

                {/* Main Form */}
                <form id="doubt-form" onSubmit={submit} className="mb-8">
                    <ol className="space-y-6 p-0">
                        {doubts.map(({id, created_at, question, answer}) =>
                            <DoubtValidationForm 
                                key={id}
                                doubtId={id}
                                data={data}
                                setData={setData}
                                createdAt={created_at}
                                question={question}
                                answer={answer}
                            />
                        )}
                    </ol>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default DoubtDashboard;
