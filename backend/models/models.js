import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  image: { type: String, required: true },
  link: { type: String, required: true },
  sold: { type: Boolean, default: false, required: true },
  averageBuyPrice: { type: Number, default: 0, min: 0 },
  averageBuyPriceLeft: { type: Number, default: 0, min: 0 },
  avarageSellPirce: { type: Number, default: 0, min: 0 },
  currentlyAvaliable: { type: Number, default: 0, min: 0 },
  sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
  amountSold: { type: Number, default: 0 },
  active: { type: Boolean, required: true, default: true },
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
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SaleProductSchema' }],
  amount: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  type: { type: String, required: true, enum: ["OLX Nova", "Ukr Nova", "Nova", "Ukr", "Meeting", "Other", "Unknown"], default: "Unknown" },
  status: { type: String, required: true, enum: ["Awaiting", "Sent", "Approved", "Declined"], default: "Awaiting" },
}, { timestamps: true })

const SaleProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  amount: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true, min: 0 },
}, { timestamps: true })

const BuySchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BuyProduct' }],
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, required: true, enum: ["pending", "arrived"], default: "pending" },
}, { timestamps: true })

const BuyProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  amount: { type: Number, default: 1, min: 1 },
  price: { type: Number, required: true, min: 0 },
  amountInOne: { type: Number, default: 1 },
  sold: { type: Number, default: 0, min: 0 },
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, min: [3, 'Name is too short'], max: [16, 'Name is too long'] },
  password: { type: String, required: true, min: [6, 'Password is too short'], max: [16, 'Password is too long'] },
})

const ActionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["buy", "sell"],
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    previousAction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
      default: null,
    },
    undone: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const Type = mongoose.model('Type', TypeSchema);
const Sale = mongoose.model('Sale', SaleSchema);
const SaleProduct = mongoose.model('SaleProduct', SaleProductSchema);
const Buy = mongoose.model('Buy', BuySchema);
const BuyProduct = mongoose.model('BuyProduct', BuyProductSchema);
const Action = mongoose.model('Action', ActionSchema);
const User = mongoose.model('User', UserSchema)

export { Product, Brand, Type, Sale, SaleProduct, Buy, BuyProduct, Action, User }