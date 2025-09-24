
questionCount = 15;
function getSoal(questionKind){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
    emptyObject(qArray);
    makeDivider(`Soal ${questionProgress} dari ${questionCount} benar ${firstTry}`);
    x1 = getNumber(1);
    x2 = getNumber(2);
    dividee = x1*x2;
    displayAnswer = x2;
    makeBubbleBot(`${dividee} \u00f7 ${x2} = \u2026`);   
    qArray.displayAnswer = x1
}

function getNumber(x){
    if (firstTry <3) {
        number = getInteger(2,5);
    } else if (firstTry <5){
        number = getInteger(2,9);
    } else if (firstTry <12) {
        number = getInteger(2,9)*getIntegerNZ(-1,1);
    } else {
        switch (x){
            case 1:
                number = getInteger(2,19)
                break;
            case 2:
                if (Math.abs(x1) < 10){
                    number = getInteger(10,19)
                } else {
                    number = getInteger(2,9)
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
    } else if (dividee % input == 0){
        makeBubbleBot(`${input} itu ${dividee} \xf7 ${dividee/input}, jadi jawaban kamu belum benar`)
        makeBubbleBot('Coba lagi')
    } else {
        makeBubbleBot(`Jawaban kamu belum benar, coba lagi`)
    }

}

function getTanda(x){
    if (x<0) { text = 'negatif'} else { text = 'postitif'}
    return text;
}
function isItTrue(){
    result = (input == qArray.displayAnswer)
    return result
}
