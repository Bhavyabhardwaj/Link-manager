module.exports = {
  apps: [{
    name: 'linkmanager-api',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: 'logs/err.log',
    out_file: 'logs/out.log',
    log_file: 'logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    watch: false,
    ignore_watch: [
      'node_modules',
      'logs',
      '.git'
    ],
    // Auto restart on file changes in production (disabled)
    watch_options: {
      followSymlinks: false
    },
    // Graceful shutdown
    kill_timeout: 5000,
    // Health check
    health_check_grace_period: 3000,
    // Auto restart settings
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
