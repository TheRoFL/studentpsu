this.tooltip = function(){	
	xOffset = 10;
	yOffset = 20;		
	// these 2 variable determine popup's distance from the cursor
	// you might want to adjust to get the right result		
    
    function getDx(pageX) {
        var dx=0;
        var box = $("#tooltip");
        
        var width = box.css("width");
        if (width!=undefined) {
            var boxWidth = width.replace("px","")*1;
            var bodyWidth = document.body.clientWidth;
            
            if ( (boxWidth + pageX + yOffset) > bodyWidth )
                dx=-2*yOffset-boxWidth;
        }
        
        return dx;
    }
    
    function getDy(pageY) {
        var dy=0;
        var box = $("#tooltip");
        
        var height = box.css("height");
        if (height!=undefined) {
            var boxHeight = height.replace("px","")*1;
            var bodyHeight = document.body.clientHeight;
            
            if ( (boxHeight + (pageY-document.body.scrollTop) + xOffset) > bodyHeight )
                dy=-2*xOffset-boxHeight;
        }
        
        return dy;
    }

	$(".tooltip").live('mouseover mouseout',function(e){
        if (e.type=='mouseover') {
			if (this.title)
			{
				this.t = this.title;
				this.title = "";
				$("body").append("<div id='tooltip'>"+ this.t +"</div>");
				$("#tooltip")
					.css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
					.css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px")
					.fadeIn("fast");
			}
        }

        if (e.type=='mouseout') {
			this.title = this.t;		
			$("#tooltip").remove();
        }
    })
    .live("hover mousemove",function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
			.css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px");
	});
	
	$(".betterTooltip").live('click mouseout',function(e){
        if (e.type=='click') {
            this.t = $(this).data("title");            
                
            $("body").append("<div id='tooltip'>"+ this.t +"</div>");
            $("#tooltip")
                .css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
                .css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px")
                .fadeIn("fast");
        }

        if (e.type=='mouseout') {
            $("#tooltip").remove();
        }
    })
    .live("hover mousemove",function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
			.css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px");
	});
	
	$(".superBetterTooltip").live('click mouseout',function(e){
        if (e.type=='click') {
            this.t = $(this).data("title");            
                
            $("body").append("<div id='tooltip'>"+ this.t +"</div>");
			$("#tooltip").html("<img src='/etis/pic/loading19.gif' title='Обновление' alt='Обновление'>");
			$("#tooltip").load($(this).data("url"));
            $("#tooltip")
                .css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
                .css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px")
                .fadeIn("fast");
        }

        if (e.type=='mouseout') {
            $("#tooltip").remove();
        }
    })
    .live("hover mousemove",function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset + getDy(e.pageY)) + "px")
			.css("left",(e.pageX + yOffset + getDx(e.pageX)) + "px");
	});
};

// starting the script on page load
$(document).ready(function(){
	tooltip();
});