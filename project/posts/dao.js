import model from "./model.js";
export const createPost = (post) => {
    delete post._id;
    return model.create(post);
}
// export const makePost = (post) => model.create(post);

export const findAllPosts = () => model.find();
export const findPostById = (postId) => model.findById(postId);
export const findPostByTitle = (title) =>  model.findOne({ title: title });
// export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updatePost = (postId, post) =>  model.updateOne({ _id: postId }, { $set: post });
export const deletePost = (postId) => model.deleteOne({ _id: postId });