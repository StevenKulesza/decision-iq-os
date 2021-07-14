import FlightController from '../controllers/flight.controller'
import BusinessController from '../controllers/business.controller'

module.exports = (() => {
	let _methods = {

        saveFlight: (req, res, next) => {
            FlightController.save_flight(req.body)
                .then(() => {
                    return res.status(200).json({
                        "message": "Saved flight '" + req.body.name + "'"
                    });
                })
                .catch(err => {
                    if(err === "exists"){
                        return res.status(304).json({
                            "message": "A flight with that name already exist. Use PATCH 'flights/save' to update existing flights."
                        });
                    }
                    return res.status(500).json({
                        'message': 'Could not save flight'
                    });
                });
            
        },
        
        updateFlight: (req, res, next) => {
            
            FlightController.update_flight(req.body)
                .then(() => {
                    return res.status(200).json({
                        "message": "Saved flight '" + req.body.name + "'"
                    });
                })
                .catch(() => {
                    res.status(501).json({
                        'message': 'Could not save flight'
                    });
                });
            
        },

        getSavedFlights: (req, res, next) => {
            
            FlightController.get_all_flights()
                .then(flights => {
                    return res.status(200).json(flights);
                })
                .catch(err => {
                    res.status(404).json({
                        'message': err
                    });
                });
            
        },

        getSavedFlightsList: (req, res, next) => {
            
            FlightController.get_flights_list()
                .then(flights => {
                    return res.status(200).json(flights);
                })
                .catch(err => {
                    res.status(404).json({
                        'message': err
                    });
                });
            
        },

        getSavedFlight: (req, res, next) => {
            FlightController.get_one_flight(decodeURI(req.params.name))
                .then(flight => {
                    return res.status(200).json(flight);
                })
                .catch(err => {
                    res.status(404).json({
                        'message': err
                    });
                });
            
        },
        
        deleteFlight: (req, res) => {
            FlightController.delete_one_flight(decodeURI(req.body.name))
                .then(flight => {
                    return res.status(200).json(flight);
                })
                .catch(err => {
                    res.status(404).json({
                        'message': err
                    });
                });
        },

        publishFlight: (req, res, next) => {
            FlightController.publish_flight(req.body)
                .then(() => {
                    return res.status(200).json({
                        message: 'Flight published successfully.'
                    });
                })
                .catch(err => {
                    res.status(404).json({
                        'message': 'Could not publish flight. Check if product mapping exists.'
                    });
                });
        },
	}

	// return private methods
	return {
		saveFlight: _methods.saveFlight,
		updateFlight: _methods.updateFlight,
		getSavedFlights: _methods.getSavedFlights,
		getSavedFlightsList: _methods.getSavedFlightsList,
		getSavedFlight: _methods.getSavedFlight,
        deleteFlight: _methods.deleteFlight,
        publishFlight: _methods.publishFlight
	}
})();