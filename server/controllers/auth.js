import User from "../models/user";
import { hashPassword, comparePasswords } from "../utils/auth";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name) return res.status(400).send("Name is required!");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and must be more than 6!");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) {
      return res.status(400).send("Email already taken");
    }
    //hashpassword
    const hashedPassword = await hashPassword(password);

    //register
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("Saved user!", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error! Try again.");
  }
};
