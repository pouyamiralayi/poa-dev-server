const path = require('path')
module.exports = {
    entry:{
        main:'./src/main.js'
    },
    mode:'development',
    output:{
        filename:'[name]-bundle.js',
        path:path.resolve(__dirname,'../dist'),
        publicPath:'/' // when we want to specify assets and files, this is the path we point to. see dist/index.html script tag src for more details.

    },
    devServer:{
        contentBase: 'dist', // when we run webpack dev server, everything will be served from dist.
    }
}
