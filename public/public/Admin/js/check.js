
// 判断电话号码+手机号码
function check_phone(e){
    if(!/^0\d{2,3}-?\d{7,8}$/.test(e.value) && !/^1[34578]\d{9}$/.test(e.value)){
        alert('电话格式不正确（0755-44443333 或者 13011912019）');
        e.value='';
    }
}

// 判断数字
function check_number(e){
	if(!/^[0-9]*$/.test(e.value)){
		alert('必须为数字');
		e.value='';
	}
}

// 判断门店营业时间格式
function check_business_time(e,zt=1){

	if(!/^[0-5]{1}[0-9]{1}:[0-5]{1}[0-5]{1}$/.test(e.value)){
		alert('时间格式不正确,正确的格式为 00:00');
		e.value='';
	}
	if(zt == 2){
		// 获取营业开始时间
		var store_start_time = $('#store_start_time').val();
		var start_time = parseInt(store_start_time.substr(0,2));
		var end_time = parseInt(e.value.substr(0,2));
		if(start_time > end_time){
			alert('营业开始时间不能大于营业结束时间');
			$('#store_end_time').val('18:00');
		}
	}

}

// 判断价格
function check_price(e){

	if(!/^[0-9]*.[0-9]{0,2}$/.test(e.value)){
		alert('价格格式为99.99');
		e.value='';
	}

}


// 判断结束日期不能小于开始日期
function check_end_time(e){
	
}


// 用户名
function check_name(e){
    if(e.value.length > 10){
        alert('文字不能太长');
        e.value='';
    }
}

// 标题
function check_title(e){
    if(e.value.length > 20){
        alert('标题不能太长');
        e.value='';
    }
}


// 地址
function check_address(e){
    if(e.value.length > 40){
        alert('地址不能太长');
        e.value='';
    }
}

// 折扣
function check_discount(e){
    if(e.value > 100){
        alert('折扣最大只能为100%');
        e.value = 100;
    }
    if(e.value < 1){
        alert('折扣最小只能为1%');
        e.value = 1;
    }
}