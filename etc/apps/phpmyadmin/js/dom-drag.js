var Drag={
    obj:null,
    init:function(b,a,c,d,g,e,f,j,h,i){
        b.onmousedown=Drag.start;
        b.hmode=f?false:true;
        b.vmode=j?false:true;
        b.root=a&&a!=null?a:b;
        if(b.hmode&&isNaN(parseInt(b.root.style.left)))b.root.style.left="0px";
        if(b.vmode&&isNaN(parseInt(b.root.style.top)))b.root.style.top="0px";
        if(!b.hmode&&isNaN(parseInt(b.root.style.right)))b.root.style.right="0px";
        if(!b.vmode&&isNaN(parseInt(b.root.style.bottom)))b.root.style.bottom="0px";
        b.minX=typeof c!="undefined"?c:null;
        b.minY=typeof g!="undefined"?g:null;
        b.maxX=typeof d!="undefined"?d:null;
        b.maxY=typeof e!="undefined"?e:null;
        b.xMapper=h?h:null;
        b.yMapper=i?i:null;
        b.root.onDragStart=new Function;
        b.root.onDragEnd=new Function;
        b.root.onDrag=new Function
        },
    start:function(b){
        var a=Drag.obj=this;
        b=Drag.fixE(b);
        var c=parseInt(a.vmode?a.root.style.top:a.root.style.bottom),d=parseInt(a.hmode?a.root.style.left:a.root.style.right);
        a.root.onDragStart(d,c);
        a.lastMouseX=b.clientX;
        a.lastMouseY=b.clientY;
        if(a.hmode){
            if(a.minX!=null)a.minMouseX=b.clientX-d+a.minX;
            if(a.maxX!=
                null)a.maxMouseX=a.minMouseX+a.maxX-a.minX
                }else{
            if(a.minX!=null)a.maxMouseX=-a.minX+b.clientX+d;
            if(a.maxX!=null)a.minMouseX=-a.maxX+b.clientX+d
                }
                if(a.vmode){
            if(a.minY!=null)a.minMouseY=b.clientY-c+a.minY;
            if(a.maxY!=null)a.maxMouseY=a.minMouseY+a.maxY-a.minY
                }else{
            if(a.minY!=null)a.maxMouseY=-a.minY+b.clientY+c;
            if(a.maxY!=null)a.minMouseY=-a.maxY+b.clientY+c
                }
                document.onmousemove=Drag.drag;
        document.onmouseup=Drag.end;
        return false
        },
    drag:function(b){
        b=Drag.fixE(b);
        var a=Drag.obj,c=b.clientY;
        b=b.clientX;
        var d=parseInt(a.vmode?a.root.style.top:a.root.style.bottom),g=parseInt(a.hmode?a.root.style.left:a.root.style.right),e,f;
        if(a.minX!=null)b=a.hmode?Math.max(b,a.minMouseX):Math.min(b,a.maxMouseX);
        if(a.maxX!=null)b=a.hmode?Math.min(b,a.maxMouseX):Math.max(b,a.minMouseX);
        if(a.minY!=null)c=a.vmode?Math.max(c,a.minMouseY):Math.min(c,a.maxMouseY);
        if(a.maxY!=null)c=a.vmode?Math.min(c,a.maxMouseY):Math.max(c,a.minMouseY);
        e=g+(b-a.lastMouseX)*(a.hmode?1:-1);
        f=d+(c-a.lastMouseY)*(a.vmode?1:-1);
        if(a.xMapper)e=
            a.xMapper(d);
        else if(a.yMapper)f=a.yMapper(g);
        Drag.obj.root.style[a.hmode?"left":"right"]=e+"px";
        Drag.obj.root.style[a.vmode?"top":"bottom"]=f+"px";
        Drag.obj.lastMouseX=b;
        Drag.obj.lastMouseY=c;
        Drag.obj.root.onDrag(e,f);
        return false
        },
    end:function(){
        document.onmousemove=null;
        document.onmouseup=null;
        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode?"left":"right"]),parseInt(Drag.obj.root.style[Drag.obj.vmode?"top":"bottom"]));
        Drag.obj=null
        },
    fixE:function(b){
        if(typeof b=="undefined")b=
            window.event;
        if(typeof b.layerX=="undefined")b.layerX=b.offsetX;
        if(typeof b.layerY=="undefined")b.layerY=b.offsetY;
        return b
        }
    };
