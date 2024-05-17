// productActions.js

export const fetchProducts = () => {
    // Simulated API call
    return async (dispatch) => {
        try {
            // Replace this with your actual API call to fetch products
            const response = await fetch('https://api.example.com/products');
            const data = await response.json();

            dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
        }
    };
};
