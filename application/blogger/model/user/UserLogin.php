<?php
namespace app\blogger\model\user;

use think\Model;

class UserLogin extends Model{

	// 设置当前模型对应的完整数据表名称
	protected $table = 'user_login';
	// 设置主键
	protected $pk = 'user_login_id';
	// 开启自动写入时间戳字段
	protected $autoWriteTimestamp = false;

    

}