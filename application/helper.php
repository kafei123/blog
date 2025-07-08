<?php

//引入CI框架方法
function base_url()
{
    if (isset($_SERVER['HTTP_HOST']) && preg_match('/^((\[[0-9a-f:]+\])|(\d{1,3}(\.\d{1,3}){3})|[a-z0-9\-\.]+)(:\d+)?$/i', $_SERVER['HTTP_HOST']))
    {
        $base_url = ('http://'.$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, strpos($_SERVER['SCRIPT_NAME'], basename($_SERVER['SCRIPT_FILENAME']))));
    }
    else
    {
        $base_url = 'http://localhost/';
    }
    return $base_url;
}

// 弹窗提示并跳转(需点击确定)
function msg($msg, $url = '')
{
    echo "<meta charset='utf-8'>";
    $scriptStr = "<script>alert('".$msg."');";

    if($url == ''){
      $scriptStr .= "window.history.back();";
    }else{
      $scriptStr .= "window.location.href='".$url."';";
    }

    $scriptStr .= "document.onmousedown=click;</script>";
    echo $scriptStr;
    exit();
}

/**
 * [getip 获取用户ip]
 * @return [type] [description]
 */
/**
 * 获取用户真实 IP
 */
function getIP()
{
    static $realip;
    if (isset($_SERVER)){
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $realip = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            $realip = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $realip = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv("HTTP_X_FORWARDED_FOR")){
            $realip = getenv("HTTP_X_FORWARDED_FOR");
        } else if (getenv("HTTP_CLIENT_IP")) {
            $realip = getenv("HTTP_CLIENT_IP");
        } else {
            $realip = getenv("REMOTE_ADDR");
        }
    }
    return $realip;
}

/**
 * [getIPLoc_sina 通过ip查找城市 ]
 * @param  [type] $queryIP [description]
 * @return [type]          [description]
 */
function getIPLoc_sina($queryIP){ 
    $url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=' . $queryIP; 
    $ch = curl_init($url);//初始化url地址 
    curl_setopt($ch, CURLOPT_ENCODING, 'utf8');//设置一个cURL传输选项 
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 获取数据返回 
    $location = curl_exec($ch);//执行一个cURL会话 
    $location = json_decode($location);//对 JSON 格式的字符串进行编码 
    curl_close($ch);//关闭一个cURL会话 
    $loc = ""; 
    if ($location === FALSE || $location < 0) return FALSE;  // 地址不正确
    if (empty($location->desc)) { 
        $loc = $location->city;
    } else { $loc = $location->desc;} 
    return $loc; 
}

/**
 * 系统邮件发送函数
 * @param string $tomail 接收邮件者邮箱
 * @param string $name 接收邮件者名称
 * @param string $subject 邮件主题
 * @param string $body 邮件内容
 * @param string $attachment 附件列表
 * @return boolean
 * @author static7 <static7@qq.com>
 */
function send_mail($tomail, $name, $subject = '', $body = '', $attachment = null) {
    $mail = new \PHPMailer\PHPMailer\PHPMailer();           //实例化PHPMailer对象
    $mail->CharSet = 'UTF-8';           //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
    $mail->IsSMTP();                    // 设定使用SMTP服务
    $mail->SMTPDebug = 0;               // SMTP调试功能 0=关闭 1 = 错误和消息 2 = 消息
    $mail->SMTPAuth = true;             // 启用 SMTP 验证功能
    $mail->SMTPSecure = 'false';          // 使用安全协议
    $mail->Host = "smtp.163.com"; // SMTP 服务器
    $mail->Port = 25;                  // SMTP服务器的端口号
    $mail->Username = "kafeiwudeshaonian@163.com";    // SMTP服务器用户名
    $mail->Password = "kafei123";     // SMTP服务器密码
    $mail->SetFrom('kafeiwudeshaonian@163.com', '小罗博客');
    $replyEmail = '';                   //留空则为发件人EMAIL
    $replyName = '';                    //回复名称（留空则为发件人名称）
    $mail->AddReplyTo($replyEmail, $replyName);
    $mail->Subject = $subject;
    $mail->MsgHTML($body);
    $mail->AddAddress($tomail, $name);
    if (is_array($attachment)) { // 添加附件
        foreach ($attachment as $file) {
            is_file($file) && $mail->AddAttachment($file);
        }
    }
    return $mail->Send() ? true : $mail->ErrorInfo;
}

/**
 * 生成随机数函数
 * @param int    $len                   [订单长度]
 */
function generateRandomLen($len){
    // 随机数列表
    $random                 = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // 获取随机数长度
    $random_len             = strlen($random)-1;
    // 初始化流水号
    $str2                   = '';

    if($len > 0){
        for($i = 0; $i < $len; $i++){
            $str2 .= $random[mt_rand(0,$random_len)];
        }
    }

    return $str2;
}


/**
 * 生成随机数字函数
 * @param int    $len                   [订单长度]
 */
function generateRandomNumLen($len){
    // 随机数列表
    $random                 = '1234567890';
    // 获取随机数长度
    $random_len             = strlen($random)-1;
    // 初始化流水号
    $str2                   = '';

    if($len > 0){
        for($i = 0; $i < $len; $i++){
            $str2 .= $random[mt_rand(0,$random_len)];
        }
    }

    return $str2;
}

?>