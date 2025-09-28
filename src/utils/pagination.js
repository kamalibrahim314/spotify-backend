// api/middleware/pagination.js
const paginateResults = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
        pagination: {
            currentPage: page,
            itemsPerPage: limit,
            totalItems: await model.countDocuments().exec(),
            totalPages: Math.ceil(await model.countDocuments().exec() / limit)
        }
    };

    try {
        results.data = await model.find().limit(limit).skip(startIndex).exec();
        res.paginatedResults = results;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = paginateResults;