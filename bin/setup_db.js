"use strict"

const mongoose = require('mongoose');
const connection = mongoose.connection;


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

//NOTICE: This will destroy all objects and then rebuild them!

connection.on('error', console.error);
connection.once('open', () => {
  console.log("Ready!");
  createProductTypes()
    .then(createFlavors())
    .then(createPods())
    .then(createMachines())
});
mongoose.connect('mongodb://localhost/coffee-challenge');

function createProductTypes(){
  //first flush
  ProductType.remove({},()=>{});

  return new Promise((resolve, reject) => {
    for(let type of product_types_fixtures){
      let newType = new ProductType({title:type});
      newType.save();
      product_type_hash[(type.toLowerCase())] = newType;

      console.log(`Created Product Type :: ${newType}`);
    }
    resolve();
  });
}

function createFlavors(){

  Flavor.remove({},()=>{});

  return new Promise((resolve, reject) => {
    for(let flavor of flavors_fixtures){
      let newFlavor = new Flavor({title:flavor});
      newFlavor.save();
      flavors_hash[(flavor.toLowerCase())] = newFlavor;

      console.log(`Created Flavor :: ${newFlavor}`);
    }
    resolve();
  });
}

function createPods(){

  Pod.remove({},()=>{});

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

      console.log(`Created Pod :: ${newPod}`);
    }
    resolve();
  });
}

function createMachines(){

  Machine.remove({},()=>{});

  return new Promise((resolve, reject) => {
    for(let machine of machines_fixtures){
      let newMachine = new Machine(
        {
          sku: machine.sku,
          title: machine.title,
          product_type: product_type_hash[(machine.product_type.toLowerCase())],
          model: machine.model,
          water_line_compatible: machine.water_line_compatible
        }
      );
      newMachine.save();

      console.log(`Created Machine :: ${newMachine}`);
    }
    resolve();
  });
}
