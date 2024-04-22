import * as dao from "./dao.js";
export default function PostRoutes(app) {
    const createPost = async (req, res) => {
        console.log(req.body)
        const post = await dao.createPost(req.body);
        res.json(post);
    };    
    const findAllPosts = async (req, res) => {
        const posts = await dao.findAllPosts();
        res.json(posts);
    };
    const findPostById = async (req, res) => {
        const post = await dao.findPostById(req.params.postId);
        res.json(post);
    };
    const findPostsByUserId = async (req, res) => {
        const posts = await dao.findAllPosts();
        const filteredPosts = posts.filter((post) => post.userId === req.params.userId);
        res.json(filteredPosts);
    };
    const updatePost = async (req, res) => {
        const { postId } = req.params;
        const status = await dao.updatePost(postId, req.body);
        res.json(status);
    };
    const deletePost = async (req, res) => {
        const status = await dao.deletePost(req.params.postId);
        res.json(status);
    };
    app.post("/projectapi/posts", createPost);
    app.get("/projectapi/posts", findAllPosts);
    app.get("/projectapi/posts/:postId", findPostById);
    app.put("/projectapi/posts/:postId", updatePost);
    app.delete("/projectapi/posts/:postId", deletePost);
    app.get("/projectapi/posts/by/:userId", findPostsByUserId);
}

