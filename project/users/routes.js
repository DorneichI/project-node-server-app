import * as dao from "./dao.js";
// let currentUser = null;
export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };    
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };  
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };    
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        const currentUser = req.session["currentUser"];
        if (userId === currentUser._id) {
            req.session["currentUser"] = req.body;
        }
        res.json(status);
    };
    const signup = async (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.status(400).json(
                { message: "Missing username and/or password" }
            );
        }
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" }
            );
        }
        
        const currentUser = await dao.signupUser(req.body);

        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      };
    const signin = async (req, res) => { 
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "No current user" });
        }
        res.json(currentUser);
    };
    const profileByUsername = async (req, res) => {
        const { username } = req.params;
        const currentUser = await dao.findUserByUsername(username);
        res.json(currentUser);
    };

    app.post("/projectapi/users", createUser);
    app.get("/projectapi/users", findAllUsers);
    app.get("/projectapi/users/:userId", findUserById);
    app.put("/projectapi/users/:userId", updateUser);
    app.delete("/projectapi/users/:userId", deleteUser);
    app.post("/projectapi/users/signup", signup);
    app.post("/projectapi/users/signin", signin);
    app.post("/projectapi/users/signout", signout);
    app.post("/projectapi/users/profile", profile);
    app.post("/projectapi/users/profile/:username", profileByUsername);
}

