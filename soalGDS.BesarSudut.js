
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

    valueQuestion = getInteger(20,70);
    const bubble = makeBubbleBlank()

       label = Array(8).fill('')
        displayAngle = label[initialAngle-1];
        label[initialAngle-1] = 'x'
       
        skewType = getInteger(0,1);;;;;;;;;;;;;
        skewness = (initialAnswer)%2+skewType+(initialAnswer>4);
        if (skewness == 1) { 
            valueQuestion = 180 - valueQuestion;
        }

        label[initialAnswer-1] = valueQuestion;

        if(questionType > 4){
            displayAnswer = 180 - valueQuestion;
        } else {
            displayAnswer = valueQuestion
        }

        append(bubble,makeText(`Perhatikan gambar berikut!`))
        const SVGContainer = makeSVG();
    
        append(SVGContainer,makeSVGBg());
        append(SVGContainer,makeSVGPath (`M 10 60 h 200`));
        

        if (skewType == 0){
            append(SVGContainer,makeParallel());
            makeParallelText(SVGContainer,label); 
        } else {
            append(SVGContainer,makeParallel(undefined,undefined,30));
            makeParallelText(SVGContainer,label,skewType); 
        }
          
    bubble.appendChild (SVGContainer);
    append(bubble,makeText('nilai x adalah...'))
    chatContainer.appendChild(bubble);
    
 
    qArray.initialAngle = initialAngle;
    qArray.initalAnswer = initialAnswer;
    qArray.displayAngle = displayAngle;
    qArray.displayAnswer = displayAnswer;
    qArray.questionType = questionType;
    qArray.label = label;
    }

function getHelp(){
    switch (attemptAnswer){
        case 1:
            makeBubbleBot('Jawaban kamu belum tepat, coba lagi!')
            break
        case 2:
            makeBubbleBot('Jawaban kamu belum tepat, perhatikan hubungan antara dua sudut tersebut')
            makeBubbleBot('Coba lagi')
            break;
        case 3:
            makeBubbleBot(`Hubungan kedua sudut adalah ${questionTypeList[qArray.questionType-1]}. Sekarang ingat kembali bagaimana besar sudutnya.`)
            makeBubbleBot('Coba lagi')
            break;
        case 4:
            if (qArray.questionType-1 >4) {
                besaranSudut = 'pelurus'
            } else { besaranSudut = 'sama'}
            makeBubbleBot(`Besar sudur yang saling ${questionTypeList[qArray.questionType-1]} adalah ${besaranSudut}`)
        default:
            makeBubbleBot('Jawaban kamu belum tepat. Coba lagi!');
        
    }
    /*
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
        */
}

function isItTrue(){
    result = (input == qArray.displayAnswer)
    return result
}
