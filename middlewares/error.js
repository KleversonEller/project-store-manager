module.exports = (err, _req, res, _next) => {
    if (err.isJoi) return res.status(400).json({ error: { message: err.details[0].message } });

    if (err.code) {
        const statusByErrorCode = {
          notFound: 404,
          invalidData: 400,
          alreadyExists: 409,
    };

    const status = statusByErrorCode[err.code] || 500;

    return res.status(status).json(err);
    };

    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
};