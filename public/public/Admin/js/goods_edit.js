$(function () {
	$("#inputimg0").uploadPreview({ Img: "nimg0", Width: 100 ,Height: 100 });
	$("#inputimg1").uploadPreview({ Img: "nimg1", Width: 100 ,Height: 100 });
	$("#inputimg2").uploadPreview({ Img: "nimg2", Width: 100 ,Height: 100 });
	$("#inputimg3").uploadPreview({ Img: "nimg3", Width: 100 ,Height: 100 });
	$("#inputimg4").uploadPreview({ Img: "nimg4", Width: 100 ,Height: 100 });

	$("#goods_common").click(function(){
		$("#integral_div").hide();
		$("#goods_integral_price_div").hide();
		$("#goods_old_price_div").show();
		$("#goods_price_div").show();
		$("#goods_specifications").show();
		$("#goods_freight_explain").show();
	});
	$("#goods_integral").click(function(){
		$("#integral_div").show();
		$("#goods_integral_price_div").show();
		$("#goods_old_price_div").hide();
		$("#goods_price_div").hide();
		$("#goods_specifications").hide();
		$("#goods_freight_explain").hide();
	});
	$("#goods_all").click(function(){
		$("#integral_div").show();
		$("#goods_integral_price_div").show();
		$("#goods_old_price_div").show();
		$("#goods_price_div").show();
		$("#goods_specifications").show();
		$("#goods_freight_explain").show();
	});
	
});


//数字格式判断
function checknumber(e){
	var regex =/^\d+$/;
	if (!regex.test($(e).val())){
		$(e).val('');
	}
	$(e).css('ime-mode','disabled');
}




//查询分类
function find2cate(e){
	//alert($(e).val());
	if($(e).val()=='0'){
		return false;
	}
	$.post(
			'find2cate',
			{'goods_type_id':$(e).val()},
			function(data){
				if(data==''){
					return alert('该分类下无子分类，请重新选择');
				}else{
					var jsonStr = JSON.parse(data);
					optStr = '';
					for(var i=0;i<jsonStr.length;i++){
						optStr += '<option value="'+jsonStr[i].goods_type_id+'" onclick="selecttype('+jsonStr[i].goods_type_id+','+jsonStr[i].type_leval+',this)">'+jsonStr[i].goods_type_name+'</option>';
					}
					if($(e).attr('id')=='cate1'){
						$('#cate2').empty();
						$('#cate3').empty();
						$('#cate2').append('<option value="0">==请选择==</option>');
						$('#cate3').append('<option value="0">==请选择==</option>');
						$('#cate2').append(optStr);
					}else if($(e).attr('id')=='cate2'){
						$('#cate3').empty();
						$('#cate3').append('<option value="0" onclick="selecttype(0,0,0)">==请选择==</option>');
						$('#cate3').append(optStr);
					}
				}
			}
	);
}

function selecttype(goods_type_id,type_leval,e){
	if(goods_type_id==0){
		$("#select_name3").html('');
		$("input[name='goods_type_id']").val('');
	}else if(type_leval==1){
		$("#select_name1").html($(e).html());
		$("#select_name2").html('');
		$("#select_name3").html('');
		$("input[name='goods_type_id']").val('');
	}else if(type_leval==2){
		$("#select_name2").html($(e).html());
		$("#select_name3").html('');
		$("input[name='goods_type_id']").val('');
	}else if(type_leval==3){
		$("#select_name3").html($(e).html());
		$("input[name='goods_type_id']").val(goods_type_id);
	}
}

function check_gname_length(e){
	var txtLength = Math.ceil($(e).val().length);
	if($(e).val().length>30){
		$(e).val($(e).val().substring(0,30));
		$('#can_input').html('0/30');
		$(e).blur();
	}else{
		$('#can_input').html(30 - txtLength+'/30');
	}
}

/*function get_this_img(e){
	if($(e).val()!=""){
		var filepath=$(e).val();
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();
		if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
			alert("图片限于bmp,png,gif,jpeg,jpg格式");
			return false;
		}
		var file_size = 0;
		if( $.browser.msie){
			var img=new Image();
			img.src=filepath;
			while(true){
				if(img.fileSize > 0){
					if(img.fileSize>2*1024){
						alert("图片不能超过2MB。");
					}
					break;
				}
			}
		}else{
			file_size = $(e).get(0).files[0].size;
			var size = file_size / 1024;
			if(size > 2048){
				alert("上传的文件大小不能超过2MB！");
			}else{
				$(e).prev().html('已上传');
			}
		}
		return true;
	}
}
*/


//价格格式判断
function checknumberdot(e){
	var regex = /^\d+\.?\d{0,2}$/;
	if (!regex.test($(e).val())){
		$(e).val('');
	}
	$(e).css('ime-mode','disabled');
}

function setdefault_goodsimg(e){
	var event = window.event || arguments.callee.caller.arguments[0];
	if($('.imgcheck').eq(e).attr('src')=='/cth/Public/admin/images/no_img.jpg'){
		alert('没有此图片，设为默认失败');
		event.preventDefault();
	}
	return false;
}

function check_form(e){
	
	//判断积分数值
	var goodsclass=$("input[name='goods_class']:checked").val();
	var intergral_num=$("input[name='goods_integral_num']").val();
	var goods_integral_price=$("input[name='goods_integral_price']").val();
	if(goodsclass!=0 && goods_integral_price==''){
		$('#goods_integral_price').focus();
		return alert('请输入积分商品价格');
	}
	if(goodsclass!=0 && intergral_num==0){
		$('#integral_text').focus();
		return alert('请输入积分数值');
	}
	
	
	//.判断是否有分类被选中
	var typeid=$("input[name='goods_type_id']").val();

	 if(typeid==""){
			 alert('请选择三级分类');
			 $('#cate3').focus();
			 $('#cate1').css('border','red 1px solid');
			 $('#cate2').css('border','red 1px solid');
			 $('#cate3').css('border','red 1px solid');
			 return false;
		 }
		 //商品名称
		 if($("#goods_name_id").val()==''){
			 $('#goods_name_id').focus();
				return alert('商品名称不能为空');
			}
		 //商品原价
		 if(goodsclass == 0 || goodsclass == 2){
			if($("#goods_old_price").val()==""){
				$('#goods_old_price').focus();
					return alert('商品原价不能为空');
			}
			//商品售价
			if($("#goods_price").val()==""){
				$('#goods_price').focus();
					return alert('商品售价不能为空');
			}
		 }
		 


		//.判断图片是否上传
		var img_times = 0;
		var ss=$('.imgcheck').attr('src');
		$('.imgcheck').each(function(){
			if($(this).attr('src')=='/cth/Public/admin/images/no_img.jpg'){
				++img_times;
			}
		});
		if(img_times==5){
			alert('必须上传一张默认图片');
			$('#sc_form1').css('border','red 1px solid');
			return $('#sc_form1').focus();
		}
	
		
		
	var event = window.event || arguments.callee.caller.arguments[0];
	var pageW = $(window.parent.window).width();
	var pageH = $(window).height();
	var pagewinW = $(window.parent.document).width();
	var pagewinH = $(document).height();
	var scrolltop = $(document).scrollTop();
	var parent_scrolltop = $(window.parent.document).scrollTop();
	var chaju = $(window.parent.document).height()-$(document).height();
	event.preventDefault();
	var bleft = pagewinW/2-$("#alerter").width()/2-($(window.parent.document).width()-$(document).width());
	var btop = $(window.parent.window).height()/2-$("#alerter").height()/2+parent_scrolltop-chaju;
	$("#alerter").css({"left":bleft,"top":btop});
	$(".screen").css({"width":pagewinW,"height":pagewinH});
	$('#alerter').show();
	$(".screen").show();
	$(".is_instock").val(e);
	$("#edit_goods_form").submit();
}
