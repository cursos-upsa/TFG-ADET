import { useEffect, useRef } from 'react';

export default function useNotificationsDialog(data) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (data && dialogRef.current) {
            dialogRef.current.showModal();
            return;
        }
        dialogRef.current?.close();
    }, [data]);

    return dialogRef;
}