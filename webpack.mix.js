const mix = require('laravel-mix')

if (!mix.inProduction()) {
   mix.webpackConfig({
      module: {
         rules: [
         {
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            test: /\.(js|vue)?$/
         }
         ]
      }
   })
}

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');