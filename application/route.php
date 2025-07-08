<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

use think\Route;

Route::any('/', 'index/index');

Route::get('search', 'index/search');

Route::any('list/:type', 'index/articleList');

Route::get('detail/:id', 'index/detail');

Route::any('login', 'blogger/index/login');

Route::any('loginPost', 'blogger/Index/loginPost');

Route::any('register', 'blogger/index/register');

Route::post('registerAdd', 'blogger/index/register_add');

Route::get('registerConfirm/:token', 'blogger/index/EmailConfirm');

Route::any('Captcha', 'blogger/index/getCaptcha');
