var express = require('express');
var router = express.Router();
const Machine = require('../models/machine');
const Pod = require('../models/pod');
const getSmallestPerType = require('../models/sort_utilities');

/* GET machine detail listing. */
router.get('/:id', function(req, res, next) {
  Machine.findOne({_id:req.params.id}, (err, machine)=>{
    Pod.find({ product_type: machine.product_type }, (err, related_pods)=>{
      related_pods = getSmallestPerType(related_pods, "flavor");
      res.render('machines/detail', {
        object: machine,
        related_objects: related_pods
      });
    });
  })
});

/* GET machines listing. */
router.get('/', function(req, res, next) {
  Machine.find({}, (err, objects)=>{
    res.render('machines/index', { objects: objects })
  })
});

module.exports = router;
