const { sucess, error } = require("../Utills/utills");
const bcypt = require("bcrypt");
const User = require("../Schema/User");
const jwt = require("jsonwebtoken");

const signUpController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.send(error(401, "Required Info"));
    }

    const alredyUser = await User.findOne({ email });

    if (alredyUser) {
      return res.send(error(401, "User Is Alredy Present"));
    }
    const passwordCrypted = await bcypt.hash(password, 10);

    const user = await User.create({
      email,
      password: passwordCrypted,
      username,
    });

    return res.send(sucess(200, { user }));
  } catch (e) {
    console.log(e.message);
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send(error(401, "Please Enter Deyail"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send(error(401, "User Is Not Present"));
    }

    const matchPassword = await bcypt.compare(password, user.password);

    if (!matchPassword) {
      return res.send(error(401, "Password Not Matched"));
    }

    const jwtToken = AccessWebToken({
      _id: user._id,
    });

    return res.send(sucess(200, { jwtToken }));
  } catch (e) {
    console.log(e);
  }
};

const ForggotenPassword = async (req, res) => {
  try {
    const { email, oldPassword, updatePassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !updatePassword || !confirmPassword) {
      return res.send(error(401, "Email And Forgoot Password Is Required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.send(error(401, "User Is Not Found"));
    }
    const oldPasswordMatch = await bcypt.compare(oldPassword, user.password);

    if (!oldPasswordMatch) {
      return res.send(error(401, "Old Password Is Not Matched"));
    }

    if (oldPassword === updatePassword) {
      return res.send(
        error(401, "Old Password And New Password Are Matched..")
      );
    }

    if (updatePassword !== confirmPassword) {
      return res.send(error(401, "Confirm Password Are Not Matched"));
    }
    const updatetdFinalPassword = await bcypt.hash(updatePassword, 10);
    const NewPassword = await User.updateMany({
      password: updatetdFinalPassword,
    });
    return res.send(sucess(200, "Your Password Is Sucessfully Changed"));
  } catch (e) {
    console.log(e.message);
  }
};

const LogoutController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send(error(401, "Please Enter Valid Data"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.send(error(401, "User Is Invalid"));
  }

  const matchPassword = await bcypt.compare(password, user.password);

  if (!matchPassword) {
    return res.send(error(401, "Password Is Not Matched"));
  }

  const deleteUser = await User.exists(user);

  return res.send(error(401, "Logout Succesfully"));
};

const AccessWebToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESSWEBTOKEN);
  return token;
};

module.exports = {
  signUpController,
  LoginController,
  ForggotenPassword,
  LogoutController,
};
