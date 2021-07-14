import express from 'express'
import mongoose from 'mongoose'
import axios from 'axios'

import * as utils from '../lib/utils'

// models
import Flight from '../models/flight.model'
import Business from '../models/business.model'

// save flight
exports.save_flight = function (data) {
  return new Promise(function (resolve, reject) {
    Flight.find({ name: data.name })
      .exec()
      .then(files => {
        if (files.length >= 1) {
          reject('exists');
        } else {
          //create a new flight
          const newFlight = new Flight({
            _id: new mongoose.Types.ObjectId(),
            name: data.name,
            data: data.data
          });

          //save the user to the database
          newFlight
            .save()
            .then(result => {
              console.log('Flight created');
              resolve(newFlight);
            })
            .catch(reject);
        }
      })
      .catch(reject);
  })
}

// update flight
exports.update_flight = function (data) {
  return new Promise(function (resolve, reject) {
    Flight.update(
      { name: data.name },  //query
      { data: data.data },  //data
      { upsert: true }      //options
    )
      .then(files => {
        resolve();
      })
      .catch(reject);
  })
}

//get all flights
exports.get_all_flights = function () {
  return new Promise(function (resolve, reject) {
    Flight.find({})
      .exec()
      .then(flights => {
        resolve(flights);
      })
      .catch(err => reject(err));
  });
}

//get flight list
exports.get_flights_list = function () {
  return this.get_all_flights()
    .then(flights => {
      var list = [];
      flights.map((flight, index) => {
        list.push({
          "name": flight.name,
          "type": flight.data.name,
          "lastModified": "2018-12-01"
        })
      });
      return list;
    });
}

//get one flight
exports.get_one_flight = function (flightName) {
  return new Promise(function (resolve, reject) {
    Flight.findOne({ 'name': flightName })
      .exec()
      .then(flight => {
        if (flight == null) {
          reject('No flight "' + flightName + '" found');
        }
        resolve(flight);
      })
      .catch(err => reject(err));
  });
}

//delete one flight
exports.delete_one_flight = function (flightName) {
  return new Promise(function (resolve, reject) {
    Flight.remove({
      'name': flightName
    })
      .exec()
      .then(result => {
        if (result >= 1) {
          resolve('Flight deleted');
        } else {
          reject('Flight not found. No Flight deleted');
        }
      })
      .catch(err => reject(err));
  });
}

// publish flight
exports.publish_flight = function (data) {
  let apiUrl;
  let apiToken

  // keys to remove from state object.
  let filterableKeys = ['label', 'autoSelect', 'size', 'type', 'options'];

  //prepare the audience from the state object
  data.audienceObj.audience = '';
  data.audienceObj = filterNestObject(data.audienceObj, filterableKeys);

  return new Promise(function (resolve, reject) {
    Business.findOne({
        'businessName': data.businessName
      })
      .exec()
      .then(business => {
        if (business == null) {
          reject('No business "' + data.businessName + '" found');
        }

        for (let i in business.api) {
          if (business.api[i].name === 'publish') {
            apiUrl = business.api[i].url;
            apiToken = business.api[i].token;
          }
        }

        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-api-key": apiToken
        }
        axios.post(apiUrl, data, {
            headers: headers
          })
          .then(response => resolve(response))
          .catch(error => reject(error));

      })
      .catch(err => reject(err));
  })
}

function filterNestObject(item, keysToRemove) {
  if (Object(item) !== item) {
    return item;
  }

  if (Array.isArray(item)) {
    return item.map(o => filterNestObject(o, keysToRemove));
  }

  return Object.keys(item)
    .filter(key => !keysToRemove.includes(key))
    .reduce((object, key) => {
      return {
        ...object,
        [key]: (Object(item[key]) === item[key]) ? filterNestObject(item[key], keysToRemove) : item[key]
      };
    }, {})
}