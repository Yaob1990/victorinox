module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/victorinox.umd.js',
            label: 'umd.js'
          },
          {
            path: 'dist/victorinox.umd.min.js',
            label: 'umd.min.js'
          }
        ]
      }
    ]
  ]
}
