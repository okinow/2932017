$("#addfav").bind("click",function(){
	if(document.all){window.external.addFavorite('http://www.dofreegames.com/','dofreegames Games');}else if(window.sidebar){window.sidebar.addPanel('dofreegames Games','http://www.dofreegames.com/','');}
});
function sethome(obj){
	try{
		obj.style.behavior='url(#default#homepage)';
		obj.setHomePage("http://www.dofreegames.com");
	}catch(e){
		if(window.netscape){
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch (e) {
				alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
			}
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
			prefs.setCharPref('browser.startup.homepage',url);
		}
	}
}
$("#go").bind("click",function(){
	if($("#key").val()=="Search for games!"){
		$("#key").val("");
		$("#key").focus();
	}
	if($("#key").val()!=""){
		$("#go").attr("href","http://gamestua.com/?key="+encodeURIComponent($("#key").val()) );
		$("#go").attr("target","_blank");
	}
});
$("#k").keydown(function(e){  
  if(e.keyCode==13){
	if($("#k").val()!=""){
		$("#go").attr("href","http://gamestua.com/?k="+ encodeURIComponent($("#key").val()) );
		$("#go").attr("target","_blank");
		if($.browser.msie){ 
			$("#go").get(0).click(); 
		}else{
			var evt = document.createEvent("MouseEvents"); 
			evt.initEvent("click", false, false); 
			$("#go").get(0).dispatchEvent(evt); 
		} 

	}
  }  
});
//61.160.235.77
if($("#ratethis")){
	$("#ratethis a").bind("click",function(){
		$.getScript("http://www.dofreegames.com/stat/star/?id="+_gameid+"&star="+ $(this).html(),function(){
			$("#ratethis a").unbind("click");
		});
	});
}
$("#pfull").bind("click",function(){
	QP.Resize(4);
});
$("#pfav").bind("click",function(){
	if(document.all){window.external.addFavorite(location.href,document.title);}else if(window.sidebar){window.sidebar.addPanel(document.title,location.href,'');}
});
if(typeof _gameid != "undefined"){
	if(_gameid>0){
		document.write("<scr"+"ipt src='http://www.dofreegames.com/stat/game/?id="+ _gameid +"'></scr"+"ipt>");
	}
}
function restar(v,t){
	$(".inner").width = v*10;
	alert("Thank you");
}
//AD
if(typeof _gameid != "undefined"){
	if(document.documentElement.offsetWidth>=1220){
		//var cpmstar_rnd=Math.round(Math.random()*999999);
		//var cpmstar_pid=13380;
		//document.writeln("<div style='position:absolute;width:120px;height:600px;left:"+ ((document.documentElement.offsetWidth-980)/2-120) +"px;top:182px;'><SCR"+"IPT language='Javascript' src='http://server.cpmstar.com/view.aspx?poolid="+cpmstar_pid+"&script=1&rnd="+cpmstar_rnd+"'></SCR"+"IPT></div>");
		
		//var cpmstar_rnd=Math.round(Math.random()*999999);
		//var cpmstar_pid=13380;
		//document.writeln("<div style='position:absolute;width:120px;height:600px;right:"+ ((document.documentElement.offsetWidth-980)/2-120) +"px;top:182px;'><SCR"+"IPT language='Javascript' src='http://server.cpmstar.com/view.aspx?poolid="+cpmstar_pid+"&script=1&rnd="+cpmstar_rnd+"'></SCR"+"IPT></div>");
	}
}