'use server'

import Razorpay from 'razorpay'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDB'
import User from '@/models/User'

export const initiate = async (amount, to_username, paymentform) => {
  try {
    await connectDB()

    let user = await User.findOne({ username: to_username })

    // Initialize Razorpay Instance 
    var instance = new Razorpay({ key_id: user.razrpayId, key_secret: user.razrpaySecret })
    let options = {
      amount: Number.parseInt(amount),
      currency: "INR"
    }
    // console.log("options",options)

    // Creating Order
    let order = await instance.orders.create(options)
    // console.log("order",order)

    // create a payment object which shows a pending payment in the database
    await Payment.create({
      oid: order.id,
      amount: amount / 100,
      to_user: to_username,
      name: paymentform.name,
      message: paymentform.message
    })
    // console.log("Payment",payment)

    return (order)
  } catch (error) {
    console.error('Error initiating payment:', error);
    throw new Error('Payment initiation failed');
  }
}

export const fetchUser = async (username) => {
  await connectDB()
  let u = await User.findOne({ username: username })
  if (u) {
    let user = u.toObject({ flattenObjectsIds: true })
    // console.log(user)
    return user
  }
  else {
    return false
  }
}

export const fetchUser2 = async (email) => {
  await connectDB()
  let u = await User.findOne({ email: email })
  if (u) {
    let user = u.toObject({ flattenObjectsIds: true })
    // console.log(user)
    return user
  }
  else {
    return false
  }
}

const totalRaisedAmount = async (usernames) => {
  try {
    // Aggregate payments to get the total amount received by each user
    const payments = await Payment.aggregate([
      {
        $match: { to_user: { $in: usernames } }
      },
      {
        $group: {
          _id: '$to_user', // Group by username (to_user)
          totalAmount: { $sum: '$amount' } // Sum the amounts
        }
      }
    ]);

    // console.log("payments", payments)

    // Create a map to track totalAmount for each user
    const userPaymentsMap = new Map();
    payments.forEach(payment => {
      userPaymentsMap.set(payment._id, payment.totalAmount);
    });

    return userPaymentsMap;
  } catch (error) {
    console.error('Error calculating total raised amount:', error);
    return new Map();
  }
};

export const fetchTopUsers = async () => {
  await connectDB();

  try {
    // Get all usernames
    const users = await User.find({});
    const usernames = users.map(user => user.username);

    // Get total raised amounts for each user
    const userPaymentsMap = await totalRaisedAmount(usernames);

    // Merge user details with their total payments
    const usersWithPayments = users.map(user => {
      const totalAmount = userPaymentsMap.get(user.username) || 0;
      return {
        ...user.toObject(),
        raisedFunds: totalAmount
      };
    });

    // Sort users by raised funds in descending order
    const sortedUsers = usersWithPayments.sort((a, b) => b.raisedFunds - a.raisedFunds);

    // Take the top 10 users
    const topUsers = sortedUsers.slice(0, 10);

    return topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return [];
  }
};

export const searchUser = async (searchTerm) => {
  await connectDB();

  try {
    // Case-insensitive regex for matching username or name
    const regex = new RegExp(searchTerm.trim(), 'i');

    // Search for users based on username or name
    const users = await User.find({
      $or: [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
        { project: { $regex: regex } }
      ]
    });

    // Get the usernames of the found users
    const usernames = users.map(user => user.username);

    // Get total raised amounts for each user
    const userPaymentsMap = await totalRaisedAmount(usernames);

    // Merge user details with their total payments
    const usersWithPayments = users.map(user => {
      const totalAmount = userPaymentsMap.get(user.username) || 0;
      return {
        ...user.toObject(),
        raisedFunds: totalAmount
      };
    });

    return usersWithPayments;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};

export const fetchPayments = async (username) => {
  await connectDB()
  // payments in decreasing order of amount
  let receivedPayments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
  return receivedPayments
}

export const updateUser = async (newData, oldUsername) => {
  try {
    await connectDB()
    // console.log("data",data)

    // let newData = data
    // console.log("newData", newData)

    if (oldUsername !== newData.username) {
      let usernameExist = await User.findOne({ username: newData.username })
      if (usernameExist) {
        return { error: "Username already exists" }
      }
    }

    // Update user data
    await User.updateOne({ email: newData.email }, newData)
    // Update username in Payments
    await Payment.updateMany({ to_user: oldUsername }, { to_user: newData.username })
    return { success: true }
  } catch (error) {
    console.error("Error updating Profile :", error)
    return error
  }
}