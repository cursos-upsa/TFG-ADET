import {useEffect} from "react";
import {router} from "@inertiajs/react";

/**
 * Custom hook to reload Inertia page props on browser back/forward navigation.
 * When a popstate event occurs (back/forward navigation),
 * the page props are reloaded based on the provided options,
 * so the browser cache doesn't show old data in the page.
 *
 * @param {object} [reloadOptions={}] - Options to pass to router.reload().
 *                                      Example: { only: ['dataToReload'], preserveScroll: true }
 */
export default function usePopStateReload(reloadOptions = {}) {
    useEffect(() => {
        const handlePopState = () => {
            router.reload(reloadOptions);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [JSON.stringify(reloadOptions)]);
}
