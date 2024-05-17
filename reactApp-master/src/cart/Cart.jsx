import { Grid, Box, Typography, Button, Paper, TableContainer, Table, TableRow, TableCell } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux';
import { useState } from 'react';
import CartProduct from './CartProduct';
import { Header } from '../Common';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';



function Cart({ data }) {
    console.log("thi is connect data x", data);
    return (
        <div>
            <Header />
            <Grid container marginTop='1rem' display="flex" justifyContent="space-evenly">
                <Grid item  >
                    {data.map(x => (<Grid container ><Grid item > <Box><CartProduct key={x.id} productinfo={x} /></Box></Grid></Grid>))}
                </Grid>
                <Grid item marginTop='1rem' justifyContent="space-evenly"  ><Paper elevation={24} sx={{ marginTop: "1.5rem", minHeight: '265px', minWidth: '325px' }}>

                    <Typography variant='h5' color="green" align='center' >Cart Summary</Typography>


                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell> <Typography variant='caption' color="green">No of item : </Typography></TableCell> <TableCell>  <Typography variant='caption' color="lightgreen">{50} </Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>  <Typography variant='caption' color="green">Total:</Typography></TableCell> <TableCell>  <Typography variant='caption' color="lightgreen">₹{50} </Typography></TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="center" marginTop="5rem" >
                        <Button size='small' variant="contained" style={{ background: 'linear-gradient(120deg, #689f38,#e64a19, #689f38)' }} endIcon={<ShoppingCartCheckoutIcon />} >Checkout</Button>
                    </Box>


                </Paper>
                </Grid>

            </Grid >


        </div >
    );
}


const mapsSateToProps = state => {
    return { data: state.cart.Products }
}

export default connect(mapsSateToProps)(Cart);
