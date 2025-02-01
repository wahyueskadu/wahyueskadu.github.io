
questionCount = 15;
questionTypeList = ['bertolak belakang','sehadap','dalam berseberangan','luar berseberangan','dalam sepihak','luar sepihak']
answerList = ['65872143','34127856','#76##32#','8##54##1','#32##76#','4##18##5']

function getSoal(){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
  //  qArray = {};
    makeDivider(`Soal ${questionProgress} dari ${questionCount}`);

  

   getsoalA();
}

function getsoalB(){


}

function getSoalA(questionKind){


   
    let questionType = getIntegerNZ(1,6);

    answerListTemp = answerList[questionType-1];
    let initialAngle = 1;
    let initialAnswer;
    do{
        initialAngle = getIntegerNZ (1,6);
        initialAnswer = answerListTemp[initialAngle-1];
    } while (initialAnswer === '#');

    //const
    questionTypeText = questionTypeList[questionType-1];
    questionTypeText = questionTypeText.toLowerCase(); 

    const bubble = makeBubbleBlank();

    if (true){
       labelList = ['12345678','abcdefgh','12563478','abefcdgh'];

        //add special label
        leftSide = [1,2,5,6];
        if (questionType > 2){
            if(leftSide.includes(initialAngle)){
                    labelList.push('  12  34','  ab  cd');
                    labelList.push('  12  34','  ab  cd');
            } else {
                    labelList.push('12  34  ','ab  cd  ');
                    labelList.push('12  34  ','ab  cd  ');
            }
        }
        rnd = getInteger(0,labelList.length-1);
        label = labelList[rnd];

        displayAngle = label[initialAngle-1];
        if (displayAngle == ' ') {
            displayAngle = 'x'
            label = replaceChar(label,initialAngle-1,'x');
        };
        displayAnswer = label[initialAnswer-1];
        append(bubble,makeText(`Sudut yang merupakan sudut ${questionTypeText} dengan sudut ${displayAngle} adalah...`))
        const SVGContainer = makeSVG();
    
        append(SVGContainer,makeSVGBg());
        append(SVGContainer,makeSVGPath (`M 10 60 h 200`));
        skewType = getInteger(0,1);

        if (skewType == 0){
            append(SVGContainer,makeParallel());
            makeParallelText(SVGContainer,label); 
        } else {
            append(SVGContainer,makeParallel(undefined,undefined,30));
            makeParallelText(SVGContainer,label,skewType); 
        }
          
    bubble.appendChild (SVGContainer);
    }
    chatContainer.appendChild(bubble);
 
    qArray.initialAngle = initialAngle;
    qArray.initalAnswer = initialAnswer;
    qArray.displayAngle = displayAngle;
    qArray.displayAnswer = displayAnswer;
    qArray.questionType = questionType;
    qArray.label = label;
    }

function getHelp(){
    relation = whatRelation();
    if (relation != false){
        relation = questionTypeList[relation];
    }

    if (input.length != 1) {
        makeBubbleBot('Jawaban berupa satu digit/huruf. Misal: a, b, 1, 2, ...');
        attemptAnswer += 1;
    //} else if (attemptAnswer == 1){
    //    makeBubbleBot('Jawaban kamu belum benar, coba lagi.')
    } else if (relation == false){
    questionHelpList = [
        'Ingat, sudut yang saling bertolak belakang nempel di bagian belakangnya',
        'Ingat, sudut yang sehadap arahnya sama.',
        'Ingat, sudut dalam artinya berada di antara dua garis pararel',
        'Ingat, sudut luar artinya tidak berada di antara dua garis pararel',
        'Ingat, sudut dalam artinya berada di antara dua garis pararel',
        'Ingat, sudut luar artinya tidak berada di antara dua garis pararel'];
    makeBubbleBot('Jawaban masih kurang tepat');
    makeBubbleBot(questionHelpList[qArray.questionType-1]);   
    makeBubbleBot('Coba lagi')
    } else {
        makeBubbleBot(`Hubungan antara ${displayAngle} dan ${input} adalah sudut ${relation}, jadi jawaban kamu belum tepat`);
        makeBubbleBot('Coba lagi')
    }
}

function whatRelation(){
    const ax = qArray.initialAngle;
    bx = findCharacterPosition( qArray.label,input)+1;
    for (i=0; i < answerList.length; i++){
        list = answerList[i];
        if (list[ax-1] == bx){
            result = i
          //  result = result.toLowerCase();
        }
    }
    return result
}



function isItTrue(){
    result = (input == qArray.displayAnswer)
    return result
}
