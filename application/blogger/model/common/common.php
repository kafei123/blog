<?php
namespace app\blogger\model\common;

use think\Model;

class Common extends Model{

	// 设置保存这次数据查询的介质
	private $now_table = $this;
	// 默认数据表名称
	protected $table = 'User';
	// 默认主键
	protected $pk = 'user_id';
	// 开启自动写入时间戳字段
	protected $autoWriteTimestamp = false;

    /**
     * 返回查询实例
     * @access protected
     * @return void
     */
    public function HandleSqlInstance($where = array(), $field = '', $order = array(), $join = array())
    {
        if (!empty($where))
        {
            $this->now_table = $this->now_table->where($where);
        }

        if (!empty($order))
        {
            $this->now_table = $this->now_table->order($order);
        }

        if (!empty($join))
        {
            $this->now_table = $this->now_table->join($join);
        }

        if (!empty($field))
        {
            $this->now_table = $this->now_table->field($field);
        }
    }

	/**
     * 查询指定的单条数据
     * @access protected
     * @return void
     */
    public function getFind($where = array(), $field = '', $join = array(), $order = array())
    {
        $this->HandleSqlInstance($where, $field, $order, $join);

        return $this->now_table->getfind($field, $is_array);
    }

    /**
     * 查询指定字段
     * @access protected
     * @return void
     */
    public function getTableField($field, $where = array(), $order = array(), $join = '', $is_array = false)
    {
        $this->HandleSqlInstance($where, $field, $order, $join);

        return $this->now_table->getField($field, $is_array);
    }

    /**
     * 查询多条数据
     * @access protected
     * @return void
     */
    public function getTableSelect($where = array(), $field, $order = array(), $join = '')
    {
        $this->HandleSqlInstance($where, $field, $order, $join);

        return $this->now_table->select();
    }

    /**
     * 统计数据
     * @access protected
     * @return void
     */
    public function getTableCount($where = array(), $field, $join = '')
    {
        $this->HandleSqlInstance($where, $field, $order, $join);

        return $this->now_table->count();
    }

}