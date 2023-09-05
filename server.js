const app = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}!`);
});
