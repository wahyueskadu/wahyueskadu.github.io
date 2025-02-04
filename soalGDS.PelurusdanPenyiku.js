
questionCount = 15;
function getSoal(x){
    if (questionProgress == 1){
        startTime = Date.now(); 
    }
    attemptAnswer = 0;
  //  qArray = {};
    makeDivider(`Soal ${questionProgress} dari ${questionCount}`);

    tipesoal = getIntegerNZ (1,3);

    switch (tipesoal){
    case 1:
        let pelurus = getIntegerNZ(10,170);
        ans = 180 - pelurus;
        list = ['pelurus','suplemen'];
        displayType = list[getInteger(0,1)];
        makeBubbleBot(`${displayType} dari ${pelurus} adalah .... `);
        break
    case 2:
        let penyiku = getIntegerNZ(10,80);
        ans = 90 - penyiku;
        list = ['penyiku','komplemen'];
        displayType = list[getInteger(0,1)];
        makeBubbleBot(`${displayType} dari ${penyiku} adalah ....`);
        break
    case 3:
        let bertoklakbelakang = getIntegerNZ(10,170);
        makeBubbleBot(`Sudut bertolak belakang dari ${bertoklakbelakang} adalah ....`);
        ans = bertoklakbelakang
        displayType = 'bertolak belakang'
        break
    } 
    qArray.displayAnswer = ans;
    qArray.tipesoal = ans;
    qArray.displayType = displayType;
}


function getHelp(){
    if (isNaN(input)) {
        makeBubbleBot('Masukkan jawaban berupa angka. Coba lagi')
        attemptAnswer += 1;
    } else if (attemptAnswer == 1){
        makeBubbleBot('Jawaban kamu belum benar, coba lagi.')
    } else {
        switch (tipesoal){
            case 1:
              resp = `Ingat, sudut ${qArray.displayType} jika dijumlahkan hasilnya 180`;
              break
            case 2:
              resp = `Ingat, sudut ${qArray.displayType} jika dijumlahkan hasilnya 90`;
              break
            case 3:
              resp = `Ingat, sudut bertolak belakang besarnya sama`;
            break
          }
        makeBubbleBot(resp);
        makeBubbleBot('Coba lagi.')
    }

}


function isItTrue(){
    result = (input == qArray.displayAnswer)
    return result
}
