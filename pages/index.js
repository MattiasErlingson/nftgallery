import styles from '../styles/Home.module.css'
import * as React from 'react';
import NftList from '../components/NftList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import clientPromise from '../lib/mongodb';
import { Box } from '@mui/system';


export default function Home({nfts}) {

  return (
    <body>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "120px" }}>
          <NftList nfts={nfts}/>
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
