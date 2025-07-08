<?php
namespace app\blogger\model\user;

use think\Model;

class User extends Model{

	// 设置当前模型对应的完整数据表名称
	protected $table = 'User';
	// 设置主键
	protected $pk = 'user_id';
	// 开启自动写入时间戳字段
	protected $autoWriteTimestamp = false;

    /**
     * 查询指定字段
     * @access protected
     * @return void
     */
    public function getUserInfo($user_id)
    {
        if (empty($user_id))
        {
            return false;
        }
        // 查询数据
        $where_user['`user`.user_id']   = $user_id;

        $join_user = [
            ['user_info','`user`.user_id=`user_info`.user_id'],
            ['user_data','`user`.user_id=`user_data`.user_id'],
        ];
        
        $field_user                     = '`user`.user_id,`user`.user_account,`user`.user_email,`user`.user_mobile,`user`.user_create_time,`user`.user_last_time,`user_info`.user_name,`user_info`.user_avatar,`user_info`.user_sex,`user_data`.article_num,`user_data`.note_num,`user_data`.fans_num,`user_data`.attention_num,`user_data`.fabulous_num,`user_data`.is_recommend,`user_data`.integral';

        $user_info = $this->where($where_user)->join($join_user)->field($field_user)->find();

        return $user_info;
    }

    /**
     * 查询指定字段
     * @access protected
     * @return void
     */
    public function getTableField($where = array(), $field, $order = '', $join = '')
    {
        $model = $this;

        if (!empty($where))
        {
            $model = $model->where($where);
        }

        if (!empty($order))
        {
            $model = $model->order($order);
        }

        if (!empty($join))
        {
            $model = $model->join($join);
        }

        return $model->getField($field);
    }

    /**
     * 查询单条数据
     * @access protected
     * @return void
     */
    public function getFind($where = array(), $field = '', $order = '', $join = '')
    {
        $model = $this;

        if (!empty($where))
        {
            $model = $model->where($where);
        }

        if (!empty($field))
        {
            $model = $model->field($field);
        }

        if (!empty($order))
        {
            $model = $model->order($order);
        }

        if (!empty($join))
        {
            $model = $model->join($join);
        }

        return $model->find();
    }

}