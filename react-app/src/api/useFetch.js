import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetch(url)
            .then(response => response.json())
            .then(fetchedData => {
                setData(fetchedData);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]); // Re-fetch on URL change

    return { data, loading, error };
}

export default useFetch;
