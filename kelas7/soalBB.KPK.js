questionCount = 10;

// KPK practice (30 items, no primes)
const kpkSet = [
  [4, 6, 12],
  [4, 8, 8],
  [4, 10, 20],
  [6, 8, 24],
  [6, 9, 18],
  [6, 12, 12],
  [8, 12, 24],
  [8, 14, 56],
  [8, 16, 16],
  [9, 12, 36],
  [9, 15, 45],
  [10, 12, 60],
  [10, 20, 20],
  [12, 14, 84],
  [12, 16, 48],
  [12, 18, 36],
  [12, 20, 60],
  [14, 16, 112],
  [14, 18, 126],
  [15, 18, 90],
  [15, 20, 60],
  [16, 18, 144],
  [16, 20, 80],
  [18, 20, 180],
  [18, 24, 72],
  [20, 24, 120],
  [20, 28, 140],
  [20, 30, 60],
  [24, 28, 168],
  [24, 30, 120]
];

// CHANGE: ensure multipliers are coprime so gcd(a,b) === f
function makeKPKQuestion() {
    // pick a random question from fpbSet
    const item = kpkSet[getInteger(0, kpkSet.length - 1)];

    // unpack values
    let a = item[0];
    let b = item[1];
    let f = item[2];

    return {
        question: `KPK dari ${a} dan ${b} = …`,
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


    let q = makeKPKQuestion();
    makeBubbleBot(`KPK dari ${q.num1} dan ${q.num2} adalah\u00A0…`);
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
