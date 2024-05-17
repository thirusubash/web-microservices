import { useState, useEffect } from 'react';

/**
 * useDebounce - a hook to debounce a value.
 * @param {any} value - The value you want to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 */
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
