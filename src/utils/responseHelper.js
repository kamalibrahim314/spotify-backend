const successResponse = (res, data = {}, message = '', arabicMessage = '', statusCode = 200, cacheDuration = null) => {
    const response = {
        success: true,
        message,
        arabicMessage,
        data
    };

    if (cacheDuration) {
        res.set('Cache-Control', `public, max-age=${cacheDuration}`);
    }

    return res.status(statusCode).json(response);
};

const errorResponse = (res, message = '', arabicMessage = '', statusCode = 500, errors = null) => {
    const response = {
        success: false,
        message,
        arabicMessage
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

const paginatedResponse = (res, data, pagination, message = '', arabicMessage = '', statusCode = 200) => {
    return successResponse(res, { items: data, pagination }, message, arabicMessage, statusCode);
};

module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse
};