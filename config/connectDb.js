const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `DB is connected. Name: ${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
