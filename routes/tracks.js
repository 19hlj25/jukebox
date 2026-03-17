import express from "express";
import { getTracks, getTrackById } from "#db/queries/tracks";


const router = express.Router();

router.get("/", async (req, res) => {
    const tracks = await getTracks();
    res.send(tracks);
});


 router.get("/:id", async(req, res) => {
    const { id } = req.params;

     const idNum = Number(id);
  if (isNaN(idNum)) {
    return res.status(400).send("Id must be a number");
  }


    const track = await getTrackById(id);

    if(!track){
        return res.status(404).send("Track not found");
    }

    res.send(track);
});



export default router; 