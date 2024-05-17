import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const CartTitle = styled(Typography)(({ theme }) => ({
    background: 'lightblue', // Replace with your desired color
    color: 'white',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
    padding: theme.spacing(2),
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '1.5rem',
}));


const CartContainer = styled('div')(({ theme }) => ({
    background: '#F0F0F0',
    display: 'flex',
    justifyContent: 'center',
}));


const CartItem = styled('li')(({ theme }) => ({
    maxWidth: '400px',
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    opacity: 1,
    transition: 'opacity 0.3s ease',
    '&.MuiCollapse-entering': {
        opacity: 0,
    },
    '&.MuiCollapse-exited': {
        opacity: 1,
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(1),
}));

const ItemContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column', // Display elements vertically
    alignItems: 'center',
}));

const ItemDetails = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(2), // Add some spacing between image and details
}));

const ItemName = styled(Typography)(({ theme }) => ({
    color: 'black',
    fontWeight: 'bold',
    fontSize: '1.2rem',
}));

const ItemPrice = styled(Typography)(({ theme }) => ({
    color: '#B12704',
    fontSize: '1.1rem',
}));

const QuantityContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
}));

const QuantityButton = styled(Button)(({ theme }) => ({
    minWidth: '32px',
    padding: '2px',
    marginRight: theme.spacing(1),
    background: 'linear-gradient(50deg, #009688, #689f38)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    '&:hover': {
        background: 'linear-gradient(50deg, #4caf50, #01579b)',
    },
}));

const RemoveButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #B12704, #FF2200)',
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
        background: 'linear-gradient(45deg, #FF2200, #B12704)',
    },
}));

const AnimatedImage = styled(LazyLoadImage)(({ theme }) => ({
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const EmptyCartMessage = styled(Typography)(({ theme }) => ({

    color: 'blue',
    padding: theme.spacing(2),
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
}));

function Cart() {
    const [cartItems, setCartItems] = useState([
        { name: 'Item 1', price: 10, quantity: 1 },
        { name: 'Item 2', price: 20, quantity: 1 },
        { name: 'Item 3', price: 15, quantity: 1 },
    ]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (index) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);
        setCartItems(updatedItems);
    };

    const incrementQuantity = (index) => {
        const updatedItems = [...cartItems];
        updatedItems[index].quantity += 1;
        setCartItems(updatedItems);
    };

    const decrementQuantity = (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
        }
        setCartItems(updatedItems);
    };

    const getRandomImage = () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        return `https://picsum.photos/200/300?random=${randomNumber}`;
    };

    return (
        <div>
            <CartTitle variant="h4">Cart</CartTitle>

            <CartContainer>
                {cartItems.map((item, index) => (
                    <Collapse in={true} key={index} timeout="auto" unmountOnExit>
                        <StyledCard>
                            <CardContent>
                                <CartItem>
                                    <ItemContainer>
                                        <AnimatedImage
                                            src={getRandomImage()}
                                            alt="Item"
                                            width={200}
                                            height={300}
                                            effect="blur"
                                        />
                                        <ItemDetails>
                                            <ItemName variant="body1">{item.name}</ItemName>
                                            <ItemPrice variant="body2">Price: ${item.price}</ItemPrice>
                                            <QuantityContainer>
                                                <QuantityButton
                                                    variant="outlined"
                                                    onClick={() => decrementQuantity(index)}
                                                >
                                                    -
                                                </QuantityButton>
                                                <Typography>{item.quantity}</Typography>
                                                <QuantityButton
                                                    variant="outlined"
                                                    onClick={() => incrementQuantity(index)}
                                                >
                                                    +
                                                </QuantityButton>
                                            </QuantityContainer>
                                            <RemoveButton onClick={() => removeFromCart(index)}>Remove</RemoveButton>
                                        </ItemDetails>
                                    </ItemContainer>
                                </CartItem>
                            </CardContent>
                        </StyledCard>
                    </Collapse>
                ))}
            </CartContainer>

            {cartItems.length === 0 && (
                <EmptyCartMessage variant="body1">
                    No items in the cart
                </EmptyCartMessage>
            )}

            <StyledButton variant="contained" onClick={() => addToCart({ name: 'Item 4', price: 12, quantity: 1 })}>
                Add Item 4
            </StyledButton>
            <StyledButton variant="contained" onClick={() => addToCart({ name: 'Item 5', price: 18, quantity: 1 })}>
                Add Item 5
            </StyledButton>
            {/* Add more items */}
            <StyledButton variant="contained" onClick={() => addToCart({ name: 'Item 6', price: 25, quantity: 1 })}>
                Add Item 6
            </StyledButton>
            <StyledButton variant="contained" onClick={() => addToCart({ name: 'Item 7', price: 30, quantity: 1 })}>
                Add Item 7
            </StyledButton>
            {/* Add more items... */}
            {/* Add up to item 10 */}
            <StyledButton variant="contained" onClick={() => addToCart({ name: 'Item 10', price: 50, quantity: 1 })}>
                Add Item 10
            </StyledButton>
        </div>
    );
}

export default Cart;
