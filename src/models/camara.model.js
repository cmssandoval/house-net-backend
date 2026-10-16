import { spawn } from 'node:child_process';
import { PassThrough } from 'node:stream';

class CamaraModel {
    constructor(){
        this.ffmpegProcess = null;
        this.sharedStream = new PassThrough();
        this.clientCount = 0;
        this.VIDEO_DEVICE = process.env.CAMERA;
    }

    getStream() {
        this.clientCount++;
        console.log(`Cliente conectado al stream HTTP. Total: ${this.clientCount}`);

        if (!this.ffmpegProcess) {
            this.startFFmpeg();
        }

        return this.sharedStream;
    }

    releaseStream() {
        this.clientCount--;
        console.log(`Cliente desconectado al stream HTTP. Total: ${this.clientCount}`);

        if (this.clientCount <= 0 && this.ffmpegProcess) {
            this.stopFFmpeg();
        }
    }

    startFFmpeg() {
        console.log('Iniciando instancia única de FFmpeg...');

        this.ffmpegProcess = spawn('ffmpeg', [
            '-f', 'v4l2',               // Formato de entrada
            '-pixel_format', 'yuyv422',
            '-video_size', '1280x720',  // Resolución de captura
            '-framerate', '30',         // Fotogramas por segundo (ajusta según tu cámara)
            '-i', this.VIDEO_DEVICE,    // Dispositivo V4L2 origen
            '-f', 'mpjpeg',             // Formato de salida (Motion JPEG para multipart)
            '-q:v', '5',                // Calidad de video (1-31, donde menor es mejor calidad)
            'pipe:1'                    // Enviar salida a stdout
        ]);
        
        this.ffmpegProcess.stderr.on('data', (data) => {
            console.log(`[FFmpeg Debug]: ${data.toString()}`);
        });

        this.ffmpegProcess.stdout.pipe(this.sharedStream, { end: false });
        
        this.ffmpegProcess.on('error', (err) => {
            console.error('Error en proceso FFmpeg:', err);
            this.stopFFmpeg();
        });
        
        this.ffmpegProcess.on('close', () => {
            console.log('Proceso FFmpeg terminado con normalidad.');
        });
    }

    stopFFmpeg() {
        if (this.ffmpegProcess) {
            console.log('No quedan clientes activos. Apagando FFmpeg...');
            this.ffmpegProcess.kill('SIGINT');
            this.ffmpegProcess = null;
            
            this.sharedStream.removeAllListeners('data');
            this.sharedStream = new PassThrough();
            this.clientCount = 0; 
        }
    }
};

export default new CamaraModel();