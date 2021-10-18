import { AppBar, Divider, Container, Toolbar, Typography } from "@mui/material";

const Footer = () => {
    return (
        <>
            <Divider color="purple" sx={{marginTop: "100px"}}/>
            <AppBar position="static" color="transparent"  sx={{p: "30px", display: "flex"}}>
                <Container maxWidth="md" >
                    <Toolbar sx={{ justifyContent: "space-around" }}>
                        <Typography variant="body1" color="purple">
                            © Copyright Emil Erlingsson 2021 
                        </Typography>
                        <Typography variant="body1" color="purple">
                            Contact: <a href="mailto:emil.erlingson@gmail.com">Email..</a>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Footer;