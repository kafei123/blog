/**
 * Created by Administrator on 2016/9/14.
 */
/*
 * �ֻ��˶�̬����html font-size
 * time 2016-9-6 16:23:05
 * author  talon
 * desc ���ͼ��Ȱ�750
 * */

/*===============================================================================================*/
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        if(windowWidth > 1024) windowWidth = 1024;	//ipad 768x1024
        html.style.fontSize = windowWidth / 7.5 + 'px';
        // �ȼ���html.style.fontSize = windowWidth / 640 * 100 + 'px';


        // ���6.4���Ǹ�����Ƹ�ĺ�������ȷ���ģ����������Ƹ���750

        // ��ô html.style.fontSize = windowWidth / 7.5 + 'px'
    }, false);

})();
//���ڸı�ִ��
window.onresize=function(){
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    if(windowWidth > 1024) windowWidth = 1024;	//ipad 768x1024
    html.style.fontSize = windowWidth / 7.5 + 'px';
};
/*$(window).resize(function(){
 var html = document.documentElement;
 var windowWidth = html.clientWidth;
 html.style.fontSize = windowWidth / 7.5 + 'px';
 });
 */

/*===============================================================================================*/
/*function setFontSize(){
 var deviceWidth = document.documentElement.clientWidth;//
 //if(deviceWidth > 768) deviceWidth = 768;//ipad 768px
 if(deviceWidth > 1024) deviceWidth = 1024;//ipad 768px
 document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';		//7.5=���ͼ���/100
 }


 //*��һ�ֵ��� jquery
 $(function(){setFontSize();});
 $(window).resize(setFontSize);
 */
/*===============================================================================================*/
//*�ڶ��ֵ��ã���js
//ģ��jquery $(document).ready()
/*
 document.ready = function (callback) {
 ///����FF,Google
 if (document.addEventListener) {
 document.addEventListener('DOMContentLoaded', function () {
 document.removeEventListener('DOMContentLoaded', arguments.callee, false);
 callback();
 }, false)
 }
 //����IE
 else if (document.attachEvent) {
 document.attachEvent('onreadytstatechange', function () {
 if (document.readyState == "complete") {
 document.detachEvent("onreadystatechange", arguments.callee);
 callback();
 }
 })
 }
 else if (document.lastChild == document.body) {
 callback();
 }
 };

 //DOM�ṹ������Ϻ��ִ��
 document.ready(setFontSize);	//�ȼ��� document.ready(function(){ setFontSize(); });

 //���ڸı�ִ��
 window.onresize=function(){ setFontSize();};
 */
