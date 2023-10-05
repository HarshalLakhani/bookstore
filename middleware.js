const checkMissingData = (req, res, next) => {
    const { title, author, category, publicationYear , price,quantity,description,imageUrl} = req.body;
    if (!title || !author || !category || !publicationYear || !price || !quantity|| !description|| !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

module.exports = checkMissingData;