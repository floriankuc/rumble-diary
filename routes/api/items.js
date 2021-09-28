const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');

//item model
const Item = require('../../models/Item');

//@route GET api/items
//@desc get all items
//@access public
router.get('/:userId', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId })

    // Item.find({ owner: req.user.userId })
    // sort({}).
    .then((items) => res.json(items));
});

//@route POST api/items
//@desc create item
//@access public
router.post('/', authMiddleware, (req, res) => {
  const newItem = new Item({
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
    user: req.body.user,
  });

  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items/:id
//@desc delete item
//@access public
router.delete('/:id', authMiddleware, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
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
