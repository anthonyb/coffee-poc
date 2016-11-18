const express = require('express');
const router = express.Router();

const Machine = require('../models/machine');
const ProductType = require('../models/product_type');
const Pod = require('../models/pod');
const getSmallestPerType = require('../models/sort_utilities');

/* Machines Landing Page */
router.get('/', function(req, res, next) {
  ProductType.find({}, (err, product_types)=>{
    res.render('machines/landing', { product_types: product_types })
  })
});

/* Water Line Compatible */
router.get('/waterline', function(req, res, next) {
  Machine.find({water_line_compatible: true}, (err, machine_list)=>{
    res.render('machines/index', {
      title: "Water Line Compatible",
      machine_list: machine_list
    })
  })
});

/* Filtered by Product Type */
router.get('/type/:product_type_id', function(req, res, next) {
  Machine.find({product_type: req.params.product_type_id}, (err, machine_list)=>{
    res.render('machines/index', {
      title: "Here are the Coffee Machines you selected",
      machine_list: machine_list
    })
  })
});

/* Machine Detail */
router.get('/:id', function(req, res, next) {
  Machine.findOne({_id:req.params.id}, (err, machine)=>{
    Pod.find({ product_type: machine.product_type }, (err, related_pods)=>{
      related_pods = getSmallestPerType(related_pods, "flavor");
      res.render('machines/detail', {
        machine: machine,
        related_objects: related_pods
      });
    });
  })
});


module.exports = router;
