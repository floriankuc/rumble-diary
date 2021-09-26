const express = require('express');
const router = express.Router();

//item model
const Item = require('../../models/Item');

//@route GET api/items
//@desc get all items
//@access public
router.get('/', (req, res) => {
  Item.find()
    // sort({}).
    .then((items) => res.json(items));
});

//@route POST api/items
//@desc create item
//@access public
router.post('/', (req, res) => {
  const newItem = new Item({
    id: req.body.id,
    name: req.body.name,
    type: req.body.type,
  });

  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items/:id
//@desc delete item
//@access public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
