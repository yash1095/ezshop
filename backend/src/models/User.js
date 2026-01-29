import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  cartItems: [
    {
      productId: String,
      quantity: {
        type: Number,
        default: 1
      },
      totalPrice: Number
    }
  ],
  wishlistItems: [String]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
