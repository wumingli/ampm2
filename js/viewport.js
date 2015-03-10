	var phoneWidth = parseInt(window.screen.width);
	var phoneScale = phoneWidth/640;
	var userAgent = navigator.userAgent;   
	var index = userAgent.indexOf("Android");
	if(index >= 0){  
	var androidVersion = parseFloat(userAgent.slice(index+8));
		if(androidVersion>2.3){
			$("head").eq(0).html("<meta name='viewport' content='width=640, initial-scale = "+phoneScale+", minimum-scale = "+phoneScale+", maximum-scale = "+phoneScale+",user-scalable=no, target-densitydpi=device-dpi'>");
		}else{
			$("head").eq(0).html("<meta name='viewport' content='width=640, target-densitydpi=device-dpi'>");
		}

	}else{
		$("head").eq(0).html("<meta name='viewport' content='width=640, initial-scale = "+phoneScale+", minimum-scale = "+phoneScale+", maximum-scale = "+phoneScale+",user-scalable=no, target-densitydpi=device-dpi'>");
	}
