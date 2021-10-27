import { AppBar, Divider, Container, Toolbar, Typography } from "@mui/material";

const Footer = () => {
    return (
        <>
            <Divider color="white" sx={{}}/>
            <AppBar position="static" color="transparent"  sx={{p: "30px", display: "flex"}}>
                <Container maxWidth="md" >
                    <Toolbar sx={{ display: "flex", flexDirection: "column", alignItems: "left", }}>
                        <Typography variant="h6" color="white">
                            © Copyright Emil Erlingsson 2021 
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Footer;