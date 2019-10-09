const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res){ 
        const {tech} = req.query;
        const spots = await Spot.find({ techs:tech});
        return res.json(spots);
    },

    async store(req, res){
        const {company, price, techs} = req.body;
        const {filename} = req.file;
        const {user_id} = req.headers;

        let user = await User.findById(user_id);

        if(!user){ 
            return res.status(400).json({error: "Usuário não Existe!"});
        }

        const spot = await Spot.create({
            user : user_id,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
        });

        return res.json(spot);
    }
}