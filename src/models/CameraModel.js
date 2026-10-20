// import { spawn } from 'node:child_process';
// import { PassThrough } from 'node:stream';

class CamaraModel {
    constructor(){
        this.ffmpegProcess = null;
        this.sharedStream = new PassThrough();
        this.clientCount = 0;
        this.VIDEO_DEVICE = process.env.CAMERA;
    }

    getStream() {
        this.clientCount++;
        console.log(`Client connected to HTTP stream. Total: ${this.clientCount}`);

        if (!this.ffmpegProcess) {
            this.startFFmpeg();
        }

        return this.sharedStream;
    }

    releaseStream() {
        this.clientCount--;
        console.log(`Client disconnected from HTTP stream. Total: ${this.clientCount}`);

        if (this.clientCount <= 0 && this.ffmpegProcess) {
            this.stopFFmpeg();
        }
    }

    startFFmpeg() {
        console.log('Starting a single instance of FFmpeg...');

        this.ffmpegProcess = spawn('ffmpeg', [
            '-f', 'v4l2',               // Input format
            '-video_size', '1280x720',  // Capture resolution
            '-framerate', '30',         // Frames per second
            '-i', this.VIDEO_DEVICE,    // V4L2 origin device
            
            '-f', 'mpjpeg',             // Output format
            '-q:v', '5',                // Video quality (1:best - 31:worse, CQP)
            '-an',
            'pipe:1'                    // Send out to stdout
        ]);

        this.ffmpegProcess.stderr.on('data', (data) => {
            const log = data.toString();
            if (log.includes('Error') || log.includes('fail') || log.includes('Invalid')) {
                console.error(`[FFmpeg ERROR]: ${log}`);
            } else {
                console.log(`[FFmpeg Info]: ${log.trim()}`);
            }
        });

        this.ffmpegProcess.on('exit', (code, signal) => {
            console.log(`[FFmpeg Process] Exit unexpectedly with code ${code} and signal ${signal}`);
        });

        this.ffmpegProcess.stdout.pipe(this.sharedStream, { end: false });
        
        this.ffmpegProcess.on('error', (err) => {
            console.error('Error in FFmpeg process:', err);
            this.stopFFmpeg();
        });
        
        this.ffmpegProcess.on('close', () => {
            console.log('FFmpeg process ended with normality.');
        });
    }

    stopFFmpeg() {
        if (this.ffmpegProcess) {
            console.log('No activve clients. Turning off FFmpeg...');
            this.ffmpegProcess.kill('SIGINT');
            this.ffmpegProcess = null;
            
            this.sharedStream.removeAllListeners('data');
            this.sharedStream = new PassThrough();
            this.clientCount = 0; 
        }
    }
};

// export default new CamaraModel();