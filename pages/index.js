import styles from '../styles/Home.module.css'
import * as React from 'react';
import NftList from '../components/NftList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import clientPromise from '../lib/mongodb';
import { fetchData } from '../components/data';
import { Typography, Avatar, Paper } from '@mui/material';



export default function Home({nfts, nftInfo, ethValue}) {

  const eth_value = ethValue;

  return (
    <body>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px"}}>
        <Typography variant="h6" sx={{color: "#f8f8f8"}}>Floor price total: { eth_value } </Typography>
        <Avatar src="eth.ico" style={{width: "25px", height: "25px"}}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <NftList nfts={nfts} nftInfo={nftInfo}/>
      </div >
      <Footer />
    </body >
  )
}

async function getCollectionFromDB() {
  const client = await clientPromise
  const db = client.db("emils");
  const data = await db.collection("nfts").find({}).toArray();
  const nfts = await JSON.parse(JSON.stringify(data));
  return nfts;
}

async function getNftInfo(nfts) {
  const nftInfo = await Promise.all(
    nfts.map(async (nft) => {
      const res = await fetchData(nft.contract_address, nft.asset_id);
      return res;
    })
  )
  return nftInfo;
}

async function getTotalValue(nftInfo) {
  let totalValue = 0;
  nftInfo.forEach(element => {
      totalValue += element['collection']['stats']['floor_price'];
  })

  return totalValue;
  
}

// Change to getStaticProps?
export async function getServerSideProps(context) {
  const nfts = await getCollectionFromDB();
  const nftInfo = await getNftInfo(nfts);
  const ethValue = await getTotalValue(nftInfo);

  if (!nftInfo) {
    return {
      props: { nfts },
    }
  }

  return {
    props: { nfts, nftInfo, ethValue },
  }

}
