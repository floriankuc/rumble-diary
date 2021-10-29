const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get all items
//@access private
router.get('/:userId', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId }).then((items) => res.json(items));
});

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
    .catch((err) => res.status(404).json({ success: false }));
});

//@route GET api/items/:userId/:id
//@desc Get item
//@access private
router.get('/:userId/:id', authMiddleware, (req, res) => {
  Item.find({ user: req.params.userId, _id: req.params.id }).then((item) => {
    res.json(item);
  });
});

//@route PATCH api/items/:userId/:id
//@desc Edit item
//@access private
router.patch('/:userId/:id', authMiddleware, (req, res) => {
  Item.findByIdAndUpdate({ user: req.params.userId, _id: req.params.id }, { ...req.body })
    .then((item) => res.json(item))
    .catch(() => res.status(500).json({ success: false }));
});

module.exports = router;
