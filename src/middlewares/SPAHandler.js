import path from "node:path";

const SPAHandler = ( distPath ) => ( req, res, next ) => {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) return next(err);
    });
};

export default SPAHandler;
