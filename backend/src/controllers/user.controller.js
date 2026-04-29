import { User } from "../models/user.models.js"

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const email = String(req.body.email);
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" });
        }
        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.status(400).json({ message: "User already exist!" });
        }
        const user = await User.create({ username, email, password, loggedIn: false });
        res.status(201).json({ message: "User registered succesfully!", user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        res.status(200).json({ message: "User logged in", user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Logout succesfull" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

export { loginUser, logoutUser, registerUser }