import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions';

const ProductListing = ({ products, loading, error, fetchProducts }) => {
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>Product Listing</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    products: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
});

const mapDispatchToProps = {
    fetchProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
