const express = require('express');
const router = express.Router();

router.post('/', (req, res, _) => {
  res.json({name: 'abc'});
});

module.exports = router;