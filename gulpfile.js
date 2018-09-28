var gulp=require("gulp");//引入gulp
var htmlmin=require("gulp-htmlmin");//压缩html
var cssmin=require("gulp-clean-css");//压缩css
var concat=require("gulp-concat");//合并文件
var sass=require("gulp-sass");//编译sass
var rename=require("gulp-rename");//文件重命名
var uglify=require("gulp-uglify");//压缩、混淆js
var imagemin=require("gulp-imagemin");//压缩图片文件
var base64=require("gulp-base64");//图片转码
var inject=require("gulp-inject");//文件路径注入

gulp.task("css",function(){
	gulp.src(["./src/css/sdsb.css","./src/css/jituan.css","./src/css/xinwen.css","./src/css/pinpai.css","./src/css/jgxiao.css","./src/css/shenhuo.css","./src/css/swiper.min.css"])
		.pipe(cssmin())
		.pipe(concat("all.css"))
		.pipe(base64())
		.pipe(gulp.dest("./dist/css"));
});
gulp.task("scss",function(){
	gulp.src("./src/sass/*.scss")
		.pipe(concat("all.scss"))
		.pipe(sass())
		.pipe(rename("all-scss.css"))
		.pipe(cssmin())
		.pipe(gulp.dest("./dist/css"));
});
gulp.task("javascript",function(){
	gulp.src(["./src/js/main.js","./src/js/jquery.min.js","./src/js/pagination.js","./src/js/require.js","./src/js/swiper.min.js","./src/js/pagination.min.js"])
		.pipe(concat("all.js"))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"));
});
gulp.task("image",function(){
	gulp.src("./src/images/**/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./dist/images"));
});
gulp.task("html",["css","javascript"],function(){
	gulp.src("./src/html/**/*")
		.pipe(gulp.dest("./dist"))
	gulp.src("./src/html/**/*")
		.pipe(gulp.dest("./dist/html"));
});

gulp.task("inject",["html"],function(){
	gulp.src("./dist/html/**/*")
		.pipe(inject(gulp.src(["./dist/css/all.css","./dist/js/all.js"]),{relative:true}))
		.pipe(gulp.dest("./dist"))
		
	gulp.src("./dist/html/**/*")
		.pipe(inject(gulp.src(["./dist/css/all.css","./dist/js/all.js"]),{relative:true}))
		.pipe(gulp.dest("./dist/html"));
});
gulp.task("watch",function(){
	gulp.watch("./src/css/**/*",["css"]);
	gulp.watch("./src/js/**/*",["javascript"]);
});
gulp.task("default",["image","inject","watch"]);