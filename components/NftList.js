import styles from '../styles/Home.module.css'
import * as React from 'react';
import { ImageListItem, Divider, Avatar,  ImageListItemBar, IconButton, Typography } from '@mui/material';
import { FavoriteOutlined } from '@mui/icons-material';
import { useState } from 'react';



const NftList = (props) => {
    const nfts = props.nfts;
    const nftInfo = props.nftInfo;

   
    //Array of all likes for state control
    const nftLikes = nfts.map(function (nft) {
        return nft.likes;
    });

    //Array for buttonDisabled initialized to false
    const disabled = new Array(nfts.length).fill(false);

    const [likes, setLike] = useState(nftLikes);
    const [disabledButton, setDisabled] = useState(disabled);
    
    const incrementLike = (index) => {
        let newArr = [...likes];
        newArr[index] += 1;
        setLike(newArr);
    }

    const disableButton = (index) => {
        let newArr = [...disabledButton];
        if(!newArr[index]){
            newArr[index] = true;
        } else {
            console.log("Button already disabled")
        }
        setDisabled(newArr);
    }

    async function incrementInDB(item, currentLikes) {
        fetch('api/updateNft', {
            headers: {
                'id': item._id,
                'likes': currentLikes
            }
        })
    }

    return (
        <div className={styles.gallery}>
            {nfts.map((item, index) => (
                <div className={styles.grow} key={index}>
                    <div className={styles.pics} key={index}>
                        <div className={styles.cardHolder} key={index}>
                            <ImageListItem style={{padding: '20px'}} key={item.title}>
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
                                            disabled={disabledButton[index]}
                                            size="small"
                                            sx={{
                                                color: "purple",
                                                ml: 1,
                                                "&.MuiButtonBase-root:hover": {
                                                    bgcolor: "transparent"
                                                }
                                            }}
                                            // TODO: Disable button on click
                                            onClick={() => {
                                                incrementLike(index);
                                                disableButton(index);
                                                incrementInDB(item, likes[index] - 1);
                                            }}
                                        >
                                            <FavoriteOutlined fontSize="large" />
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                />
                                <Typography variant="body1">{likes[index]} likes</Typography>
                                <div style = {{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <Typography variant="body1">Floor price: {nftInfo[index]['collection']['stats']['floor_price']}</Typography>
                                <Avatar src="eth.ico" style={{width: "20px", height: "20px"}}/>
                                </div>
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