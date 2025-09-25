function letsGo(url){
    window.location.href = url;
}

function letsStart(){
    //makeBubbleBot('Hello!');
    //makeBubbleBot('Sebelum memulai belajar, kita kenalan dulu');
    //makeBubbleBot('Siapa namamu? Nama panggilan saja.');
   // inputNow = 'soal';
   letsTest();
}

function letsRestart(){
    diplayUser.textContent = `Hi, User`;
    namaSiswa = ``;
    kelasSiswa = ``;
    nomorSiswa = ``;
    chatContainer.innerHTML = '';
    letsStart()
}

function letsTest(){
    inputNow = 'soal';
    questionProgress = 1;
    firstTry = 0;
    attemptAnswer = 0
   // makeBubbleBot(`Sekarang kita lanjut ke soal.`);
    getSoal(1);
}

    /* Constants and Variables */

    const chatContainer = document.querySelector(".chatContainer"); 
    const inputMsg = document.getElementById("inputMsg");
    const diplayUser = document.getElementById("displayUser");
    let questionProgress, attemptAnswer, firstTry, resultTime;
    let startTime, inputNow, questionCount;
    const qArray = {};
    const userID = {};


/////////////////////////////////////////////////////////////////////* Form and Params */   
/* Form Thing */
const scriptURL = `https://script.google.com/macros/s/AKfycbxOP-imsb87LEVfV_u_DH89KO6Z0-AFi3KRigVGLgPgtnTAnvGbn1C21uBawClwcAjB/exec`
const form = document.forms['sendForm']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => makeBubbleBot('Jawaban kamu berhasil dikirim'))
    .catch(error => makeBubbleBot('Jawaban kamu belum berhasil dikirim'))
})

function submitForm() {
    const inp = document.getElementById('formInput')
    inp.value = `${namaSiswa}#${kelasSiswa}#${nomorSiswa}#${firstTry}#${resultTime}#${url}`;
    const e = new Event('submit', { cancelable: true });
    form.dispatchEvent(e);
}



/////////////////////////////////////////////////////////////////////* Displays */

function append(parent,child){
    parent.appendChild(child);
}
//create element p
function makeText(text){
    const textP = document.createElement("p");
    textP.textContent = text;
    return textP;
}

//blank bubble
function makeBubbleBlank(){
const msgDiv = document.createElement('div');
msgDiv.classList.add ('msgBot', 'msg');
return msgDiv;
}

//display userbubble
function makeBubbleUser(text , bubbletype="msgUser"){
    const textbubble = document.createElement("div");
    textbubble.classList.add ("msg",bubbletype);
    textbubbletext = makeText(text);
    textbubble.appendChild(textbubbletext);
    chatContainer.appendChild(textbubble);
}

//display bot bubble
function makeBubbleBot(text){
    makeBubbleUser(text,'msgBot');
}

//display divider    
function makeDivider(text){
    const divider = document.createElement("p");
    divider.classList.add ("divider");
    divider.textContent = text;
    chatContainer.appendChild(divider);
}

//display toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
        toast.classList.add('toastshow');

    setTimeout(() => {
        toast.classList.remove('toastshow');
    }, 3000); // Hide toast after 3 seconds
    }

    function scrollToLastDivider() {
        const dividers = document.querySelectorAll('.divider'); 
        if (dividers.length > 0) { 
            const lastDivider = dividers[dividers.length - 1]; 
            lastDivider.scrollIntoView({ behavior: 'smooth' }); 
        }
    }
    
/////////////////////////////////////////////////////////////////////*SVGs function*/

function makeSVG (height = 120, width = 220){
    const msgSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    msgSVG.setAttribute('height', height);
    msgSVG.setAttribute('width',  width);
    let h = height - 20;
    let w = height - 20;
    msgSVG.setAttribute('viewbox', `0 0 ${h} ${w}`);
    return msgSVG;
}

function makeSVGBg (){
    const msgBg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    msgBg.setAttribute ('d',roundedRectanglePath());
    msgBg.classList.add ('svgbg')
    return msgBg;
}

function makeSVGPath (d){
    const msgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    msgPath.setAttribute ('d',d);
    msgPath.classList.add ('svgline');
    return msgPath;
}

function makeSVGText (text, x=100, y=100,xalign='middle',yalign='middle'){
    const msgLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    msgLabel.setAttribute ('x',x);
    msgLabel.setAttribute ('y',y);
    msgLabel.textContent = text;
    msgLabel.classList.add ('svgtext');
    // Set text-anchor to "middle"
    msgLabel.setAttribute('text-anchor', xalign); 

    // Set dominant-baseline to "middle"
    msgLabel.setAttribute('dominant-baseline', yalign); 
    return msgLabel
}

function makeParallel(width = 130, height = 100, skew = -30){
    if (skew < 0){width += 2*skew}
    let x1start = (220-width)/2
    let x2start = 220-x1start-skew;
    path = makeSVGPath(`m ${x1start} 10 l ${skew} 100 M ${x2start} 10 l ${skew} 100`);
    return path
}
function makeParallelText(SVGContainer,text='12345678',type=0){

    let coordList
    switch (type) {
        case 0:
        coordList = [[55,50],[70,50],[155,50],[170,50],[50,75],[65,75],[150,75],[165,75]];
        break;
        case 1:
        coordList = [[50,50],[65,50],[150,50],[165,50],[55,75],[70,75],[155,75],[170,75]];
        break;
    }
  //  text = ['aa','bb','ccppp','dd','ee','eef','gg','hh']
    alignList = ['end','start'];;;;;;;;;;;;;;;;;;;;
    for (let i = 0; i < 8; i++){
        coord = coordList[i];
        append(SVGContainer,makeSVGText(text[i],coord[0],coord[1],alignList[i%2]))
    }
}

//rounded rectangle
function roundedRectanglePath(x = 0, y = 0, width = 220, height = 120, radius = 5) {
if (radius > Math.min(width, height) / 2) {
    radius = Math.min(width, height) / 2; // Ensure radius doesn't exceed half the shortest side
}
return `M ${x + radius} ${y} ` +
        `h ${width - 2 * radius} ` +
        `a ${radius} ${radius} 0 0 1 ${radius} ${radius} ` +
        `v ${height - 2 * radius} ` +
        `a ${radius} ${radius} 0 0 1 -${radius} ${radius} ` +
        `h -${width - 2 * radius} ` +
        `a ${radius} ${radius} 0 0 1 -${radius} -${radius} ` +
        `v -${height - 2 * radius} ` +
        `a ${radius} ${radius} 0 0 1 ${radius} -${radius} z`;
}

/////////////////////////////////////////////////////////////////////*General Functions*/

//Empty Objects//
function emptyObject(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
        delete obj[key];
        }
    }
}


function getIntegerNZ(min, max) {
    let randomNum;
    do {
        randomNum = getInteger(min,max);
    } while (randomNum === 0);
    return randomNum;
}


function getInteger(min,max){
    let randomNuml
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

function replaceChar(str, index, replacement) {
      if (index < 0 || index >= str.length) {
          return str; // Handle invalid index
      }
      return str.substring(0, index) + replacement + str.substring(index + 1);
      }


    /* Input Handling */

    //when enter pressed, it sort of press the send button
    function handleEnter(event) {
        if (event.key === 'Enter'){ 
        sendInput(); 
        }
    }

    //set what happens when button pressed
    function sendInput(){
        //getSoal();
        //if input return immediately
        if (inputMsg.value.trim() == '' & inputNow != 'selesai') {
            showToast('Kotak input tidak boleh kosong');   
            return;
        }
        makeBubbleUser(inputMsg.value);
        switch (inputNow) {
            case 'nama':
                namaSiswa = inputMsg.value;
                diplayUser.textContent = `Hi, ${namaSiswa}`
                inputNow = 'kelas';
                makeBubbleBot(`hi ${namaSiswa}`);
                makeBubbleBot(`Kamu di kelas 7 apa?`);
                break
            case 'kelas':
                kelasSiswa = inputMsg.value;
                inputNow = 'absen';
                makeBubbleBot(`Nomor absen kamu?`);
                break
            case 'absen':
                nomorSiswa = inputMsg.value;
                diplayUser.textContent += `(${kelasSiswa}/${nomorSiswa})`;
                inputNow = 'soal';
                questionProgress = 1;
                makeBubbleBot(`Sekarang kita lanjut ke soal.`);
                firstTry = 0;
                getSoal(1);
                break
            case 'soal':
                checkAnswer();
                break
            case 'selesai':
                chatContainer.innerHTML = ''
                letsTest();
            }
         inputMsg.value = "";
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
        inputMsg.focus();
        window.scrollTo(0, window.scrollHeight);
        }

        function checkAnswer(){
        input = inputMsg.value;
        input = input.toLowerCase()
        input.trim();
        if (input == 'minta jawaban' & attemptAnswer>5){
            makeBubbleBot(`Jawabannya adalah ${qArray.displayAnswer}.`);
            makeBubbleBot(`ketik dan kirim jawaban untuk melanjutkan ke soal berikutnya`);
        } else if (isItTrue()) {
            makeBubbleBot('Jawaban kamu benar');
            questionProgress += 1;
            if (attemptAnswer == 0){
                firstTry +=1
            }
            attemptAnswer = 0;
            if (questionProgress <= questionCount){
                getSoal();
            } else {
                printResult();
                //chatContainer.innerHTML = "";    
            }
        } else {
            attemptAnswer += 1;
            getHelp(attemptAnswer)
            if (attemptAnswer > 5){
                makeBubbleBot('Kesulitan? ketik "Minta Jawaban" untuk melihat jawabannya')
            }
        }
    }

    function printResult(){
        makeDivider('Hasil Pekerjaan Kamu');

        resultTime = printTime();
        //submitForm();
        if (firstTry == 0) {
            makeBubbleBot (`Yah, kamu belum bisa mengerjakan tanpa bantuan 😢🥺`);
            makeBubbleBot('Yuk, coba lagi dengan menekan enter');
        } else {
            makeBubbleBot(`Selamat, kamu berhasil mengerjakan ${firstTry} soal tanpa bantuan 🥳`);
            if (firstTry == questionCount){
                makeBubbleBot(`Kamu selesai dalam waktu ${resultTime}!`);
                makeBubbleBot(`Bisakah kamu menyelesaikan lebih cepat? Yuk, coba lagi dengan menekan enter`)
            } else {
                makeBubbleBot(`Bisakah kamu menyelesaikan semua soal tanpa bantuan?`);
                makeBubbleBot('Yuk, coba lagi dengan menekan enter');
            }
        }
       
        inputNow = 'selesai';
    }

    function printTime() { 
      const endTime = Date.now();
      const elapsedTime = endTime - startTime; 

      const minutes = Math.floor(elapsedTime / 60000); 
      const seconds = Math.floor((elapsedTime % 60000) / 1000);

      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; 
      return formattedTime;
    }


function fetchChapterInfo(JSONData){
    fetch('test.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the JSON data here
    console.log(data); 

    // Example: Accessing data from the JSON object
    for (const item of data) {
     const pp = document.getElementById('pp');
     pp.textContent = JSON.stringify(data);
    }
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}

function findCharacterPosition(string, character) {
    const position = string.indexOf(character);
  
    if (position !== -1) {
      return position;
    } else {
      return -1; 
    }
  }

 
