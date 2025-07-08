<?php
namespace app\index\model;

use think\Model;

class Article extends Model{

	// 设置当前模型对应的完整数据表名称
	protected $table = 'Article';
	// 设置主键
	protected $pk = 'article_id';
	// 开启自动写入时间戳字段
	protected $autoWriteTimestamp = true;
	// 定义时间戳字段名
    protected $createTime = 'article_create_time';
    protected $updateTime = 'article_last_time';

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

    /**
     * ID筛选
     * @access protected
     * @return void
     */
    protected function scopeArticleId($id)
    {
    	$query->where('article_id', $id)->field('article_detail_content');
    }

    /**
     * 关联文章详情表
     * @access protected
     * @return void
     */
    public function articleDetail()
    {
        return $this->hasOne('article_detail', 'article_id')->field('article_detail_content');
    }

}