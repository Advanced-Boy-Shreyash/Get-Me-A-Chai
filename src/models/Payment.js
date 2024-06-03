import mongoose from 'mongoose'

const{Schema, model} = mongoose

const PaymentSchema = new Schema({
    name:{type:String, required:true},
    to_user:{type:String, required:true},
    oid:{type:String, required:true},
    paymentId:{type:String},
    message:{type:String},
    amount:{type:Number, required:true},
    paymentAt: {type:Date, default: Date.now},
    done:{type:Boolean, default:false}
})

export default mongoose.models.Payment || model("Payment",PaymentSchema)