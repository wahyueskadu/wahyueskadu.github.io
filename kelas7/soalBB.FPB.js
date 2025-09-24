questionCount = 15;

// CHANGE: ensure multipliers are coprime so gcd(a,b) === f
function makeFPBQuestion() {
    // choose the FPB (answer) small and simple
    let f = getInteger(2, 10);

    // gcd helper
    function gcd(a, b) {
        a = Math.abs(a); b = Math.abs(b);
        while (b !== 0) {
            let t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    // pick multipliers until they are coprime and not identical
    let m1, m2;
    do {
        m1 = getInteger(2, 9); // you can adjust ranges
        m2 = getInteger(2, 9);
    } while (gcd(m1, m2) !== 1 || m1 === m2);

    // build the actual numbers
    let a = f * m1;
    let b = f * m2;

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
    makeDivider(`Soal ${questionProgress} dari ${questionCount} benar ${firstTry}`);


    let q = makeFPBQuestion();
    makeBubbleBot(`FPB dari ${q.num1} dan ${q.num2} adalah …`);
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
    } else if (Math.abs(qArray.displayAnswer) == Math.abs(input)) {
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
        makeBubbleBot(`Jawaban kamu belum benar, coba lagi`)
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
