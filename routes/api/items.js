const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get all items
//@access private
//ändern in /:userId/items
router.get('/:userId', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId })
    // sort({}).
    .then((items) => res.json(items));
});

//@route GET api/item
//@desc Get an item
//@access private

// router.get('/:userId/items/:id', authMiddleware, (req, res) => {
//   //userId aus der res bekommen?
//   Item.find({ user: req.params.userId, _id: req.params.id })
//     // sort({}).
//     .then((item) => res.json(item));
// });

//@route POST api/items
//@desc Create item
//@access private
router.post('/new', authMiddleware, (req, res) => {
  const newItem = new Item({ ...req.body });
  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items/:id
//@desc Delete item
//@access private
router.delete('/:id', authMiddleware, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

router.get('/:userId/:id', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId, _id: req.params.id }).then((item) => res.json(item));
});
//TODO
// @route PATCH api/lists/:id
// router.patch('/:id', auth,
//     async (req, res) => {
//         try {
//             await List.findById(req.params.id, (error, item) => {
//                 if (req.body.type === "delete") {
//                     item.todos = item.todos.filter(todo => todo._id + '' !== req.body.id)
//                 } else {
//                     item.todos = item.todos.map(todo => {
//                         if (todo._id + '' === req.body.id) {
//                             if (req.body.type === "rename") {
//                                 todo.name = req.body.name
//                                 todo.date = Date.now()
//                             } else if (req.body.type === "complete") {
//                                 todo.done = !todo.done
//                                 todo.date = Date.now()
//                             }
//                         } return todo
//                     })
//                 }
//                 item.save()
//             })
//             res.status(200).json({ success: true })

//         } catch(error) {
//             res.status(500).json({ message: 'Something went wrong... Try again' })
//         }
//     }
// )

module.exports = router;
