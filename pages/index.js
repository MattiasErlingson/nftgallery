import styles from '../styles/Home.module.css'
import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Box, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import clientPromise from '../lib/mongodb';
import { color } from '@mui/system';

export default function Home({nfts}) {

  async function increment(item){
    fetch('api/nfts', {
      headers: {
        'id': item._id,
        'likes': item.likes
      }
    })
  }

  return (
    <body className={styles.background}>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
        <Box width="80%">
          <ImageList variant="masonry" cols={3} gap={8} sx={{ alignContent: "center" }}>
            {nfts.map((item) => (
              <ImageListItem key={item.title} className={styles.grow}>
                <div className={styles.cardHolder}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{ backgroundColor: "transparent", mt: "3px" }}
                    title={item.title}
                    subtitle={item.creator}
                    position="below"
                    actionIcon={
                      <IconButton
                        className={styles.buttonGrow}
                        disableElevation
                        disableRipple
                        size="small"
                        sx={{
                          color: "purple",
                          ml: 1,
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "transparent"
                          }
                        }}
                        onClick={() => {
                          increment(item);
                          alert(item._id);
                        }}
                      >
                        <Favorite fontSize="medium" />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                  <Typography variant="body1">{item.likes} likes</Typography>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div >
      <Footer />
    </body >
  )
}

// Change to getStaticProps?
export async function getServerSideProps(context) {
  const client = await clientPromise
  const db = client.db("emils");

  const data = await db.collection("nfts").find({}).toArray();
  const nfts = JSON.parse(JSON.stringify(data));

  return {
    props: { nfts },
  }
}
