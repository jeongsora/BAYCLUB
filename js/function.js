$(function(){
	var $mnu=$("header>.rgnb>ul>li>a");
	var aniChk=false;
	var arrTopVal=[];
	var nowIdx=0;
	
	$(window).on("load resize",function(){
		$(".video,.landscape,.main,.accomodation,.map").height($(this).height());
		if($(window).width()<=768){
			$(".map").height(500);
		}
		
		offsetTop();
		mouse();
	});
	
	var offsetTop=function(){
		$("section").each(function(idx){
			arrTopVal[idx]=$(this).offset().top;
			//console.log(arrTopVal);
			
		});
	};
	
	
	
	var pageAni=function(topVal){
		aniChk=true;
		$("html,body").stop().animate({
			"scrollTop":topVal
		},function(){
			aniChk=false;
		});
		
	};	
	
	$mnu.click(function(evt){
		evt.preventDefault();
		nowIdx=$mnu.index(this);
		pageAni(arrTopVal[nowIdx]);
		$("header>.rgnb>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");			
	});
	
	$(window).load(function(){
		pageAni(arrTopVal[nowIdx]);
	});
	
	$(window).scroll(function(){
		var scrollTop=$(window).scrollTop();
		//console.log(scrollTop);
		
		for(var i=0;i<5;i++){
			//스크롤답 값>=아티클요소의 탑 값
			if(scrollTop>=arrTopVal[i]){
			   $mnu.eq(i).parent().addClass("on").siblings().removeClass("on");
			}
		}	
	});
	
	var mouse= function(){
		$(window).on("mousewheel DOMMouseScroll",function(evt){
			if(aniChk==false){
				//console.log("마우스휠 이벤트 발생");
				evt.originalEvent.wheelDelta; //크롬 Up:120(양수), Down:-120(음수)
				evt.originalEvent.detail; //파이어폭스 Up:-3(음수), Down:3(양수)


				if(evt.originalEvent.wheelDelta>0 || evt.originalEvent.detail<0){
					//마우스 휠을 위쪽으로 스크롤
					//console.log("위로");
					if(nowIdx>=0){
						nowIdx--;
					}
					pageAni(arrTopVal[nowIdx]);

				}else{
					//마우스 휠을 아래쪽으로 스크롤
					//console.log("아래로");
					if(nowIdx<=4){
						nowIdx++;
					}
					pageAni(arrTopVal[nowIdx]);
				}
			}
			
		});
	};
	
	/*top*/
	$("footer>.top>a").click(function(evt){
		evt.preventDefault();
		pageAni(arrTopVal[0]);
		nowIdx=0;
	});
	
	$("header>.rgnb>.navigation>ul>li:nth-child(1)").click(function(evt){
		evt.preventDefault();
		if(nowIdx>=0){
			nowIdx--;
		}
		pageAni(arrTopVal[nowIdx]);
	});
	
	$("header>.rgnb>.navigation>ul>li:nth-child(2)").click(function(evt){
		evt.preventDefault();
		if(nowIdx<=4){
			nowIdx++;
		}
		pageAni(arrTopVal[nowIdx]);
	});
	
	$(".scroll_btn>a").click(function(evt){
		evt.preventDefault();
		pageAni(arrTopVal[nowIdx++]);
	});
	
	
	//헤더
	$("header>.gnb_btn>p>a").click(function(evt){
		evt.preventDefault();
		//$("header>.gnb").delay(100).toggleClass("open");
		$("header>.gnb_btn").toggleClass("open");
		if($("header>.gnb_btn").hasClass("open")){
			$("header>.gnb").animate({top:0},700);
		}else{
			$("header>.gnb").animate({top:"-100%"},700);
		}
	});
	
	
	//.landscap
	var btnIdx=0;
	
	$(".landscape>.slides_navigation>ul>li>a").click(function(evt){
		evt.preventDefault();
		btnIdx=$(this).parent().index();
		$(".landscape>.slides>ul>li").eq(btnIdx).stop().fadeOut(1000).siblings().stop().fadeIn(1000);
		$(".landscape>.slides_navigation>ul>li>a").eq(btnIdx).parent().addClass("on").find("span").hide();
		$(".landscape>.slides_navigation>ul>li>a").eq(btnIdx).parent().siblings().removeClass("on").find("span").show();
		
		if($(window).width()<=768){
			$(".landscape>.slides_navigation>ul>li>span").hide();
		}
		
	});
	
	
	
	
	
});

//main
$(function(){
	var nowIdx=0;
	
	//슬라이드
	$(".main>.slides_navigation>ul>li>a").click(function(evt){
		evt.preventDefault();
		nowIdx=$(this).parent().index();	
		console.log(nowIdx);
		$(".main>.slides_2>.slides_container_2").stop().animate({
			left:-110*nowIdx+"%"
		});
		$(".main>.slides_navigation>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");	
		
		/*if($(window).width()<=768){
			$(".main>.slides_2>.slides_container_2").stop().animate({
				left:-100*nowIdx+"%"
			});
		}*/
	});
	
	//이전, 다음 버튼
	$(".main>.slides_pagination>p.prev").click(function(evt){
		evt.preventDefault();
		if(nowIdx>=1){
			nowIdx--; //nowIdx-=1;, nowIdx=nowIdx-1;
		}else{
			nowIdx=9;
		}
		$(".main>.slides_2>.slides_container_2").stop().animate({
			left:-110*nowIdx+"%"
		});
		$(".main>.slides_navigation>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");
	});
	
	$(".main>.slides_pagination>p.next").click(function(evt){
		evt.preventDefault();
		if(nowIdx<=8){
			nowIdx++;
		}else{
			nowIdx=0;
		}
		$(".main>.slides_2>.slides_container_2").stop().animate({
			left:-110*nowIdx+"%"
		});
		$(".main>.slides_navigation>ul>li").eq(nowIdx).addClass("on").siblings().removeClass("on");
	});
	

	
});