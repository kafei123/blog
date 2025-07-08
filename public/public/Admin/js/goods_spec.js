goods_spec_list(0);
	
// 规格列表
function goods_spec_list(goods_id) {

	// 调用ajax
	$.ajax({
        'url':"{:U('Goods/spec_list')}",
        'type':'post',
        'dataType':'json',
        data:{'goods_id':goods_id},
        success:function(data){
            if(data.ret == 0){
            	// 初始化html
            	var html 		= '';
            	// 获取数组
            	var info 		= data.data.data;
            	console.log(info);
            	// 循环数组
            	for (var i = 0; i < info.length; i++) {
            		console.log(info[i]);
            		// 添加成功，拼接html
                    html 	   += '<tr class="ng-scope odd" role="row" id="goods_spec_' + info[i].goods_spec_id + '">';
                    html   	   += '<td class="ng-binding sorting_1">' + (i + 1) + '</td>';
                    html   	   += '<td class="ng-binding">' + info[i].goods_spec_name + '</td>';
                    html   	   += '<td class="ng-binding">' + info[i].goods_spec_price + '</td>';
                    html   	   += '<td class="ng-binding">' + info[i].goods_spec_num + '</td>';
                    html   	   += '<td class="ng-binding"><a href="javascript:void(0)" class="btn btn-primary" onclick="goods_spec_eait(' + info[i].goods_spec_id + ', this)">修改</a>';
                    html   	   += ' <a href="javascript:void(0)" class="btn btn-primary" onclick="goods_spec_add()">删除</a></td>';
                    html   	   += '</tr>';
            	}
            	// 赋值数量
            	$('#spec_tbody').attr('spaccount',data.data.count);
                // 追加数据
                $('#spec_tbody').append(html);
            } else {
            	alert(data.msg);
            	return false;
            }
        }
    })

}

// 添加/修改规格弹窗
function goods_spec_add() {

	// 清空数据
	$('#goods_spec_id').val('');
	$('#goods_spec_name').val('');
	$('#goods_spec_price').val('');
	$('#goods_spec_num').val('');
	// 弹出窗展示
	$('#spec_max_div').show(300);

}

// 执行修改
function goods_spec_eait(goods_spec_id, e) {

	var goods_spec_name 	= $(e).parent('td').siblings().eq(1).text();
	var goods_spec_price 	= $(e).parent('td').siblings().eq(2).text();
	var goods_spec_num 		= $(e).parent('td').siblings().eq(3).text();
	// 赋值
	$('#goods_spec_id').val(goods_spec_id);
	$('#goods_spec_name').val(goods_spec_name);
	$('#goods_spec_price').val(goods_spec_price);
	$('#goods_spec_num').val(goods_spec_num);
	// 弹出窗展示
	$('#spec_max_div').show(300);

}

// 隐藏添加/修改规格弹窗
function cancelBtn() {

	// 清空数据
	$('#goods_spec_id').val('');
	$('#goods_spec_name').val('');
	$('#goods_spec_price').val('');
	$('#goods_spec_num').val('');
	// 弹出窗展示
	$('#spec_max_div').hide(300);

}

// 添加/修改规格
function addBtn() {

	// 获取数据
	var goods_spec_id 		= $('#goods_spec_id').val();
	var goods_spec_name 	= $('#goods_spec_name').val();
	var goods_spec_price 	= $('#goods_spec_price').val();
	var goods_spec_num 		= $('#goods_spec_num').val();
	// 判断参数
	if (goods_spec_name == '') {
		alert('请填写规则名称');
		return false;
	}
	if (goods_spec_price == '') {
		alert('请填写价格');
		return false;
	}
	if (goods_spec_num == '') {
		alert('请填写库存');
		return false;
	}
	// 调用ajax添加
	$.ajax({
        'url':"{:U('Goods/spec_add')}",
        'type':'post',
        'dataType':'json',
        data:{'goods_spec_id':goods_spec_id,'goods_spec_name':goods_spec_name,'goods_spec_price':goods_spec_price,'goods_spec_num':goods_spec_num},
        success:function(data){
            if(data.ret == 0){
            	// 添加成功，拼接html
                var html 	= '<tr class="ng-scope odd" role="row" id="goods_spec_' + data.data + '">';
                html   	   += '<td class="ng-binding sorting_1"></td>';
                html   	   += '<td class="ng-binding">' + goods_spec_name + '</td>';
                html   	   += '<td class="ng-binding">' + goods_spec_price + '</td>';
                html   	   += '<td class="ng-binding">' + goods_spec_num + '</td>';
                html   	   += '<td class="ng-binding"><a href="javascript:void(0)" class="btn btn-primary" onclick="goods_spec_add()">修改</a>';
                html   	   += ' <a href="javascript:void(0)" class="btn btn-primary" onclick="goods_spec_add()">删除</a></td>';
                html   	   += '</tr>';
                // 追加数据
                $('#spec_tbody').append(html);
                // 隐藏div
                cancelBtn();
            } else if(data.ret == 2){
            	// 拼接ID
                var tr_id 	= 'goods_spec_' + data.data.goods_spec_id;
                // 修改表格数据
                $('#' + tr_id).find('td').eq(1).text(data.data.goods_spec_name);
                $('#' + tr_id).find('td').eq(2).text(data.data.goods_spec_price);
                $('#' + tr_id).find('td').eq(3).text(data.data.goods_spec_num);
                // 隐藏div
                cancelBtn();
                return false;
            } else {
            	alert(data.msg);
            	return false;
            }
        }
    })

}