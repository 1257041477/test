requirejs.config({
	baseUrl:"../js",
	paths:{
		jq:"jquery.min",
		sw:"swiper.min",
	},
	shim:{
		jq:{
			exports:'jQuery'
		},
		sw:{
			deps:["jq"],
			exports:'Swiper'
		},
		
	  }
});

requirejs(["jq","sw"],function($,swiper){
	$(".daohang").subMenu();
	new swiper('.swiper-container', {
		// direction:"vertical",
		grabCursor:true,
		loop: true,
		parallax:true,
		slideToClickedSlide:true,
		pagination: {
		  el: '.swiper-pagination',
		  clickable:true
		},
		navigation: {
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		autoplay:{
			delay:1000,
			disableOnInteraction:false
		}
	});
});