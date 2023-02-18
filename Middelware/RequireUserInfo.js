const jwt = require("jsonwebtoken");
const User = require("../Schema/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Required Header  Web Token"));
  }

  const accesWebToken = req.headers.authorization.split(" ")[1];
  console.log(accesWebToken);

  try {
    const tokenDecode = await jwt.verify(
      accesWebToken,
      process.env.ACCESSWEBTOKEN
    );

    req._id = tokenDecode._id;

    const user = await User.findById(req._id);

    if (!user) {
      return res.send(error("User Is Not Found"));
    }

    next();
  } catch (e) {
    console.log(e.message);
    return res.send(error(401, "Invalid Token"));
  }
};
