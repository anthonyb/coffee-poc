"use strict"

const Promise = require('promise');

const ProductType = require('../models/product_type');
const Flavor = require('../models/flavor');
const Pod = require('../models/pod');
const Machine = require('../models/machine');

const product_types_fixtures = require('../fixtures/product_types');
const flavors_fixtures = require('../fixtures/flavors');
const pods_fixtures = require('../fixtures/pods');
const machines_fixtures = require('../fixtures/machines');

const product_type_hash = {};
const flavors_hash = {};

createProductTypes()
  .then(createFlavors())
  .then(createPods())
  .then(createMachines())

function createProductTypes(){
  return new Promise((resolve, reject) => {
    for(let type of product_types_fixtures){
      let newType = new ProductType({title:type});
      newType.save();
      product_type_hash[(type.toLowerCase())] = newType;
    }
    resolve();
  });
}

function createFlavors(){
  return new Promise((resolve, reject) => {
    for(let flavor of flavors_fixtures){
      let newFlavor = new Flavor({title:flavor});
      newFlavor.save();
      flavors_hash[(flavor.toLowerCase())] = newFlavor;
    }
    resolve();
  });
}

function createPods(){
  return new Promise((resolve, reject) => {
    for(let pod of pods_fixtures){
      let newPod = new Pod(
        {
          sku: pod.sku,
          title: pod.title,
          product_type: product_type_hash[(pod.product_type.toLowerCase())],
          size: pod.size,
          flavor: flavors_hash[(pod.flavor.toLowerCase())]
        }
      );
      newPod.save();
    }
    resolve();
  });
}

function createMachines(){
  return new Promise((resolve, reject) => {
    for(let machine of machines_fixtures){
      let newMachine = new Machine(
        {
          sku: machine.sku,
          title: machine.title,
          product_type: product_type_hash[(pod.product_type.toLowerCase())],
          size: pod.size,
          flavor: flavors_hash[(pod.flavor.toLowerCase())]
        }
      );
      newMachine.save();
    }
    resolve();
  });
}
