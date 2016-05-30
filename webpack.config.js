var path = require("path");
var webpack = require("webpack");
//var WebpackMd5Hash = require('webpack-md5-hash');
module.exports = {
    cache: true,
    entry: {
        common: "./app/js/common.js",
        //添加要打包在vendors里面的库
        vendor: ['jquery'],
    },
    //no hash
    output: {
        path: path.join(__dirname, "dist"),
        // publicPath: "../dist/",
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].bundle.js"
    },
    module: {
        loaders: [
            // { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
            // required to write "require('./style.css')"
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192" }, // inline base64 URLs for <=8k images, direct URLs for the rest

            // required for bootstrap icons
            { test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader?prefix=font/" },
            { test: /\.eot$/, loader: "file-loader?prefix=font/" },
            { test: /\.svg$/, loader: "file-loader?prefix=font/" },

            // required for react jsx
            { test: /\.js$/, loader: "jsx-loader" },
            { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM" },
            //{ test: require.resolve("./app/js/jquery-1.9.1.js"),  loader: "exports?jquery"}
        ]
    },
    resolve: {
        alias: {
            // Bind version of jquery
            jquery: "jquery-2.0.3",
            //"jquery": "jquery-1.9.1"
                // Bind version of jquery-ui
                //"jquery-ui": "jquery-ui-1.10.3",

            // jquery-ui doesn't contain a index file
            // bind module to the complete module
            //"jquery-ui-1.10.3$": "jquery-ui-1.10.3/ui/jquery-ui.js",
        }
    },
    plugins: [
            // This plugin makes a module available as variable in every module.The module is required only
            // if you use the variable.
            // Example: Make $ and jQuery available in every module without writing require("jquery").
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery" //,
                //"window.jQuery": "jquery"
            }),
            //new WebpackMd5Hash(),
            function() {
                this.plugin("done", function(stats) {
                    require("fs").writeFileSync(
                        path.join(__dirname, "./", "stats.json"),
                        JSON.stringify(stats.toJson()));
                    // fs.readFile('./index.html', (err, data) => {
                    //     const $ = cheerio.load(data.toString());
                    //     $('script[src*=dest]').attr('src', 'dest/bundle.' + stats.hash + '.js');
                    //     fs.write('./index.html', $.html(), err => {
                    //         !err && console.log('Set has success: ' + stats.hash)
                    //     })
                    // });
                });
            },
            // //这个使用uglifyJs压缩你的js代码
            // new webpack.optimize.UglifyJsPlugin({ minimize: true }),    
            // //把入口文件里面的数组打包成verdors.js
            //new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')  
            // new webpack.optimize.CommonsChunkPlugin({
            //     names: ["commonTools"],
            //     minChunks: Infinity
            // })  
            new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor.js', /* filename= */'./dist/vendor.js') //这是第三方库打包生成的文件 
            //new HtmlwebpackPlugin({     title: 'Hello World app'   })
        ] //,
        // resolve: {
        //     // 现在可以写 require('file') 代替 require('file.coffee')
        //     extensions: ['', '.js', '.json', '.coffee']
        // }
};
