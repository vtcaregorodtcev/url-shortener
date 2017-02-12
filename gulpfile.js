var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('server', function() {
    nodemon({
        exec: 'node --debug',
        ext: 'js',
        script: 'server.js',
        env: {
            'NODE_ENV': 'development',
            'PORT': 3000,
            'MONGO_CONNECTION': 'mongodb://admin:admin@ds149479.mlab.com:49479/urlshortener'
        }
    });
});

gulp.task('default', ['server']);