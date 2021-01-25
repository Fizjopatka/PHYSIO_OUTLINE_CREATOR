//CONSTS
const stretchExercise = document.getElementById('stretch-exercise');
const strengthExercise = document.getElementById('strength-exercise');
const contentPdf = document.querySelector('#content-pdf');
const patientNamePdf = document.querySelector('.patient-name-pdf');
const datePdf = document.querySelector('.date-pdf');
const frequencyPdf = document.querySelector('.frequency-pdf');
const commentsPdf = document.querySelector('.comments-pdf');
const submit1 = document.getElementById('submit-1');
const exercisePdf = document.getElementById('exercise-pdf');
const exercisePdf2 = document.getElementById('exercise-pdf2');
const readyButton = document.getElementById('ready-button');
const readyMenuButton = document.getElementById('ready-menu-button');
const restartButton = document.getElementById('restart-button');
let patientName = '';
let size = 1;
let queueNumber = 0;

//LISTENERS
readyButton.addEventListener('click', saveAll);
readyMenuButton.addEventListener('click', saveAll);
restartButton.addEventListener('click', ()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(function(){ location.reload()}, 500);
});

//EXERCISES
const stretchExerciseCollection = [
    {
        title: "Rozciąganie mm. kulszowo-goleniowych",
        size: 1,
        description: "Leżymy na plecach, zginamy nogę w biodrze do 90°, dłonie układamy na tylnej częsci uda, a następnie wykonujemy wyprost nogi w kolanie, zginamy stopę grzbietowo (do siebie), aż pojawi się uczucie rozciągania po tylnej stronie kolana, uda, bądź łydki. Utrzymujemy pozycję przez wyznaczony czas.",
        image: "img/stretch0.png",
        repetitions: "10 x 4sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. kulszowo-goleniowych 2",
        size: 1,
        description: "Ustawiamy się w klęku podpartym. Prostujemy nogi w kolanach dociskając pięty do podłoża, aż pojawi się uczucie rozciągania po tylnej stronie kolana, uda, bądź łydki. Utrzymujemy pozycję przez wyznaczony czas.",
        image: "img/stretch6.png",
        repetitions: "10 x 4sek",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. pośladkowych",
        size: 1,
        description: "Leżymy na plecach, jedna noga jest zgięta w kolanie do 90°, druga jest oparta łydką o kolano pierwszej. Trzymając za kolano zgiętej nogi obydwiema rękoma przyciągamy ją do siebie, aż pojawi się uczucie rozciągania w okolicy pośladka.",
        image: "img/stretch1.png",
        repetitions: "40sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. piersiowych",
        size: 1,
        description: "Leżymy na boku, noga znajdująca się u góry jest zgięta ok. 90° i opiera się kolanem o mate, ręka znajdująca się u góry jest wyprostowana i ustawiona po skosie, próbujemy dotknać grzbietem dłoni do maty, aż pojawi się uczucie rozciągania w okolicy pachy, pleców, bądź ręki.",
        image: "img/stretch2.png",
        repetitions: "40sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. czworogłowych",
        size: 1,
        description: "Ustawiamy się w klęku jednonóż, dłoń po stronie nogi zakrocznej jest oparta o matę na wysokości stopy nogi wykrocznej. Nogę zakroczną mocno wysuwamy do tyłu. Wolną ręką przyciągamy podudzie nogi zakrocznej chwytając w okolicy stawu skokowego. Przyciągamy podudzie do momentu, aż pojawi się uczucie rozciągania z przodu uda nogi zakrocznej.",
        image: "img/stretch3.png",
        repetitions: "40sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. czworobocznych lędźwi",
        size: 1,
        description: "Stoimy, nogi są ustawione 'na krzyż', rozciągamy bok po stronie nogi, która znajduje się z tyłu. Biodro po stronie rozciąganej wypychamy w bok oraz unosimy bokiem w górę rękę po stronie rozciąganej. Wypychamy biodro w bok do momentu, aż pojawi się uczucie rozciągania w okolicy biodra lub pleców.",
        image: "img/stretch4.png",
        repetitions: "10 x 4sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. biodrowo-lędźwiowych",
        size: 1,
        description: "Ustawiamy się w klęku jednonóż. Kolano nogi wykrocznej nie może przekraczać lini stopy, noga zakroczna wysunięta lekko do tyłu. Plecy są proste, ręce opierają się o stabilny przedmiot. Napinamy pośladek nogi zakrocznej, biodrem schodzimy w dół i lekko ku przodowi aż pojawi się uczucie rozciągania w okolicy biodra lub uda nogi zakrocznej.",
        image: "img/stretch5.png",
        repetitions: "40sek x strona",
        trigger: false,
        queueNumber: 0
    }
];

const strengthExerciseCollection = [
    {
        title: "Wzmacnianie mm. posturalnych, mm. pośladkowych, mm. grzbietu",
        size: 1,
        description: "Ustawiamy się w podporze przodem, plecy są proste, brzuch napięty, dłonie znajdują się w lini prostej pod barkami. W spokojnym tempie odrywając jedną rękę od materaca dotykamy dłonią przeciwległego barku, wracamy do pozycji wyjściowej i robimy to samo drugą ręką. Ćwiczymy do końca wyznaczonego czasu.",
        image: "img/strength0.png",
        repetitions: "3 x 30sek",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. posturalnych, mm. pośladkowych, mm. grzbietu 2",
        size: 1,
        description: "Ustawiamy sie w klęku podpartym. Dłonie znajdują się pod barkami, kolana pod biodrami. Unosimy rękę do wysokości barku, oraz nogę po przeciwległej stronie do wysokości biodra. Dłoń jest otwarta, ustawiona kciukiem w górę. Utrzymujemy pozycję przez wyznaczony czas. Wracamy do pozycji wyjściowej, a następnie robimy to samo drugą ręką i nogą. ",
        image: "img/strength1.png",
        repetitions: "10 x strona x 4sek",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. posturalnych, mm. pośladkowych, mm. grzbietu 3",
        size: 1,
        description: "Ustawiamy sie w klęku podpartym. Dłonie znajdują się pod barkami, kolana pod biodrami. Odrywamy kolana od materaca na kilka centymetrów. Brzuch jest napięty. Utrzymujemy pozycję przez wyznaczony czas. ",
        image: "img/strength6.png",
        repetitions: "3 x 30sek",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. pośladkowych, mm. głębokich tułowia",
        size: 1,
        description: "Leżymy na plecach z nogami ugiętymi. Ręce są skrzyżowane na klatce piersiowej. Stopy w jednej linii. Unosimy biodra w górę. Brzuch i pośladki są napięte. Utrzymujemy uniesione biodra przez wyznaczony czas. Wracamy do pozycji wyjściowej.",
        image: "img/strength2.png",
        repetitions: "10 x 4sek",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. grzbietu, mm. kończyn górnych",
        size: 1,
        description: "Leżymy na brzuchu, ręce są wyprostowane w przód, kciuki skierowane w górę. Odrywamy ręce i głowe od materaca. Napinamy mięśnie grzbietu. Ręce, powolnym ruchem, przenosimy nad tłów kierując kciuki w dół. Następnie powoli wracamy do pozycji wyjściowej. ",
        image: "img/strength3.png",
        repetitions: "15x",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. posturanych, mm. brzucha, mm. stożka rotatorów",
        size: 1,
        description: "Leżymy na boku z przedramieniem opartym o mate. Łokieć znajduje się pod barkiem. Nogi są proste, stopa leży na stopie. Wolną rękę opieramy o biodro. Unosimy tułów tak, aby ciało utworzyło linie prostą. Brzuch jest napięty. Utrzymujemy pozycje przez wyznaczony czas.",
        image: "img/strength4.png",
        repetitions: "3 x 15sek x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. czworogłowych, mm. pośladkowych, mm. kulszowo-goleniowych",
        size: 1,
        description: "Stoimy, stopy ustawione na wprost, na szerokość bioder. Ręce wyprostowane przed sobą celem utrzymania równowagi. Powoli zaczynając od zgięcia w biodrach schodzimy do przysiadu pamiętając, żeby linia kolan nie przekroczyła lini palców u stóp. Plecy są proste. Kiedy zgięcie w kolanach wynosi ok 90° zatrzymujemy się na chwilę, a następnie powoli wracamy do pozycji wyjściowej.",
        image: "img/strength5.png",
        repetitions: "3 serie x 10",
        trigger: false,
        queueNumber: 0
    }
];

//FUNCTIONS
//CLOSE SIDE WINDOW 
function closeWindow(){
    $('.how-it-work').css('display', 'none');
    sessionStorage.setItem('isClosed', 'true');
}

function checkWindow(){
    if(sessionStorage.getItem('isClosed')){
        $('.how-it-work').css('display', 'none');
    };
}

//SCREEN, SAVE AND DOWNLOAD PDF
function genPDF() {
    const doc = new jsPDF();

    function setPage(divName, flexNumber) {
        let i = 1;

        exercisePdf2.appendChild(createNewCell(divName))
        while (i < flexNumber){    
            let firstExercise = exercisePdf.firstChild;
            if (firstExercise === null) {
                return
            };
            document.getElementById(divName).append(firstExercise);
            i++
        };

    };

    setPage('page-1', 4);
    html2canvas(contentPdf).then(canvas=> {
        const img = canvas.toDataURL('image/png');
        const pdfName = `zestaw-ćwiczeń-dla-${patientName}-PhysioOutline.pdf`;
        //próbowałam zrobić to \/ lepiej, ale html2canvas wywala mi błędy, będę to poprawiać :D
        doc.addImage(img, 'JPEG', 4, 5);
        if (size < 5) {
            doc.save(pdfName);
        } else if (size > 4) {
            setPage('page-2', 5);
            const page2 = document.getElementById('page-2');

            html2canvas(page2).then(canvas=> {
                const img = canvas.toDataURL('image/png');

                doc.addPage();
                doc.addImage(img, 'JPEG', 4, 5);
                if (size < 9) {
                    doc.save(pdfName);
                } else if (size > 8) {
                    setPage('page-3', 9);
                    const page3 = document.getElementById('page-3');

                    html2canvas(page3).then(canvas=> {
                        const img = canvas.toDataURL('image/png');
        
                        doc.addPage();
                        doc.addImage(img, 'JPEG', 4, 5);
                        doc.save(pdfName);
                    });
                };
            });
        };

    });
};

//RADIO INPUT FUNCTION
function getInfoAboutFrequency() {
    const frequency = document.forms[0];
    let frequencyText = "";
    let i;

    for (i = 0; i < frequency.length; i++) {
        if (frequency[i].checked) {
            frequencyText = frequency[i].value;
        };
    };
    return frequencyText;
};

function createNewCell(name) {
    const div = document.createElement('div');

    div.id = name;
    return div
};

//CREATING EXERCISES FOR CHOOSE
function fillCells(exerciseCollection, exerciseDivId, type){
    let n = 0;

    while (n < exerciseCollection.length){
        exerciseDivId.appendChild(createNewCell(`exercise${type}Number${n}`));
        const newCell = document.getElementById(`exercise${type}Number${n}`);

        newCell.classList.add('exercise-container')
        newCell.innerHTML = `
        <div class="exercise-cell row ml-4 mr-4">
            <button onclick="chooseExercise('${type}', '${n}')" class="exercise-check col-8 col-md-1 mt-2 mb-2" id= "${type}${n}check"></button>
            <div class="row middle-row">
                <div class="exercise-title col-12">${exerciseCollection[n].title}</div>
                <div class="exercise-description col-12 mb-3">${exerciseCollection[n].description}</div>
                <div class="exercise-repetitions col-12 mb-2">liczba powtórzeń:<input type="text" class="ml-2" id="input${type}${n}" value="${exerciseCollection[n].repetitions}" name="powtórzenia"> </div>
            </div>
            <div class="exercise-image"><img src="${exerciseCollection[n].image}"></div>
        </div>`;
        n++;
    };
};

function chooseExercise(type, n){
    function createExerciseDiv(idButton){
        const exerciseDiv = `
        <div class="exercise-box-pdf">
            <div class="row">
                <div class="exercise-pdf-column">
                    <div class="exercise-title-pdf mt-1">${type[n].title}</div>
                    <div class="exercise-description-pdf">${type[n].description}</div>
                    <div id="${idButton[n].repetitions}Div" class="exercise-repetitions-pdf">liczba powtórzeń: ${type[n].repetitions}</div>
                </div>
                <div>
                        <img src=${type[n].image}>
                </div>
            </div>
        </div>`;
        //SWAP BUTTON COLOR AND ADDING NUMBER
        if (!type[n].trigger) {
            $(`#${idButton}${n}check`).hover(function(){
                $(this).css("background-color", "var(--jade)");
                }, function(){
                $(this).css("background-color", "var(--jade-80)");
            });
            type[n].trigger = true;
            queueNumber = queueNumber +1;
            type[n].queueNumber = queueNumber;
            document.getElementById(`${idButton}${n}check`).innerHTML = queueNumber;
            //APPEND CHILD + INNER HTML
            exercisePdf.appendChild(createNewCell(`${idButton}Div${n}`));
            document.getElementById(`${idButton}Div${n}`).innerHTML = exerciseDiv;
            //INPUT REPETITIONS
            document.getElementById(`${idButton[n].repetitions}Div`).innerHTML = 'liczba powtórzeń: '+ document.getElementById(`input${idButton}${n}`).value;
            event.preventDefault();
            //RETURN SIZE
            return size = size+ type[n].size;
        } else if (type[n].trigger) {
            $(`#${idButton}${n}check`).hover(function(){
                $(this).css("background-color", "var(--grey-80)");
                }, function(){
                $(this).css("background-color", "var(--grey)");
            });
            type[n].trigger = false;
            queueNumber = queueNumber -1;
            document.getElementById(`${idButton}${n}check`).innerHTML = "";
            //REMOVE CHILD 
            document.getElementById(`${idButton}Div${n}`).remove();
            event.preventDefault();
            if (idButton === "stretch") {
                subtractAllQueue(stretchExerciseCollection, strengthExerciseCollection, "strength", type[n].queueNumber, n);
            } else if (idButton === "strength") {
                subtractAllQueue(strengthExerciseCollection, stretchExerciseCollection, "stretch", type[n].queueNumber, n);
            };

            //RETURN SIZE
            return size = size - type[n].size;
        };

        function subtractAllQueue(type, type2, idButton2, clickNumber, n){
            let x = 0;

            type[n].queueNumber = 0;
            while (x < type.length) {
                if (type[x].queueNumber > clickNumber) {
                    type[x].queueNumber = type[x].queueNumber - 1;
                };
                if (type2[x].queueNumber > clickNumber) {
                    type2[x].queueNumber = type2[x].queueNumber - 1;
                };
                document.getElementById(`${idButton}${x}check`).innerHTML = type[x].queueNumber;
                document.getElementById(`${idButton2}${x}check`).innerHTML = type2[x].queueNumber;
                //SWAP 0 TO ""
                if (type[x].queueNumber === 0) {
                    document.getElementById(`${idButton}${x}check`).innerHTML = "";
                }
                if (type2[x].queueNumber === 0) {
                    document.getElementById(`${idButton2}${x}check`).innerHTML = "";
                }

                x++;
            };

        };
    };

    if(type === 'stretch'){
        const idButton = 'stretch';
        type = stretchExerciseCollection;
        createExerciseDiv(idButton);
    } else if(type === 'strength') {
        const idButton = 'strength';
        type = strengthExerciseCollection;
        createExerciseDiv(idButton);
    };
}

function saveAll (event){
    const startDate = document.getElementById('start-date').value;
    const comments = document.getElementById('comments').value;
    patientName = document.getElementById('patient-name').value;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    function dateCheck(date){
        if (date.length >  8) {
            formattedDate = date[8]+date[9]+"-"+date[5]+date[6]+"-"+date[0]+date[1]+date[2]+date[3];
            return formattedDate
        } else {
            return formattedDate = "";
        };
    };
    dateCheck(startDate);
    $('#content-pdf').css('display', 'inline-block');
    $('#exercise-pdf2').css('display', 'inline-block');
    patientNamePdf.innerHTML = `Zestaw ćwiczeń dla ${patientName}`;
    datePdf.innerHTML = `Data rozpoczęcia ćwiczeń: ${formattedDate}`;
    frequencyPdf.innerHTML = `Ćwiczenia należy wykonywać ${getInfoAboutFrequency()}.`;
    commentsPdf.innerHTML = `Uwagi: ${comments}`;
    genPDF();
    event.preventDefault();
    $('#ready-button').css('display', 'none');
    readyMenuButton.disabled = true;
    $('.exercise-check').prop('disabled', true);
    $('#restart-button').css('animation', 'clickMe 2s infinite')
    setTimeout(()=>{$('.content-box-pdf').css('display', 'none');}, 1000);
};

//APP
fillCells(stretchExerciseCollection, stretchExercise, 'stretch');
fillCells(strengthExerciseCollection, strengthExercise, 'strength');
checkWindow();
