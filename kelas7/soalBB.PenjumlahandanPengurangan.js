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

    // CHANGE: randomly choose operator (+ or -)
    let ops = ["+", "-"];
    let chosenOp = ops[Math.floor(Math.random() * ops.length)];

    // CHANGE: compute displayAnswer based on chosen operator
    if (chosenOp === "+") {
        displayAnswer = x1 + x2;
    } else {
        displayAnswer = x1 - x2;
    }
 

    // CHANGE: display the correct symbol in the question
    // If x1 or x2 is negative, surround with brackets
    const x1Display = x1 < 0 ? `(${x1})` : x1;
    const x2Display = x2 < 0 ? `(${x2})` : x2;
    makeBubbleBot(`${x1Display} ${chosenOp} ${x2Display} = …`);
    qArray.displayAnswer = displayAnswer;
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
