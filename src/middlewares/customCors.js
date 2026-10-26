const customCors = ((req, res, next) => {
    //* Please configure mindfully when using multiple origins
    //? Delete if you prefer to use the cors package

    res.header('Access-Control-Allow-Origin', '');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

export default customCors;