const Booking = require('../models/Booking');
const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async store(req, res){
        const {spot_id} = req.params;
        const {user_id} = req.headers;
        const {date} = req.body;

        let user = await User.findById(user_id);

        if(!user){ 
            return res.status(400).json({error: "Usuário não Existe!"});
        }

        let spot = await Spot.findById(spot_id);

        if(!spot){ 
            return res.status(400).json({error: "Spot não Existe!"});
        }

        const booking = await Booking.create({
            user : user_id,
            spot: spot_id,
            date
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    },

    async approvals(req, res){
        const {booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');
        

        if(!booking){ 
            return res.status(400).json({error: "Reserva não Existe!"});
        }

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    },

    async rejections(req, res){
        const {booking_id} = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');
        

        if(!booking){ 
            return res.status(400).json({error: "Reserva não Existe!"});
        }

        booking.approved = false;

        await booking.save();
        
        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
}