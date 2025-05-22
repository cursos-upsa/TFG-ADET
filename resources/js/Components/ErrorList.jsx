const ErrorList = ({formErrors}) => {
    if (!formErrors)
        return null;

    return (
        <ul>
            {Object.entries(formErrors).map(([key, value]) => (
                <p key={key}>{value}</p>
            ))}
        </ul>
    );
};

export default ErrorList;