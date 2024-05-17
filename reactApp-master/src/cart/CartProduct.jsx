import React from 'react'
import { Button, ButtonGroup, CardActions, CardContent, CardMedia, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

function CartProduct({ productinfo }) {
    return (
        <div>
            <Box sx={{ maxWidth: 345 }} marginTop="1rem">
                <Paper elevation={24} >

                    <CardMedia onClick={() => { alert("Action Area") }} sx={{ ":hover": { background: "#cddc39" }, borderRadius: "10px" }}
                        component="img"
                        height={{ md: "350px" }}
                        image={productinfo.img}
                        alt="green iguana"

                    />
                    <CardContent onClick={() => { alert("Action Area") }} sx={{ fontFamily: "unset", borderRadius: "10px" }}>
                        <Typography color="teal" gutterBottom variant="h5" component="div">
                            {productinfo.title}
                        </Typography>
                        <Typography variant="body2" color="teal">
                            {productinfo.author}
                        </Typography>

                    </CardContent>
                    <CardActions  >
                        <Button variant="contained" style={{ background: 'linear-gradient(120deg, #ff3d00, #689f38)' }} sx={{ ml: "1rem" }} endIcon={<RemoveShoppingCartIcon />}>

                        </Button>
                        <ButtonGroup variant="contained" size="small" disableElevation='false' sx={{ ml: "1rem" }} >
                            <Button style={{ background: 'linear-gradient(80deg, #ff8f00, #689f38)' }} size="small">+</Button>
                            <TextField autoFocus color='primary' size='small' defaultValue={1} style={{ border: "transplant", width: '32%', background: 'linear-gradient(90deg, #689f38, #c8e6c9,#689f38)' }}> </TextField>

                            <Button style={{ background: 'linear-gradient(50deg, #689f38, #ff8f00)' }} size="small">-</Button>
                        </ButtonGroup>



                    </CardActions>
                </Paper>
            </Box>
        </div >
    )
}

export default CartProduct
