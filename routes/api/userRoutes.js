const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require("../../controllers/userControllers");

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;