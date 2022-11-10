const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
} = require("..//../controllers/thoughtControllers")

router.route('/').get(getThoughts).post(createThought)
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought)

module.exports = router;