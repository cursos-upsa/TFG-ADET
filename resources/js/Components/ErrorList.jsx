const ErrorList = ({formErrors}) => {
    if (!formErrors || Object.keys(formErrors).length === 0)
        return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
            <ul className="list-none space-y-1">
                {Object.entries(formErrors).map(([key, value]) => (
                    <li key={key} className="text-red-600 text-sm">
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorList;
