const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const mongoUri = `mongodb+srv://gautam:ZXiWcfmBbLprcbfz@cluster2.envghjl.mongodb.net/?retryWrites=true&w=majority`;

  try {
    const connect = await mongoose.connect(
      mongoUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        // console.log(`SuccessFully Connect to database`);
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
