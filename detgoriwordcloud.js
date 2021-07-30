window.onload = function(){
    document.getElementById('wordcloud').addEventListener('click', event =>{
        wordcloud_process() /*function 내에서는 sync로 처리되니기 때문에 연결해서 사용하는 경우 하나의 펑션에 다른 펑션을 직접 넣어 연결하는게 간편 */
    })
}


function wordcloud_process(){
    var _data = {}
    var data = JSON.stringify(_data);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/xhr/wordcloud');
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status ===200){
            var result = JSON.parse(xhr.responseText)
            var word_list = result.word_list
            var wordcounts = wordcount(word_list)
            wordcloud(wordcounts)
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data)
}

function wordcount(word_list){
    var wordcount = {}
    var meaningless = ['때문', '수록', '이것']
    for(i=0; i < word_list.length; i++){
        if(word_list[i].length < 2 || meaningless.includes(word_list[i])){
        } else {
            if(!(word_list[i] in wordcount)){
                wordcount[word_list[i]] = 1;
            } else {
                wordcount[word_list[i]] += 1;
            }
        }
    }
    return wordcount
}


function setup() {
    var canvasDiv = document.getElementById('wc_box');
    var width = canvasDiv.offsetWidth;
    if (width > window.innerHeight-100){
        width = window.innerHeight-150
    }
    var myCanvas = createCanvas(width-30, width);
    myCanvas.parent("#wc_box");
    myCanvas.id('wordcloud')
    background(220);
}

function wordcloud(wordcounts){
    var canvasDiv = document.getElementById('wc_box');
    var width = canvasDiv.offsetWidth;
    if (width > window.innerHeight-100){
        width = window.innerHeight-150
    }
    background(220);
    for (key in wordcounts) {
        drawWords(key, wordcounts[key], width);
    }
}
  
function drawWords(word, size, widthStd) {
    // text() 함수에는 세 개의 매개 변수가 필요합니다:
    // 그려질 텍스트, 가로 위치, 그리고 세로 위치
    fill(random(255),random(255),0);
    textSize(size*widthStd*0.002);
    textAlign(CENTER, CENTER);
    text(word, random(widthStd*0.08, widthStd*0.88), random(widthStd*0.05, widthStd*0.95));
}
  