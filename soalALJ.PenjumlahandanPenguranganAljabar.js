
questionCount = 15;
questionTypeList = questionTypeList = ['Bertolak Belakang','Sehadap','Dalam Berseberangan','Luar Berseberangan','Dalam Sepihak','Luar Sepihak']
answerList = ['65872143','34127856','#76##32#','8##54##1','#32##76#','4##18##5']

function getSoal(questionKind){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
  //  qArray = {};
    makeDivider(`Soal ${questionProgress} dari ${questionCount}`);
    let x1 = getIntegerNZ(-9,9);
    let x2 = getIntegerNZ(-9,9);
    do{
    x2 = getIntegerNZ(-9,9);
    } while (x1 + x2 == 0);
    let c1 = getIntegerNZ(-9,9);
    let c2 = getIntegerNZ(-9,9);
    do{
        c2 = getIntegerNZ(-9,9);
    } while (c1 + c2 == 0);
    soal = `${x1}x + ${c1} + ${x2}x + ${c2}`
    soal = pretty(soal)
    makeBubbleBot(soal + ` = ...`)

    ansx = x1+x2
    ansc = c1+c2
    ans = `${ansx}x + ${ansc}`
    ans = pretty(ans)
    qArray.x1 = x1;
    qArray.x2 = x2;
    qArray.c1 = c1;
    qArray.c2 = c2;
    qArray.ansx = ansx;
    qArray.ansc = ansc;
    qArray.soal = soal;
    qArray.displayAnswer = ans;
    }

function getHelp(){
   if (attemptAnswer == 1){
        makeBubbleBot('Jawaban kamu belum benar, coba lagi.')
    } else {
     //   makeBubbleBot(`Hubungan antara ${displayAngle} dan ${input} adalah ${relation}, jadi jawaban kamu belum tepat`);
        makeBubbleBot('Coba lagi')
    }
}

function whatRelation(){
    const ax = qArray.initialAngle;
    bx = findCharacterPosition( qArray.label,input)+1;
    for (i=0; i < answerList.length; i++){
        list = answerList[i];
        if (list[ax-1] == bx){
            result = questionTypeList[i];
            result = result.toLowerCase();
        }
    }
    return result
}



function isItTrue(){
    result = (ugly(input) == ugly(qArray.displayAnswer))
    return result
}

function pretty(text){
    let texted = text.replaceAll("+ -","– ");
          texted = texted.replace(" -","– ");
          texted = " "+texted;
          texted = texted.replaceAll(" 1x"," x");
      texted = texted.replaceAll(" –1x"," –x");
      texted = texted.replaceAll(" -1x"," –x");
       return texted;}

function ugly(text){
    text = text.replaceAll(/\s+/g,'');
	text = text.replaceAll("–","-");
    return text
}