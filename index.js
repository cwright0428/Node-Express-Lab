// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();

// add your server code starting here
/*server.get('/', (req, res) => {
  res.send('<h1>Yo Wassup</h1>')
})*/

server.use(express.json());

server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.find();
    if (post) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "err" });
  }
  db.find();
});

//2nd get req using find by ID method

server.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      res.status(404).json({ message: "not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }

  // const id = req.params.id;
  // db.findById(id)
  //   .then(posts => {
  //     if (posts.length === 0) {
  //       res.status(404).json({ message: "not found" });
  //     } else res.status(200).json(posts);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ message: "err" });
  //   });
});

server.post("/api/posts", (req, res) => {
  const postInfo = req.body;
  db.insert(postInfo).then(result => {
    db.findById(result.id)
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch(err =>
        res.status(500).json({ message: "missing title", error: err })
      );
  });
});

server.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;
  db.update(id, post).then(updated => {
    if (!post.contents || !post.title) {
      res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    } else if (!updated) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(post);
    }
  });
});

server.delete("api/posts/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Post deleted" });
    } else {
      res.status(404).json({ message: "Post could not be found" });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error removing the post"
    });
  }
});
server.listen(5000, () => console.log("up and at em!"));
