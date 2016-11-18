const express = require('express');
const router = express.Router();

const Machine = require('../models/machine');
const ProductType = require('../models/product_type');
const PackSize = require('../models/pack_size');
const Flavor = require('../models/flavor');
const Pod = require('../models/pod');
const getSmallestPerType = require('../models/sort_utilities');

/* Landing Page */
router.get('/', function(req, res, next) {
  //this is as much nesting as should ever happen
  PackSize.find({}, (err, pack_size_list)=>{
    Flavor.find({}, (err, flavor_list)=>{
      ProductType.find({}, (err, product_types)=>{
        res.render('pods/landing', {
          product_types: product_types,
          pack_size_list: pack_size_list,
          flavor_list: flavor_list
        })
      });
    });
  });
});

/* Filtered by Product Type */
router.get('/type/:product_type_id', function(req, res, next) {
  Pod.find({product_type: req.params.product_type_id}, (err, pods_list)=>{
    res.render('pods/index', {
      title: "Here are the Pods of that Type",
      pods_list: pods_list
    })
  })
});

/* Filtered by Flavor */
router.get('/flavor/:flavor_id', function(req, res, next) {
  Pod.find({flavor: req.params.flavor_id}, (err, pods_list)=>{
    pods_list = getSmallestPerType(pods_list, "product_type");
    res.render('pods/index', {
      title: "Here are the Pods for that Flavor",
      pods_list: pods_list
    })
  })
});

/* Filtered by Pack Size */
router.get('/size/:pack_size_id', function(req, res, next) {
  Pod.find({pack_size: req.params.pack_size_id}, (err, pods_list)=>{
    res.render('pods/index', {
      title: "Here are the Pods of that Size",
      pods_list: pods_list
    })
  })
});

module.exports = router;
