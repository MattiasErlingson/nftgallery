import { ObjectId } from "bson";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, resp) {
    try {
        const like = parseInt(req.headers.likes) + 1;
        const id = req.headers.id;
        console.log(like)
        console.log(id)
        const client = await clientPromise
        const db = client.db("emils");
        db.collection("nfts").updateOne(
            { _id: ObjectId(id) },
            {
                $set: { 'likes': like }
            }
        )
    } catch (err) {
        resp.status(err).json({});
    }
    resp.status(200);
    resp.end();
}