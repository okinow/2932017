$('#box').hide();
var QP = new Object();
QP.drawIframe = function (p_Src, p_id, p_width, p_height){
	return "<iframe src=\""+p_Src+"\" frameborder=\"0\" name=\""+p_id+"\" id=\""+p_id+"\" height=\""+p_height+"\" width=\""+p_width+"\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" border=\"0\"></iframe>";
};
QP.drawSWF = function (p_Src, p_Var, p_id, p_width, p_height, p_script, p_net){
	var str='<object id="'+p_id+'" name="'+p_id+'" width="'+p_width+'" height="'+p_height+'" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="'+p_Src+'"/><param name="flashvars" value="'+p_Var+'"/><param name="quality" value="high"/><param name="bgcolor" value="#000"/><param name="wmode" value="direct"><param name="base" value="."/>';
	if(p_script==1){str+='<param name="allowScriptAccess" value="always"/>';}
	if(p_net==0){str+='<param name="allowNetworking" value="internal"/>';}
	str+='<embed id="'+p_id+'_em" name="'+p_id+'" width="'+p_width+'" height="'+p_height+'" src="'+p_Src+'" flashvars="'+p_Var+'"';
	if(p_script==1){str+=' allowScriptAccess="always"';}
	if(p_net==0){str+=' allowNetworking="internal"';}
	str+=' quality="high" bgcolor="#000" base="." pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" wmode="direct" allownetworking="internal" type="application/x-shockwave-flash" /></object>';
	return str;
};
QP.drawDCR = function(p_Src, p_id, p_width, p_height){
	var str = "";
	str = '<object id="'+p_id+'" width="'+p_width+'" height="'+p_height+'" classid="clsid:166B1BCA-3F9C-11CF-8075-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=10,0,0,0"><param name="background" value="#000"><param name="swStretchStyle" value="fill"><param name="logo" value="false"><param name="menu" value="false"><param name="src" value="'+p_Src+'"><embed id="'+p_id+'_em" name="'+p_id+'" src="'+p_Src+'" background="#000" logo="false" menu="false" width="'+p_width+'" height="'+p_height+'" pluginspage="http://www.macromedia.com/shockwave/download/"></embed></object>';
	return str;
}
QP.drawad = function(){
	return  "<iframe src=\"/js/v1/flash.html\" scrolling=\"no\" frameborder=\"0\" width=\"630\" height=\"480\" ></iframe>";
}
//var
var _v,_w,_h,_p,_e;//flashvar,width,height,path,extra name
var _playmode = 1;
var _playscript=_gamemark.split('|')[1];
var _playnet=_gamemark.split('|')[2];
var _fw = 640;//frame width
var _fh = 480;//frame height
var _rw;//resize width
var _rh;//resize height
if(_gamewidth==0){_gamewidth=550;}
if(_gameheight==0){_gameheight=400;}
_w = _gamewidth;
_h = _gameheight;
_v = _gamevar;
_p = _gamepath;
_e = _p.replace(/^(.+?)(\.([^\.\?]+?))(\?.+?)?$/g, "$2");
if(_e == '.swf'){
	_playmode = 1;
}else if(_e == '.dcr'){
	_playmode = 2;
}else if(_e == '.htm' || _e == '.html'){
	_playmode = 4;
}else{
	_playmode = 0;
}
$("#loadad").html(QP.drawad());
QP.Player = function(){
	var str = '';
	str += '<div id="exitfull" onclick="QP.Resize(5)">Exit Fullscreen</div><table id="player" align="center" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle">';
	str += '<div id=\"loading\"><div id="bar"></div><div id=\"txt\">Loading...</div></div></td></tr><tr><td align="center" valign="middle">';
	if(_playmode == 1){
		str += QP.drawSWF(_p, _v, "gameobj", _w, _h, _playscript, _playnet);
	}else if(_playmode == 2){
		str += QP.drawDCR(_p, "gameobj", _w, _h);
	}else if(_playmode == 3){
		str += QP.drawXAP(_p, "gameobj", _w, _h);
	}else if(_playmode == 4){
		str += QP.drawIframe(_p + '?w='+ _w +'&h='+ _h +'&v='+ _v, "gameobj", _w, _h);	
	}else{
		str += '<a href="'+ _p +'" target="_blank" style="#fff">Download</a>';	
	}
	str += '</td></tr></table>';	
	$("#box").html(str);
}

QP.Player();

QP.Resize = function(m){
	if(m == 0){
	//start
		if(_w > 938){
			_w = 938;
			_h = parseInt(_w * _gameheight/_gamewidth);
		}
		if(_w > _fw){
			$("#rela").hide();
			$("#box").width(938);
			$("#player").width(938);
		}else{
			$("#rela").show();
			$("#box").width(_fw);
			$("#player").width(_fw);
		}
		if(_h > _fh){
			if($("#loading").show()){
				$("#box").height(_h+20);
				$("#player").height(_h+20);
			}else{
				$("#box").height(_h);
				$("#player").height(_h);
			}
		}else{
			$("#box").height(_fh);
			$("#player").height(_fh);
		}
	}else if(m==1){
	//zoom
		_w = _w + 100;
		if(_w > 938){_w = 938}
		_h = parseInt(_w * _gameheight/_gamewidth);
		if(_w > _fw){
			$("#rela").hide();
			$("#box").width(938);
			$("#player").width(938);
		}else{
			$("#rela").show();
			$("#box").width(_fw);
			$("#player").width(_fw);
		}
		if(_h > _fh){
			$("#box").height(_h);
			$("#player").height(_h);
		}else{
			$("#box").height(_fh);
			$("#player").height(_fh);
		}
	}else if(m==2){
	//narrow
		_w = _w - 100;
		_h = parseInt(_w * _gameheight/_gamewidth);
		if(_w > _fw){
			$("#rela").hide();
			$("#box").width(938);
			$("#player").width(938);
		}else{
			$("#rela").show();
			$("#box").width(_fw);
			$("#player").width(_fw);
		}
		if(_h > _fh){
			$("#box").height(_h);
			$("#player").height(_h);
		}else{
			$("#box").height(_fh);
			$("#player").height(_fh);
		}
	}else if(m==3){
	//normal
		_w = _gamewidth;
		_h = _gameheight;
		if(_w > 938){
			_w = 938;
			_h = parseInt(_w * _gameheight/_gamewidth);
		}
		if(_w > _fw){
			$("#rela").hide();
			$("#box").width(938);
			$("#player").width(938);
		}else{
			$("#rela").show();
			$("#box").width(_fw);
			$("#player").width(_fw);
		}
		if(_h > _fh){
			$("#box").height(_h);
			$("#player").height(_h);
		}else{
			$("#box").height(_fh);
			$("#player").height(_fh);
		}
	}else if(m==4){
	//full
		var _sc_w = document.documentElement.clientWidth-2;
		var _sc_h = document.documentElement.clientHeight;
		_rw = _w;
		_rh = _h;//remeber history 
		_w = _sc_w;
		_h = _sc_h-20;
		if(parseInt(_w * _gameheight/_gamewidth) > _h){
			_w = parseInt(_h * _gamewidth/_gameheight);
		}else{
			_h = parseInt(_w * _gameheight/_gamewidth);
		}
		$("#exitfull").show();
		$("#ctr").hide()
		$("#box").css({ position: "absolute", left: "0px", top: "0px", margin: "0px" }); 
		$("#box").width(_sc_w);
		$("#player").width(_sc_w);
		$("#box").height(_sc_h);
		$("#player").height(_h);
		window.scroll(0,0);
	}else{
	//exit full
		_w = _rw;
		_h = _rh;
		$("#exitfull").hide();
		$("#ctr").show();
		$("#box").css({ position: "static", left: "auto", top: "auto", margin: "0 17px" }); 
		if(_w > _fw){
			$("#rela").hide();
			$("#box").width(938);
			$("#player").width(938);
		}else{
			$("#rela").show();
			$("#box").width(_fw);
			$("#player").width(_fw);
		}
		if(_h > _fh){
			$("#box").height(_h);
			$("#player").height(_h);
		}else{
			$("#box").height(_fh);
			$("#player").height(_fh);
		}
		
	}
	document.getElementById('gameobj').width = _w;
	document.getElementById('gameobj').height = _h;
	if(document.getElementById('gameobj_em')){
	document.getElementById('gameobj_em').width = _w;
	document.getElementById('gameobj_em').height = _h;
	}
	if(_playmode ==4 && m >0 ){document.getElementById('gameobj').src = _p + '?w='+ _w + '&h='+ _h +'&v='+ _v;}
}
QP.Resize(0);


//ctr
$("#ctr1").bind("click",function(){
	QP.Resize(4);							 
});
$("#ctr2").bind("click",function(){
	QP.Resize(1);							 
});
$("#ctr3").bind("click",function(){
	QP.Resize(2);							 
});
$("#ctr4").bind("click",function(){
	QP.Resize(3);							 
});
$("#ctr11").bind("click",function(){
	$("#ctr11").attr("href",_gamepath);
	$("#ctr11").attr("target","_blank");
});
