import {usePage} from "@inertiajs/react";

const JustProfessor = ({children}) => {
    const {auth: {user: {role}}} = usePage().props;

    if (role !== 'professor')
        return <></>

    return children;
};

export default JustProfessor;