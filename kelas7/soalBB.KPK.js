questionCount = 15;

function makeKPKQuestion() {
  // Step 1: choose an LCM answer with many factors
  const possibleLCMs = [12, 24, 36, 48, 60, 72];
  const lcmAnswer = possibleLCMs[Math.floor(Math.random() * possibleLCMs.length)];

  // Step 2: list factors of the chosen LCM
  const factors = [];
  for (let i = 2; i < lcmAnswer; i++) {
    if (lcmAnswer % i === 0) {
      factors.push(i);
    }
  }

  // Step 3: pick two different factors
  let a = factors[Math.floor(Math.random() * factors.length)];
  let b = factors[Math.floor(Math.random() * factors.length)];
  while (b === a) {
    b = factors[Math.floor(Math.random() * factors.length)];
  }

  // Step 4: sometimes multiply b by a small number (to avoid overlap)
  if (Math.random() < 0.5) {
    const k = [2, 3][Math.floor(Math.random() * 2)];
    if (b * k <= lcmAnswer && lcmAnswer % (b * k) === 0) {
      b = b * k;
    }
  }

  const question = `Find the KPK (LCM) of ${a} and ${b}`;
  return { a, b, answer: lcmAnswer };
}







function getSoal(questionKind){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
    emptyObject(qArray);
    makeDivider(`Soal ${questionProgress} dari ${questionCount} benar ${firstTry}`);


    let q = makeKPKQuestion();
    makeBubbleBot(`KPK dari ${q.a} dan ${q.b} adalah …`);
    qArray.displayAnswer = q.answer;
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
