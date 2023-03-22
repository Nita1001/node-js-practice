import asyncHandler from "../middleware/asyncHandler.js";
import Restaurant from "../models/Restaurant.js";

// @desc    Get all Restaurants
// @route   GET /api/v1/restaurants
// @access  Public
export const getRestaurants = asyncHandler(async (req, res, next) => {
  // console.log('typeof JSON.parse(req.query.coordinates)', JSON.parse(req.query.coordinates));

  const queryObject = {
    ...(req.query?.cuisine && { typeOfCuisine: req.query.cuisine }),
    ...(req.query?.kosher && {
      kosher: req.query.kosher === "true" ? true : false
    }),
    ...(req.query?.name && { city: req.query.name }),
    ...(req.query?.lat && req.query?.lon && {
      address:
      {
        city: req.query.city,
        street: req.query.street,
        coordinates: [Number(req.query.lat), Number(req.query.lon)]
      }
    }),
    ...(req.query?.address && { address: req.query.address })
  };

  console.log("QueryObject:", queryObject);

  const restaurants = await Restaurant.find(queryObject);
  console.log(restaurants)

  res.status(200).json({
    success: true,
    data: restaurants
  });
});

// @desc    Create a Restaurant
// @route   POST /api/v1/restaurants
// @access  Private
export const createRestaurant = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const restaurant = await Restaurant.create(req.body);

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Get a single Restaurant
// @route   GET /api/v1/restaurants/:id
// @access  Public
export const getRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new Error(`Restaurant with id: ${req.params.id} was not found`));
  }

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Upadte a Restaurant
// @route   PUT /api/v1/restaurants/:id
// @access  Private
export const updateRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!restaurant) {
    return next(
      new Error(
        `Restaurant that end with '${req.params.id.slice(-6)}' not found`
      )
    );
  }

  res.status(200).json({
    success: true,
    data: restaurant
  });
});

// @desc    Delete a Restaurant
// @route   DELETE /api/v1/restaurants/:id
// @access  Private
export const deleteRestaurant = asyncHandler(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) {
    return next(new Error(`restaurant with id: ${req.params.id} not found`));
  }

  res.status(200).json({
    success: true,
    data: restaurant
  });
});
