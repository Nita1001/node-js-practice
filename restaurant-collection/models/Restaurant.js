import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: [true, 'Restaurants name already exists'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    coordinates: {
      type: [Number],
      points: ['lt', 'ln']
    }
  },
  typeOfCuisine: {
    type: String,
    enum: [
      'JAPANESE',
      'THAI',
      'FRENCH',
      'CHINESE',
    ]
  },
  kosher: {
    type: Boolean,
  },
  reviews: {
    type: [{ date: String, score: Number }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware - Create slug from name
// RestaurantSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

export default mongoose.model('Restaurant', RestaurantSchema);