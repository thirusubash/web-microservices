import React, { useCallback } from 'react';
import { Button, ButtonGroup, Typography, Grid, AppBar, Box } from '@mui/material';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Gpay from '@assets/icons/google-pay-mark_800.svg';
import gksvp_mail from '@assets/icons/gksvp_mail.png';

export default function Footer() {
    const num = '+919787048122';
    const name = "HI subash, ";
    const msg = "i want to know product details ";
    const supportmail = "support@gksvp.com";

    const OpenLocation = useCallback(() => {
        window.open("https://goo.gl/maps/xA1wdTRdidw4vUVcA", '_blank');
    }, []);

    const sendWhatsApp = useCallback(() => {
        const whatsappURL = `https://wa.me/${num}?text=${encodeURIComponent(name)}%20%20${encodeURIComponent(msg)}`;
        window.open(whatsappURL, '_blank');
    }, [num, name, msg]);

    const facebook = useCallback(() => {
        window.open('https://facebook.com', '_blank');
    }, []);

    const linkedin = useCallback(() => {
        window.open('https://in.linkedin.com/', '_blank');
    }, []);

    const sendMail = useCallback(() => {
        window.open('mailto:support@gksvp.com');
    }, []);

    return (

        <Grid container color='inherit' sx={{ position: 'sticky', bottom: 0, border: 1, borderColor: "#00695f" }} justifyContent="center" alignItems="center">
            <Grid item>
                <Button
                    sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
                    onClick={() => { window.location = "tel:+918940301427" }}
                >
                    <Typography style={{ color: 'green', fontFamily: "roboto" }}>Connect with us</Typography>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex' } }}
                    onClick={() => { window.location = "tel:+9104343291748" }}
                    color="success"
                    variant="text"
                    startIcon={<CallSharpIcon />}
                >
                    04343291748
                </Button>
            </Grid>
            <Grid item>
                <Button
                    onClick={() => { window.location = "tel:+916369042826" }}
                    color="success"
                    variant="text"
                    startIcon={<CallSharpIcon />}
                >
                    6369042826
                </Button>
            </Grid>
            <Grid item>
                <ButtonGroup>
                    <Button
                        aria-label="whats app to gksvp"
                        onClick={sendWhatsApp}
                        color="success"
                        variant="text"
                        startIcon={<WhatsAppIcon />}
                    ></Button>
                    <Button onClick={facebook} color="primary" variant="text" startIcon={<FacebookIcon />}></Button>
                    <Button onClick={linkedin} color="primary" variant="text" startIcon={<LinkedInIcon />}></Button>
                    <Button
                        onClick={sendMail}
                        color="success"
                        variant="text"
                        startIcon={<img src={gksvp_mail} alt="support@gksvp.com" aria-hidden="true" width="16px" />}
                        style={{ textTransform: 'none' }}
                    >
                        <Typography sx={{ display: { sm: 'none', xs: "none", md: "flex" } }}>{supportmail}</Typography>
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid item>
                <Button
                    aria-label="Navigate to Location"
                    onClick={OpenLocation}
                    color="success"
                    variant="text"
                    startIcon={<LocationOnIcon />}
                >
                    <Typography color={{ color: "green" }} variant="caption" />
                </Button>
            </Grid>
            <Grid item sm={1}>
                <Button id='gpay' size='small'>
                    <img src={Gpay} alt="gk gpay" aria-hidden="true" />
                </Button>
            </Grid>
        </Grid>

    );
}
