import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  image: { type: String, required: true },
  link: { type: String, required: true },
  isOnSale: { type: Boolean, default: true, required: true },
  averageBuyPrice: { type: Number, default: 0, min: 0, required: true },
  averageBuyPriceLeft: { type: Number, default: 0, min: 0, required: true },
  averageSellPrice: { type: Number, default: 0, min: 0, required: true },
  currentlyAvaliable: { type: Number, default: 0, min: 0, required: true },
  amountSold: { type: Number, default: 0, required: true },
  views: [{
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 }
  }],
}, { timestamps: true })

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true })

const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true })

const SaleSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SaleProduct' }],
  amount: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true, enum: ["OLX Nova", "OLX Ukr", "Nova", "Ukr", "Meeting", "Other", "Unknown"], default: "Unknown" },
  status: { type: String, required: true, enum: ["Awaiting", "Sent", "Approved", "Declined"], default: "Awaiting" },
}, { timestamps: true })

const SaleProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  averageBuyPrice: { type: Number, default: 0, min: 0, required: true },
  amount: { type: Number, default: 1, min: 1, required: true },
  price: { type: Number, required: true, min: 0, required: true },
}, { timestamps: true })

const BuySchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BuyProduct' }],
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, required: true, enum: ["pending", "arrived"], default: "pending" },
}, { timestamps: true })

const BuyProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: { type: Number, default: 1, min: 1, required: true },
  price: { type: Number, required: true, min: 0 },
  amountInOne: { type: Number, default: 1, required: true },
  sold: { type: Number, default: 0, min: 0, required: true },
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, min: [3, 'Name is too short'], max: [16, 'Name is too long'] },
  password: { type: String, required: true, min: [6, 'Password is too short'], max: [16, 'Password is too long'] },
})

const Product = mongoose.model('Product', ProductSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const Type = mongoose.model('Type', TypeSchema);
const Sale = mongoose.model('Sale', SaleSchema);
const SaleProduct = mongoose.model('SaleProduct', SaleProductSchema);
const Buy = mongoose.model('Buy', BuySchema);
const BuyProduct = mongoose.model('BuyProduct', BuyProductSchema);
const User = mongoose.model('User', UserSchema)

export { Product, Brand, Type, Sale, SaleProduct, Buy, BuyProduct, User }