var gulp = require('gulp'),
  	jshint = require('gulp-jshint'), //js规范检查
	sass = require('gulp-sass'), 	//sass文件编译
	concat = require('gulp-concat'), //合并文件
	uglify = require('gulp-uglify'), //压缩js
	rename = require('gulp-rename'), //重命名
	babel = require('gulp-babel'), //es6
	minifyCss = require('gulp-minify-css'), //压缩css为一行
	rev = require('gulp-rev'), //对文件名加MD5后缀
	revCollector = require('gulp-rev-collector'); //路径替换

gulp.task('lint',function(){
	gulp.src('./js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
})

gulp.task('concat',function(){  //创建一个名为concat的task
	gulp.src('./scss/**/*.scss') //需要处理的scss文件，放到一个字符串数组里
		.pipe(concat('all.scss'))  //合并后的文件名
		.pipe(sass()) //sass编译
		.pipe(minifyCss())  //压缩处理成一行
		.pipe(rev())	//文件名加MD5后缀
		.pipe(gulp.dest('./css')) //输出文件本地
		.pipe(rev.manifest()) //生成一个rev-manifest.json
		.pipe(gulp.dest('./rev')); //将rev-manifest.json保存到rev目录内
})
gulp.task('rev',function(){
	gulp.src(['./rev/*.json','index.html'])   //读取rev-manifest.json文件以及需要进行css名替换的文件
		.pipe(revCollector())	//执行文件内css名的替换
		.pipe(gulp.dest('./'));	//替换后的文件输出的目录
})
gulp.task('scripts',function(){
	gulp.src('./js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist'));
})

gulp.task('default',function(){
	gulp.run('lint','concat','rev','scripts');
	gulp.watch('./js/**/*.js',function(){
		gulp.run('lint','concat','rev','scripts');
	})
})