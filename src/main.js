require('babel-runtime/regenerator')
require('webpack-hot-middleware/client?reload=true') // setup web socket connection
/*what ever files we require from now on, will be part of HMR*/
require('./main.css') // need css loader
require('./index.html') // need html loader
// alert('hi!')
