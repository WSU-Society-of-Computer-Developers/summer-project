import express from "express";
import { cacheMiddleware } from "../../utils";
import { Request, Response, NextFunction } from "express";
import pb from "../../utils/pocketbase";
import client from "../../utils/redis";
const router = express.Router();

router.get(
  "/",
  [cacheMiddleware({ key: "posts", base: true, id: false })],
  async (req: Request, res: Response) => {
    const postsTTL = 60;
    const data = await pb.collection("posts").getFullList({
      sort: "-created",
      expand: "comments,likes,comments.author",
    });
    res.status(200).json({ body: data });
    await client.set(req.params.cacheKey, JSON.stringify(data));
    await client.expire(req.params.cacheKey, postsTTL);
  }
);

router.get(
  "/:id",
  [cacheMiddleware({ key: "posts", base: false, id: true })],
  async (req: Request, res: Response) => {
    if (!(JSON.parse(req.params.idIsValid) as Boolean)) {
      res.status(400).json({ error: "`postid` parameter is required" });
      return;
    }
    const postid = req.params.id;
    const postTTL = 60;
    const data = await pb
      .collection("posts")
      .getOne(postid, { expand: "author,comments.author,likes" });
    // TODO: its not finding it
    res.status(200).json({ body: data });
    await client.set(req.params.cacheKey, JSON.stringify(data));
    await client.expire(req.params.cacheKey, postTTL);
  }
);

export default router;
