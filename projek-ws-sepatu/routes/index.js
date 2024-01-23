const { findAllSepatus, getSepatuById, createNewSepatu, updateSepatu, destroySepatu } = require('../controller/sepatusController');

const router = require('express').Router();

router.get('/sepatu', findAllSepatus);
router.get('/sepatu/:id', getSepatuById);
router.post('/sepatu', createNewSepatu);
router.patch('/sepatu/:id', updateSepatu);
router.delete('/sepatu/:id', destroySepatu);

module.exports = router;