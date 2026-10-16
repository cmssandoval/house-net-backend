// import camaraModel from '../models/camara.model.js';

const streamHttp = async ( req, res ) => {
    
    req.socket.setTimeout(0); 
    req.socket.setKeepAlive(true, 1000);

    res.writeHead(200, {
        'Content-Type': 'multipart/x-mixed-replace; boundary=frame',
        'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-age=0',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache'
    });
    res.flushHeaders(); 

    const stream = camaraModel.getStream();
    stream.pipe(res);

    req.on('close', () => {
        stream.unpipe(res);
        camaraModel.releaseStream();
    });
};

const camaraController = {
    streamHttp,
};

// export default camaraController;