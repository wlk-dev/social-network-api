const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require("..//../controllers/thoughtControllers")

router.route('/').get(getThoughts).post(createThought)
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought)
router.route('/:id/reactions').post(addReaction).delete(removeReaction)


module.exports = router;