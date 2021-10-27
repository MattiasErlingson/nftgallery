import { AppBar, Toolbar, Typography, Button, Avatar, IconButton } from '@mui/material'
import styles from '../styles/Home.module.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <AppBar
      position="fixed" style={{background: 'transparent', boxShadow: 'none', marginBottom: "40px"}}>
      <Toolbar sx={{justifyContent: "center", mt: "30px"}}>
        <Typography variant="h3" component="div" sx={{color: "white", mr: "15%"}}>
          NfToken <span><Typography variant="h5">by <span className={styles.toto}>
            <span>Emil</span>.</span></Typography></span>
        </Typography>
        {isMobile ? 
        <>
        <Button
            variant="contained"
            startIcon={<Avatar src={'twtr.png'} color="black" />}
            className={styles.button}
            href="https://twitter.com/EmilErlingson"
            sx={{ mr: "20px" }}
          >
            <Typography>Twitter</Typography>
          </Button>
          <Button
            variant="contained"
            startIcon={<Avatar src={'os.png'} />}
            className={styles.button}
            href="https://opensea.io/Emil2"
          >
            <Typography>OpenSea</Typography>
          </Button>
          </>
          : (
            <>
              <IconButton href="https://twitter.com/EmilErlingson">
                <Avatar src={'twtr.png'} />
              </IconButton>
              <IconButton href="https://opensea.io/Emil2">
              <Avatar src={'os.png'} />
              </IconButton>

            </>
          )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;