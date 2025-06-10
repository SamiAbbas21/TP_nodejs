const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken, checkRole } = require('../middlewares/auth');

router.use(verifyToken, checkRole('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
