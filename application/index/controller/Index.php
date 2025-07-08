<?php
namespace app\index\controller;

use app\index\model\Article;
use think\Controller;

class Index extends Controller
{
    /**
     * 文章数据库实例
     *
     * @access protected
     * @var object
     */
	protected $article;

    /**
     * 文章分类
     *
     * @access protected
     * @var object
     */
    protected $type = '';

    /**
     * 网站标题
     *
     * @access protected
     * @var object
     */
    protected $title = '小罗博客';

    /**
     * 网站关键字
     *
     * @access protected
     * @var object
     */
    protected $keywords = '小罗博客';

    /**
     * 网站描述
     *
     * @access protected
     * @var object
     */
    protected $description = '小罗博客';

    /**
     * 构造函数
     *
     * @access public
     * @return object
     */
	public function _initialize()
    {
        $this->article = new Article();

        $hot = $this->article->where('article_is_hot',1)->field('article_id,article_title')->order('article_create_time desc')->limit(10)->select();
		
		$recommend = $this->article->where('article_is_recommend',1)->field('article_id,article_title')->order('article_create_time desc')->limit(10)->select();

        if (input('type'))
        {
            $this->type = input('type');
        }

    	$this->assign('hot', $hot);
        $this->assign('type', $this->type);
    	$this->assign('recommend', $recommend);
    }

    /**
     * 博客首页
     *
     * @access public
     * @return html
     */
    public function index()
    {
    	$data = $this->article->order('article_create_time desc')->limit(10)->paginate(10);

    	$this->assign('data', $data);
        $this->assign('title', $this->title);
        $this->assign('keywords', $this->keywords);
        $this->assign('description', $this->description);

    	return view();
    }

    /**
     * 分类列表
     *
     * @access public
     * @return html
     */
    public function articleList()
    {

        $data = $this->article->where('article_type_name','like','%' . $this->type . '%')->order('article_create_time desc')->limit(10)->paginate(10);

        $this->assign('data', $data);
        $this->assign('title', $this->title);
        $this->assign('keywords', $this->keywords);
        $this->assign('description', $this->description);

        return view('index');
    }

    /**
     * 搜索列表
     *
     * @access public
     * @return html
     */
    public function search()
    {
        if (input('keywords'))
        {
            $keywords = input('keywords');
        }

        $data = $this->article->where('article_title','like','%' . $keywords . '%')->order('article_create_time desc')->limit(10)->paginate(10);

        $this->assign('data', $data);
        $this->assign('title', $this->title);
        $this->assign('keywords', $this->keywords);
        $this->assign('description', $this->description);

        return view('index');
    }

    /**
     * 博客详情
     *
     * @access public
     * @return html
     */
    public function detail()
    {
    	$id = input('id/d');

    	$data = $this->article->where('`article`.article_id', $id)->join('article_detail ad','ad.article_id = `article`.article_id')->find();
        
        if (!$data)
        {
            msg('未找到这篇文章');
        }

        $this->title        = $data['article_title'] . ' - ' . $this->title;
        $this->keywords     = $data['article_title'] . ' - ' . $this->title;
        $this->description  = $data['article_title'] . ' - ' . $this->title;

        $this->assign('title', $this->title);
        $this->assign('keywords', $this->keywords);
        $this->assign('description', $this->description);
    	$this->assign('data', $data);

    	return view();
    }

    

}
