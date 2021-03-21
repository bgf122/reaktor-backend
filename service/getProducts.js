// get all products from mongoDB
exports.getProducts = async (req, res, Data, query) => {
    try {
        const data = await Data.find({ type: query }).exec();
        res.json(data);        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}