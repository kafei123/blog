function get_cate_childs(e,cate_leval,cate_id){
	//1.当前所有兄弟节点取消掉class checked_li
	$(e).siblings().removeClass('checked_li');
	$(e).addClass('checked_li');
	//2.请求后台查询属于当前category_id的子id,判断当前级别是否第三级,如果是,返回false
	if(cate_leval=='3'){
		return false;
	}
	$.post(
		'getcatechilds',
		{
			'goods_type_id':cate_id,
		},
		function(data){
			if(data!='[]'){
				var jsonStr = JSON.parse(data);
				if(cate_leval=='1'){
					$('.cate2div').html('');
					$('.cate3div').html('');
					var base = $(e).attr('base');
					var appStr = '<div class="add_category"><a href="javascript:void(0);" onclick="add_cate(2,'+jsonStr[0].type_parent_id+')">添加分类</a></div>';
					appStr += '<ul class="categroy_name cate2">';
					for(var i=0;i<jsonStr.length;i++){
						appStr += '<li onclick="get_cate_childs(this,'+jsonStr[i].type_leval+','+jsonStr[i].goods_type_id+')">';
						appStr += '<p class="cate2_left">';
						if(jsonStr[i].goods_type_img){
							appStr += '<img src="'+base+jsonStr[i].goods_type_img+'" id="img'+jsonStr[i].goods_type_id+'" style="width:50;height:50px;">';
						}else{
							appStr += '<img src="" id="img'+jsonStr[i].goods_type_id+'" style="width:50;height:50px;display:none;">';
						}
						appStr += '<input type="file" name="type_img" class="file" id="type_img'+jsonStr[i].goods_type_id+'" onchange="uploadImage(this,'+jsonStr[i].goods_type_id+')" typeid="'+jsonStr[i].goods_type_id+'" />';
						appStr += '</p>';
						appStr += '<input type="text" value="'+jsonStr[i].goods_type_name+'" class="categroy_text" onblur="edit_catename(this,'+jsonStr[i].goods_type_id+')" />&nbsp;';
						if(jsonStr[i].goods_type_id == 7 || jsonStr[i].goods_type_id == 20 || jsonStr[i].goods_type_id == 21 || jsonStr[i].goods_type_id == 28){

						}else{
							appStr += '<button onclick="del_cate(this,'+jsonStr[i].goods_type_id+')">删除</button>';
						}
						appStr += '</p>';
						appStr += '</li>';
					}
					appStr += '</ul>';
					$('.cate2div').append('<span class="categroy_bg cate2title">二级分类</span>'+appStr);
					$('#checked_li_sort').val($(e).index());
				}else{
					$('.cate3div').html('');
					var appStr = '<div class="add_category"><a href="javascript:void(0);" onclick="add_cate(3,'+jsonStr[0].type_parent_id+')">添加分类</a></div>';
					appStr += '<ul class="categroy_name cate3">';
					for(var i=0;i<jsonStr.length;i++){
						appStr += '<li>';
						appStr += '<input type="text" value="'+jsonStr[i].goods_type_name+'" class="categroy_text" onblur="edit_catename(this,'+jsonStr[i].goods_type_id+')" />&nbsp;';
						appStr += '<button onclick="del_cate(this,'+jsonStr[i].goods_type_id+')">删除</button>';
						appStr += '<input style="margin-top:5px;width:100%" placeholder="请填写分类介绍" type="text" value="'+jsonStr[i].goods_type_body+'" class="categroy_text" onblur="edit_body(this,'+jsonStr[i].goods_type_id+')" />&nbsp;';
						appStr += '</li>';
					}
					appStr += '</ul>';
					$('.cate3div').append('<span class="categroy_bg cate2title">三级分类</span>'+appStr);
					$('#checked_li_sort').val($('.checked_li').eq(0).index()+','+$(e).index());
				}
			}else{
				if(cate_leval=='1'){
					$('.cate2div').html('');
					$('.cate3div').html('');
					var appStr = '<div class="add_category"><a href="javascript:void(0);" onclick="add_cate(2,'+cate_id+')">添加分类</a></div><ul class="categroy_name cate2"></ul>';
					$('.cate2div').append('<span class="categroy_bg cate2title">二级分类</span>'+appStr);
					$('#checked_li_sort').val($(e).index());
				}else{
					$('.cate3div').html('');
					var appStr = '<div class="add_category"><a href="javascript:void(0);" onclick="add_cate(3,'+cate_id+')">添加分类</a></div><ul class="categroy_name cate3">';
					$('.cate3div').append('<span class="categroy_bg cate2title">三级分类</span>'+appStr);
					$('#checked_li_sort').val($('.checked_li').eq(0).index()+','+$(e).index());
				}
				//return alert('该分类下无子分类');
			}
		}
	);
}



/*function cate_uploadfile(e,cate_id){
	$(e).addClass('curr_cateimgup');
	$('#category_id').val(cate_id);
	$('#category_img').click();
}
function check_file(e){
	var filepath = $('#category_img').val();
	var extStart = filepath.lastIndexOf(".");
	var ext = filepath.substring(extStart,filepath.length).toUpperCase();
	if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG"){
		return false;
	}else{
		var file_size = 0;
		if ( $.browser.msie){
			var img=new Image();
			img.src=filepath;
			if(img.fileSize > 0){
				if(img.fileSize > 2*1024){
					return alert('图片不得大于2M');
				}
			}
		}else{
			file_size = e.files[0].size;
			var size = file_size / 1024;
			if(size > 2048){
				return alert('图片不得大于2M');
			}
		}
		$('#cate_form').submit();
	}
	//var res_img = $("#upload_cate_img").contents().find("body").html();
	//alert(res_img);
	//window.location.href=phpurl+'/Admin/Category/editcate';
}*/
/*function get_img_iframe(str){
	$('.curr_cateimgup').html('');
	$('.curr_cateimgup').html("<img src='"+str+"' />");
	$('.curr_cateimgup').removeClass('curr_cateimgup');
}*/


function edit_catename(e,cate_id){
	$.post(
			'editcatename',
			{
				'goods_type_id':cate_id,
				'goods_type_name':$(e).val(),
			},
			function(data){
				if(data=='更新失败'){
					alert(data);
				}
			}
	);
}




function del_cate(e,cate_id){
	var res = confirm('确认要删除此分类吗？');
	if(res==true){
		//执行ajax操作,返回结果是删除成功则成功，否则弹出返回结果
		$.post(
				'deltype',
				{'goods_type_id':cate_id},
				function(data){
					if(data=='删除成功'){
						$(e).parent().remove();
					}else{
						alert(data);
					}
				}
		);
	}else{
		return false;
	}
}



function add_cate(type_leval,type_parent_id){
	if(type_parent_id=='undefined'){
		type_parent_id = 0;
	}
	$.post(
			"addtype",
			{
				'goods_type_name':'新分类',
				'type_parent_id':type_parent_id,
				'type_leval':type_leval
			},
			function(data){
				if(data=='添加失败'){
					return alert(data);
				}else{
					var jsonStr = JSON.parse(data);
					if(type_leval == 2){
						var appStr = '<li onclick="get_cate_childs(this,'+jsonStr.type_leval+','+jsonStr.goods_type_id+')">';
						appStr += '<p class="cate2_left">';
						appStr += '<img src="" id="img'+jsonStr.goods_type_id+'" style="width:50;height:50px;display:none;">';
						appStr += '<input type="file" name="type_img" class="file" id="type_img'+jsonStr.goods_type_id+'" onchange="uploadImage(this,'+jsonStr.goods_type_id+')" typeid="'+jsonStr.goods_type_id+'" />';
						appStr += '</p>';
						appStr += '<input type="text" value="'+jsonStr.goods_type_name+'" class="categroy_text" onblur="edit_catename(this,'+jsonStr.goods_type_id+')" />&nbsp;';
						appStr += '<button onclick="del_cate(this,'+jsonStr.category_id+')">删除</button></p></li>';
					}else{
						appStr += '<li>';
						appStr += '<input type="text" value="'+jsonStr.goods_type_name+'" class="categroy_text" onblur="edit_catename(this,'+jsonStr.goods_type_id+')" />&nbsp;';
						appStr += '<button onclick="del_cate(this,'+jsonStr.goods_type_id+')">删除</button>';
						appStr += '<input style="margin-top:5px;width:100%" placeholder="请填写分类介绍" type="text" value="'+jsonStr.goods_type_body+'" class="categroy_text" onblur="edit_body(this,'+jsonStr.goods_type_id+')" />&nbsp;';
						appStr += '</li>';
					}
					
					$('.cate'+type_leval).append(appStr);
				}
			}
	);
}