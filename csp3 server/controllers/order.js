const Cart = require("../models/Cart");
const Order = require("../models/Order");

// [SECTION] Create Order
module.exports.checkout = (req, res) => {
    const userId = req.user.id;

    // Find the user's cart
    Cart.findOne({ userId })
        .then(cart => {
            // If no cart is found, send a message to the client
            if (!cart) {
                return res.status(404).send({ error: 'Cart not found' });
            }

            // Check if the cart contains any items
            if (cart.cartItems.length === 0) {
                return res.status(400).send({ error: 'Cart is empty' });
            }

            // Create a new order document
            const newOrder = new Order({
                userId: userId,
                productsOrdered: cart.cartItems,
                totalPrice: cart.totalPrice
            });

            // Save the order document
            return newOrder.save()
                .then(order => {
                    // Send a message to the client along with the order details
                    return res.status(200).send({ message: 'Order created successfully', order });
                });
        })
        .catch(err => {
            // Send a message to the client along with the error details
            console.error('Error creating order:', err);
            return res.status(500).send({ error: 'Failed to create order' });
        });
};

// [SECTION] Retrieve Logged In User's Orders 
module.exports.getOrders = (req, res) => {
    return Order.find({userId : req.user.id})
        .then(orders => {
            if (!orders) {
                return res.status(404).send({ error: 'No orders found' });
            }
            return res.status(200).send({ orders });
        })
        .catch(err => {
            console.error("Error in fetching orders")
            return res.status(500).send({ error: 'Failed to fetch orders' })
        });
    };
    
// [SECTION] Retrieve All Orders
module.exports.getAllOrders = (req, res) => {
    // Fetch all orders from the database
    Order.find()
        .then(orders => {
            res.status(200).send({ orders });
        })
        .catch(err => {
            console.error('Error retrieving all orders:', err);
            res.status(500).send({ error: 'Failed to retrieve all orders' });
        });
};