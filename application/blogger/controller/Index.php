<?php
namespace app\blogger\controller;

use Exception;
use think\db;
use think\Cache;
use think\Validate;
use think\Controller;
use app\blogger\model\user;

class Index extends Controller
{
    private $DbList = [];

    public function _initialize()
    {
        
    }

    /**
     * 初始化所需要的类
     * @param
     * @author staitc7 <static7@qq.com>
     * @return mixed
     */
    public function getInstance($class) 
    {
        // 如果类存在则返回其实例
        $this->DbList[$db] = model($class);
    }

    /**
     * 初始化所需要的类
     * @param
     * @author staitc7 <static7@qq.com>
     * @return mixed
     */
    public function getDbList($DbList) 
    {
        // 判断参数是否是数组
        if (is_array($DbList))
        {
            foreach ($DbList as $db) {
                if (empty($this->DbList[$db]))
                {
                    $db = ucfirst($db);
                    $this->getInstance($db);
                }
            }
        }
        else if (is_string($DbList))
        {
            if (empty($this->DbList[$db]))
            {
                $this->getInstance($db);
            }
        }
        else
        {
            throw new Exception('参数类型错误：参数不是 string 或 array 类型', 100001);
        }
    }

    /**
     * tp5邮件
     * @param
     * @author staitc7 <static7@qq.com>
     * @return mixed
     */
    public function sendEmail($toemail, $name, $token) 
    {
        $subject  = '小罗博客邮箱激活';
        $content  = '<div style="line-height: 200%;"><p>尊敬的<span style="color:red">' . $name . '</span>用户：</p>';
        $content .= '<p style="text-indent: 2em;">恭喜您成为小罗博客的博主，这是一封注册认证邮件，请点击以下链接确认：</p>';
        $content .= '<p style="text-indent: 2em;">' . url('blogger/index/email_confirm', array('token' => $token), true, true) . '</p>';
        $content .= '<p style="text-indent: 2em;">如果链接不能点击，请复制到浏览器，然后直接打开。</p>';
        $content .= '<p style="text-indent: 2em;">上诉链接30分钟有效。如果链接失效，请您登录网站 ' . base_url() . url('blogger/index/register') . ' 重新注册。</p>';
        $content .= '<p style="text-indent: 2em;">感谢您注册小罗博客。</p></div>';
        
        return send_mail($toemail, $name, $subject, $content);
    }

    public function login()
    {
    	// 临时关闭当前模板的布局功能
       	$this->view->engine->layout(false);
    	return view();
    }

    public function loginPost()
    {
        $post = input('post.');

        // 验证数据是否合法
        //$this->loginValidate($post);

        // 实例化model
        $this->getDbList(['user','userInfo','userPassword','userData','userLogin']);

        // 判断账号是否存在
        $user_id = $this->checkIsAccount($post);

        if (!$user_id)
        {
            msg('账号密码错误，请重新登录', url('blogger/index/login'));
        }

        // 查询数据
        $user_info = $this->getUserFind($user_id);

        // 登录成功
        session('user_id', $user_id);

        $user_info = $this->getUserFind($user_id);

        session('user_info', $user_info);

        msg('登录成功', url('index/index'));


    }

    protected function loginValidate($post) 
    {
        
        $rule = [
            'account'   => 'require',
            'password'  => 'require|min:6',
            'captcha|code'=>'require|captcha'
        ];

        $data = [
            'account'       => $post['account'],
            'password'      => $post['password'],
            'captcha'       => $post['code'],
        ];

        $message  =   [
            'account.require'       => '账号不能为空',  
            'password.require'      => '密码不能为空', 
            'password.min'          => '密码长度不能小于6位',
            'captcha.require'       => '验证码不能为空',
            'captcha.captcha'       => '验证码不正确',
        ];

        $validate = new Validate($rule, $message);

        $result   = $validate->check($data);

        if(!$result){
            msg($validate->getError(), url('blogger/index/login'));
        }

        return true;
    }

    public function register()
    {
        // 临时关闭当前模板的布局功能
        $this->view->engine->layout(false);
    	return view();
    }

    protected function getPasswordInfo(int $user_id)
    {
        $where_password['user_id'] = $user_id;

        $field = 'salt,password';

        $password = new UserPassword();

        $password_info = $password->where($where_password)->field($field)->find();

        return $password_info;
    }



    /**
     * 操作密码
     * @param int       $len                   [订单长度]
     * @return string
     */
    public function OperationPassword($type, $password, $salt = null)
    {
        if (empty($type))
        {
            return false;
        }

        $pass = '';

        if ($type == 1)
        {
            // 注册，获取密码盐
            $salt = generateRandomLen(6);

            // 加密密码
            $pass['password'] = md5(md5($password) . $salt);
            $pass['salt'] = $salt;
        }
        else if ($type == 2)
        {
            if (empty($salt))
            {
                return false;
            }
            // 加密密码
            $pass = md5(md5($password) . $salt);
        }

        return $pass;
    }

    /**
     * 验证密码
     * @param int       $len                   [订单长度]
     * @return string
     */
    public function AuthPassword($user_id, $password)
    {
        $password = $this->getPasswordInfo($user_id);
                
        $rpassword = $this->OperationPassword(2, $password, $password['salt']);

        if ($rpassword != $password['password'])
        {
            msg('账号密码不正确', url('blogger/index/register'));
        }
    }

    protected function checkIsAccount($post, $type = 1)
    {
        $where_account['user_account'] = $post['account'];

        $user_id = $user->where($where_account)->getField('user_id');

        if ($user_id)
        {
            if ($type == 1)
            {
                msg('该账号已经被注册', url('blogger/index/register'));
            }
            else
            {
                $this->AuthPassword($user_id, $post['password']);
            }
            return $user_id;
        }

        $where_email['user_email'] = $post['email'];

        $user_id = $user->where($where_email)->getField('user_id');

        if ($user_id)
        {
            if ($type == 1)
            {
                msg('该账号已经被注册', url('blogger/index/register'));
            }
            else
            {
                $this->AuthPassword($user_id, $post['password']);
            }
            return $user_id;
        }

        if ($type == 1)
        {
            return true;
        }

        return false;

    }

    public function register_add()
    {
        $post = input('post.');

        //$this->registerValidate($post);

        $this->checkIsAccount($post);

        $time = time();

        //生成秘钥
        $token = strtolower(md5($post['email'] . $post['account'] . $time . 'xiaoluoblog'));
        
        // 发送邮件
        if (!$this->sendEmail($post['email'], $post['account'], $token))
        {
            msg('激活邮件发送失败，请重新注册');
        }

        // 生成注册信息
        $data['account']            = $post['account'];
        $data['email']              = $post['email'];
        $data['password']           = $post['password'];
        $data['token']              = $token;
        $data['old_time']           = time() + 1800;

        // 写入缓存
        session('registerEmailConfirm', $data);

        //$url = url('blogger/index/EmailConfirm', array('token' => $token), true, true);

        // 成功
        msg('注册成功，请在30分钟内去邮箱中激活账号！', url('index/index'));
        //msg('注册成功，请在30分钟内去邮箱中激活账号！', $url);

    }

    protected function registerValidate($post) 
    {
        
        $rule = [
            'account'   => 'require|max:15',
            'email'     => 'require|email',
            'password'  => 'require|alphaDash|min:6|max:24',
            'rpassword' => 'require|confirm:password',
            'captcha|code'=>'require|captcha'
        ];

        $data = [
            'account'       => $post['account'],
            'email'         => $post['email'],
            'password'      => $post['password'],
            'rpassword'     => $post['rpassword'],
            'captcha'       => $post['code'],
        ];

        $message  =   [
            'account.require'       => '账号必须',
            'account.max'           => '账号最多不能超过15个字符',
            'email.require'         => '邮箱不能为空',
            'email'                 => '邮箱格式错误',    
            'password.require'      => '密码不能为空', 
            'password.alphaDash'    => '密码必须是字母或者数字',
            'password.min'          => '密码长度不能小于6位',
            'password.max'          => '密码长度不能大于24位',
            'rpassword.require'     => '新密码不能为空',
            'rpassword.confirm'     => '新密码和密码不一致',
            'captcha.require'          => '验证码不能为空',
            'captcha.captcha'          => '验证码不正确',
        ];

        $validate = new Validate($rule, $message);

        $result   = $validate->check($data);

        if(!$result){
            msg($validate->getError(), url('blogger/index/register'));
        }
    }

    public function EmailConfirm()
    {

        // 获取数据
        $token = input('token');

        // 判断token是否为空或者邮箱验证session是否为空
        if (empty($token) || !session('?registerEmailConfirm'))
        {
            msg('无效链接', url('index/index'));
        }

        // 获取数据
        $data = session('registerEmailConfirm');

        // 验证信息
        if ($data['token'] != $token || $data['old_time'] < time())
        {
            // 清空原有的登录信息
            session('registerEmailConfirm', null);
            msg('无效链接', url('index/index'));
        }

        $time = time();

        $dbuser = db('user');

        // 开启事务
        $dbuser->startTrans();

        // 添加注册记录
        $user = new User();

        $user->user_account         = $data['account'];
        $user->user_email           = $data['email'];
        $user->user_create_time     = $time;
        $user->user_last_time       = $time;
        $user->user_last_ip         = getIP();
        $user->user_status          = 1;

        $info = $user->save();

        if ($info === false || $info === 0)
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        $user_id = $user->user_id;

        $pass = $this->OperationPassword(1, $data['password']);

        if (!is_array($pass))
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        // 添加密码记录
        $userPassword = new UserPassword();

        $userPassword->user_id      = $user_id;
        $userPassword->salt         = $pass['salt'];
        $userPassword->password     = $pass['password'];
        $userPassword->last_time    = $time;

        $up_id = $userPassword->save();

        if ($up_id === false || $up_id === 0)
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        // 添加用户信息
        $userInfo = new UserInfo();

        $userinfo['user_avatar'] = base_url() . 'public/Home/images/default_avatar.png';

        $userInfo->user_id      = $user_id;
        $userInfo->user_name    = $data['account'];
        $userInfo->user_avatar  = $userinfo['user_avatar'];
        $userInfo->user_sex     = 0;
        $userInfo->user_info_last_time = $time;

        $ui_id = $userInfo->save();

        if ($ui_id === false || $ui_id === 0)
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        // 添加用户数据信息记录
        $userData = new UserData();

        $userData->user_id      = $user_id;

        $ud_id = $userData->save();

        if ($ud_id === false || $ud_id === 0)
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        // 添加登录记录
        $userLogin = new UserLogin();

        // 获取登录IP和城市
        $ip = getIP();

        if (!$address = getIPLoc_sina($ip))
        {
            $address = '无';
        }

        $userLogin->user_id = $user_id;
        $userLogin->user_account = $data['account'];
        $userLogin->last_ip = $ip;
        $userLogin->last_time = $time;
        $userLogin->last_address = $address;

        $ul_id = $userLogin->save();

        if ($ul_id === false || $ul_id === 0)
        {
            $dbuser->rollback();
            msg('网络繁忙，请稍后重试');
        }

        // 提交事务
        $dbuser->commit();
        session('registerEmailConfirm',null);

        // 注册成功，自动登录
        session('user_id', $user_id);

        $user_info = $this->getUserFind($user_id);

        session('user_info', $user_info);

        msg('认证成功', url('index/index'));

    }

    public function getCaptcha()
    {
        // 验证码
        $captcha = new \think\captcha\Captcha();

        $captcha->codeSet = '0123456789'; 
        $captcha->fontSize = 20;
        $captcha->length   = 4;
        $captcha->imageH   = 40;
        $captcha->imageW   = 160;

        return $captcha->entry();
    }

    

}
