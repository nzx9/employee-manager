var express = require('express');
var router = express.Router();

/* GET employees listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


/* GET employees listing. */
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

/* GET employees listing. */
router.put('/', function (req, res, next) {
  const { empId } = req.query.empId;
  res.send('respond with a resource');
});

/* GET employees listing. */
router.delete('/', function (req, res, next) {
  const { empId } = req.query;
  res.send('respond with a resource');
});

module.exports = router;
