const order = require('../models/order');
const router = express.Router();

router.get('/', utils.ensureAuthenticated, (req, res) => {

    console.log("Printing order");
  });
