import styles from '../styles/Home.module.css'
import * as React from 'react';
import { ImageList, ImageListItem, ImageListItemBar, Box, IconButton, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const NftList = (props) => {
    const nfts = props.nfts;

    async function increment(item) {
        fetch('api/nfts', {
            headers: {
                'id': item._id,
                'likes': item.likes
            }
        })
    }

    return (
        <div className={styles.gallery}>
            {nfts.map((item, index) => (
                <div className={styles.grow}>
                <div className={styles.pics}  key={index}>
                    <div className={styles.cardHolder} key={index}>
                        <ImageListItem key={item.title}>
                            <img
                                src={item.img}
                                style={{ width: "100%" }}
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
                                        //disableElevation
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
                        </ImageListItem>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>

    );
}

export default NftList;