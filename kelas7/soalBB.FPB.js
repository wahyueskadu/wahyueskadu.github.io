questionCount = 10;

const fpbSet = [ [8, 12, 4], [12, 18, 6], [14, 28, 14], [16, 24, 8], [18, 30, 6], [20, 40, 20], [9, 27, 9], [15, 45, 15], [12, 30, 6], [24, 36, 12], [16, 40, 8], [10, 30, 10], [18, 24, 6], [27, 54, 27], [28, 84, 28], [30, 45, 15], [40, 60, 20], [36, 48, 12], [21, 42, 21], [22, 44, 22], [8, 20, 4], [12, 16, 4], [14, 21, 7], [18, 27, 9], [20, 28, 4], [24, 30, 6], [25, 35, 5], [26, 39, 13], [28, 36, 4], [30, 50, 10] ];

// CHANGE: ensure multipliers are coprime so gcd(a,b) === f
function makeFPBQuestion() {
    // pick a random question from fpbSet
    const item = fpbSet[getInteger(0, fpbSet.length - 1)];

    // unpack values
    let a = item[0];
    let b = item[1];
    let f = item[2];

    return {
        question: `FPB dari ${a} dan ${b} = …`,
        num1: a,
        num2: b,
        correctAnswer: f
    };
}



function getSoal(questionKind){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
    emptyObject(qArray);
    makeDivider(`Soal ${questionProgress} dari ${questionCount}`);


    let q = makeFPBQuestion();
    makeBubbleBot(`FPB dari ${q.num1} dan ${q.num2} adalah\u00A0…`);
    qArray.displayAnswer = q.correctAnswer;
}

function getNumber(x){
    if (firstTry <3) {
        number = getInteger(2,19);
    } else if (firstTry <5){
        number = getInteger(2,29);
    } else if (firstTry <12) {
        number = getInteger(2,9)*getIntegerNZ(-1,1);
    } else {
        switch (x){
            case 1:
                number = getInteger(10,59)
                break;
            case 2:
                if (Math.abs(x1) < 50){
                    number = getInteger(20,59)
                } else {
                    number = getInteger(10,59)
                }
                break;
        }
        number = number*getIntegerNZ(-1,1);
    }
    return number;
}

function getHelp(){
    if (isNaN(input)) {
        makeBubbleBot('Masukkan jawaban berupa angka. Coba lagi')
        attemptAnswer += 1;
    } else if (attemptAnswer == 1){
        makeBubbleBot('Jawaban kamu belum benar, coba lagi.')
    /*} else if (Math.abs(qArray.displayAnswer) == Math.abs(input)) {
        if (qArray.bedatanda === undefined) { qArray.bedatanda = -1 };
        qArray.bedatanda += 1;
        if (qArray.displayAnswer < 0 ) {
            finalHelp = ['berbeda','negatif']
        } else {
            finalHelp = ['sama','positif']}
        theHelp = [
            'Ingat, kalau tandanya berbeda, maka hasilnya negatif. Kalau tandanya sama, maka hasilnya positif.',
            `Perhatikan, ${x1} adalah ${getTanda(x1)} dan ${x2} adalah ${getTanda(x2)}`,
            `Karena tandanya ${finalHelp[0]}, maka hasilnya ${finalHelp[1]}`
        ]
        makeBubbleBot(theHelp[qArray.bedatanda])
    } else if (input % x1 == 0){
        // NOTE: This part still uses × (multiplication help).
        // CHANGE NEEDED if you want specific addition/subtraction hints.
        makeBubbleBot(`${input} itu ${x1} × ${input/x1}, jadi jawaban kamu belum benar`)
        makeBubbleBot('Coba lagi')
    } else if (input % x2 == 0){
        makeBubbleBot(`${input} itu ${input/x2} × ${x2}, jadi jawaban kamu belum benar`)
        makeBubbleBot('Coba lagi')
    } else {
        makeBubbleBot(`Jawaban kamu belum benar, coba lagi`)*/
    }
}

function getTanda(x){
    if (x<0) { text = 'negatif'} else { text = 'positif'} // FIX: typo
    return text;
}

function isItTrue(){
    result = (input == qArray.displayAnswer)
    return result
}
