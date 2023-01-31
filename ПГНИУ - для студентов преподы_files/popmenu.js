var pref="null", suff="null", xx = "null", yy = "null";
var mx = "null", my = "null", now="null", tid, sx;

if ( document.getElementById )
{pref="document.getElementById('";suff="').style";xx=".pixelLeft";yy=".pixelTop";}
else if( document.all ) 
{
/*if (navigator.appName == "Netscape")
  {pref="document.layers['";suff="']";xx=".left";yy=".top";}
else
  {*/
  pref="document.all.item('";suff="').style";xx=".pixelLeft";yy=".pixelTop";
  /*}*/
}


function hideall(){ if (now!="null") {eval(pref+'l'+now+suff+'.display="none"');
                                      eval(pref+'l'+now+suff+'.visibility="hidden"'); }}
function hide(who){ if (who!="null") {eval(pref+'l'+who+suff+'.display="none"');
                                      eval(pref+'l'+who+suff+'.visibility="hidden"');}}
function show(who){
	hide(now);
	hide(who);
	if (tid!=null) {clearTimeout(tid);}
	now=who;
	tid=setTimeout("hideall;",5000);
	eval(pref+'l'+who+suff+'.display="block"');
	eval(pref+'l'+who+suff+'.visibility="visible"');
	if (document.getElementById) {var mDiv=document.getElementById('l'+who);}
	else {var mDiv=document.all('l'+who);}
	//mDiv.style.pixelTop=0;
	mDiv.style.top='0px';
	var divRec=mDiv.getBoundingClientRect();
	var bodyBtm=document.body.getBoundingClientRect().bottom;
	if((divRec.bottom>bodyBtm)&&(divRec.bottom-divRec.top<bodyBtm)){
		//mDiv.style.pixelTop=bodyBtm-divRec.bottom;
		mDiv.style.top='0px';
	}
}
function hiding(){tid=setTimeout("hideall();",200);}
//function ClearTopTime(){if (tid!=null) {clearTimeout(tid);}}
function nover(){if(navigator.appName=="Netscape") clearTimeout(tid);}
function nout(){if(navigator.appName=="Netscape") hiding();}

this.popodiv = function(){	
	xPDOffset = 20;
	yPDOffset = 0;		
	// these 2 variable determine popup's distance from the cursor
	// you might want to adjust to get the right result		
    
    function getDx(pageX) {
        var dx=0;
        var box = $("#popodiv");
        
        var width = box.css("width");
        if (width!=undefined) {
            var boxWidth = width.replace("px","")*1;
            var bodyWidth = document.documentElement.clientWidth;
            if ( (boxWidth + pageX + xPDOffset) > bodyWidth )
                dx=-2*xPDOffset-boxWidth;
        }
        
        return dx;
    }
/*    
    function getDy(pageY) {
        var dy=0;
        var box = $("#popodiv");
        
        var height = box.css("height");
        if (height!=undefined) {
            var boxHeight = height.replace("px","")*1;
            var bodyHeight = document.documentElement.clientHeight; //document.body.clientHeight;
			var bodyScrollTop = (document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop; //document.body.scrollTop;
            if ( (boxHeight + (pageY-bodyScrollTop) + yPDOffset) > bodyHeight )
                dy=-2*yPDOffset-boxHeight;
        }
        
        return dy;
    }
*/	
	function getDy(pageY) {
        var dy=0;
        var box = $("#popodiv");
        
        var height = box.css("height");
		var top = box.css("top");
        if (height!=undefined) {
            var boxHeight = height.replace("px","")*1;
			var boxTop= top.replace("px","")*1;
            var bodyHeight = document.documentElement.clientHeight; //document.body.clientHeight;
			var bodyScrollTop = (document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop; //document.body.scrollTop;
            /*if ( (boxHeight + (pageY-bodyScrollTop) + yPDOffset) > bodyHeight )
                dy=-2*yPDOffset-boxHeight;*/		
			if ( pageY > (bodyHeight/2+bodyScrollTop) )
                dy=-2*yPDOffset-boxHeight;	
        }
        
        return dy;
    }

	$(".popoDiv").live('click mouseout',function(e){
        if (e.type=='click') {
            this.t = $(this).data("title");            
                
            $("body").append("<div id='popodiv'>"+ this.t +"</div>");
			var top0=$(this).offset().top; //e.pageY //$("#popodiv").css("top").replace("px","")*1;
			var left0=$(this).offset().left;
			$("#popodiv")
                .css("top",($(this).offset().top + yPDOffset + getDy(e.pageY)) + "px")
                .css("left",($(this).offset().left + xPDOffset + getDx(e.pageX)) + "px")
                .fadeIn("fast");	
			
			var bodyScrollTop = (document.body.scrollTop)?document.body.scrollTop:document.documentElement.scrollTop; //document.body.scrollTop;
			var bodyHeight = document.documentElement.clientHeight; //document.body.clientHeight;
			var boxTop=$("#popodiv").css("top").replace("px","")*1;
			var boxHeight=$("#popodiv").css("height").replace("px","")*1;
			//console_log("boxTop="+boxTop+" top0="+top0);
			if (top0 > boxTop)
			{	
				//открывается вверх
				//console_log("UP bodyScrollTop = "+bodyScrollTop);
				if (bodyScrollTop - 2 > boxTop)
				{					
					$("#popodiv").css("height",(boxHeight-(bodyScrollTop-boxTop)) + "px");
					$("#popodiv").css("top",bodyScrollTop + "px");
					$("#popodiv").css("overflow-y","auto");
					
					if ( left0 > $("#popodiv").offset().left )
					{
						//console_log("left0 = "+left0+"	left = "+$("#popodiv").offset().left);					
						$("#popodiv").css("left",($("#popodiv").offset().left-15) + "px");
					}
				}
			}
			else
			{	
				//открывается вниз
				//console_log("DOWN bodyScrollTop+bodyHeight = "+(bodyScrollTop+bodyHeight)+"	boxTop + boxHeight="+(boxTop + boxHeight));
				if ( (bodyScrollTop + bodyHeight) < (boxTop + boxHeight))
				{					
					$("#popodiv").css("height",(boxHeight-6-((boxTop + boxHeight)-(bodyScrollTop + bodyHeight))) + "px");
					$("#popodiv").css("overflow-y","auto");
					
					if ( left0 > $("#popodiv").offset().left )
					{
						//console_log("left0 = "+left0+"	left = "+$("#popodiv").offset().left);					
						$("#popodiv").css("left",($("#popodiv").offset().left-15) + "px");
					}
				}
			}
        }
    })
	
	$(".lazyPopoDiv").live('click mouseout',function(e){
        if (e.type=='click') {
			this.t = $(this).data("title");            
                
            $("body").append("<div id='popodiv'>"+ this.t +"</div>");
			$("#popodiv").html("<img src='/etis/pic/loading19.gif' title='Обновление' alt='Обновление'>");
			if($(this).data("serial")==undefined){
				$("#popodiv").load($(this).data("url"));
			}else{
				$("#popodiv").load($(this).data("url"),$($(this).data("serial")).serializeArray());
			}
            $("#popodiv")
                .css("top",($(this).offset().top + yPDOffset + getDy(e.pageY)) + "px")
                .css("left",($(this).offset().left + xPDOffset + getDx(e.pageX)) + "px")
                .fadeIn("fast");		
        }
    })   
};

// starting the script on page load
$(document).ready(function(){
	popodiv();
	//при любом клике скрываются
	//$("*").click(function(){$("#popodiv").remove();})
	$("body").click(function(){$("#popodiv").remove();})
});