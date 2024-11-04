// ==UserScript==
// @name         备案查询
// @namespace    http://tampermonkey.net/
// @version      2024-11-04
// @description  try to take over the world!
// @author       You
// @match        https://beian.miit.gov.cn/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=miit.gov.cn
// @grant        none
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';
    //eval(GM_getResourceText(waitForKeyElements));
    waitForKeyElements('.tele-icon', getList);
    // Your code here...
})();

function getList(){
    var URLList = [];
    var originalParse = JSON.parse;
    //添加复制按钮
    var newDiv = document.createElement('input');
    newDiv.type = "text";
    //newDiv.value = "一键复制";
    //newDiv.onclick = function(){
       // alert(URLList);
    //}

    $(".header").after(newDiv);
    JSON.parse = function(text){
        console.log('----Hook JSON----');
        var A = originalParse(text);
        //开始对json处理，查找返回结果。
        try{
            if(A.params.endRow != undefined){
                A.params.list.forEach(function(item){
                    console.log(item.domain);
                    //var d = document.createElement("div");
                    //d.innerHTML = item.domain;
                    //var boxA = document.querySelector("#app > div > div.float-box.float-boxA");
                    //boxA.append(d);
                    URLList.push(item.domain);

                })
                newDiv.value = URLList;
                URLList = [];
            }
        }catch{
            return A;
        }
        return A;
    }

}
