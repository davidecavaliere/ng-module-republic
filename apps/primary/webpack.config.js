const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('../../package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:4202/',
    uniqueName: 'primary',
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'primary',
      library: { type: 'var', name: 'primary' },
      filename: 'remoteEntry.js',
      exposes: {
        './Primary': './apps/primary/src/app/primary/primary.component.ts'
      },
      shared: {
        '@angular/core': { eager: true, singleton: true, requiredVersion: deps['@angular/core'] },
        '@angular/common': { eager: true, singleton: true, requiredVersion: deps['@angular/common'] },
        '@angular/router': { eager: true, singleton: true, requiredVersion: deps['@angular/router'] },
      },
    }),
  ],
};
