module.exports = {
    apps: [
        {
            name: 'backend-house-net',
            script: './src/index.js',
            instances: 'max',
            exec_mode: 'cluster',
            watch: false,
            max_memory_restart: '2G',
            env_file: '.env',
        }
    ]
};