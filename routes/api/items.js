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
    .then((item) => item.remove().then((item) => res.json(item)))
    // .then((item) => item.remove().then((item) => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

router.get('/:userId/:id', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId, _id: req.params.id }).then((item) => res.json(item));
});

router.patch('/:userId/:id', authMiddleware, (req, res) => {
  Item.findByIdAndUpdate({ user: req.params.userId, _id: req.params.id }, { ...req.body })
    .then((item) => res.json(item))
    .catch(() => res.status(500).json({ success: false }));
});

module.exports = router;
