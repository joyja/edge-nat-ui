module.exports = {
  apps: [
    {
      name: 'edge-nat-ui',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: 'localhost',
      ref: 'origin/main',
      repo: 'https://github.com/joyja/edge-nat-ui.git',
      path: '/usr/local/bin/edge-nat-ui',
      'post-deploy':
        'npm install && npm run build && sudo pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
}
