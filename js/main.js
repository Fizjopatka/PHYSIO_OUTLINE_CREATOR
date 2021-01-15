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
const exercisePdf3 = document.getElementById('exercise-pdf3');
let size = 1;
let queueNumber = 0;

//LISTENERS
submit1.addEventListener('click', (e)=>{
    const patientName = document.getElementById('patient-name').value;
    const startDate = document.getElementById('start-date').value;
    const comments = document.getElementById('comments').value;

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
    e.preventDefault();
});




//EXERCISES
const stretchExerciseCollection = [
    {
        title: "Rozciąganie mm. kulszowo-goleniowych",
        size: 1,
        description: "tu jest opis",
        image: "img/test.png",
        repetitions: "10 x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. pośladkowych",
        size: 1,
        description: "tu jest opis 2",
        image: "img/test.png",
        repetitions: "40' x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. piersiowych",
        size: 1,
        description: "tu jest opis 3",
        image: "img/test.png",
        repetitions: "40' x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. czworogłowych",
        size: 1,
        description: "tu jest opis 4",
        image: "img/test.png",
        repetitions: "40' x strona",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Rozciąganie mm. czworobocznych lędźwi",
        size: 1,
        description: "tu jest opis 5",
        image: "img/test.png",
        repetitions: "10 x strona x 4'",
        trigger: false,
        queueNumber: 0
    }
];

const strengthExerciseCollection = [
    {
        title: "Wzmacnianie mm. brzucha",
        size: 1,
        description: "tu jest opis",
        image: "img/test.png",
        repetitions: "10 x 4'",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. grzbietu",
        size: 1,
        description: "tu jest opis 2",
        image: "img/test.png",
        repetitions: "10 x strona x 4'",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. posturalnych",
        size: 1,
        description: "tu jest opis 3",
        image: "img/test.png",
        repetitions: "3 x 30'",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. pośladkowych",
        size: 1,
        description: "tu jest opis 3",
        image: "img/test.png",
        repetitions: "10 x 4'",
        trigger: false,
        queueNumber: 0
    },
    {
        title: "Wzmacnianie mm. dna miednicy, mm. głębokich tułowia",
        size: 1,
        description: "tu jest opis 3",
        image: "img/test.png",
        repetitions: "10 x 4'",
        trigger: false,
        queueNumber: 0
    }
];

//FUNCTIONS
//SCREEN, SAVE AND DOWNLOAD PDF

function genPDF() {
    html2canvas(contentPdf).then(canvas=> {
        const doc = new jsPDF();
        const img = canvas.toDataURL('image/png');

        doc.addImage(img, 'JPEG', 4, 5);
        doc.save('test.pdf');
    });
}

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
        exerciseDivId.appendChild(createNewCell(`exercise${type}Number${n}`))
        document.getElementById(`exercise${type}Number${n}`).innerHTML = `
        <div class="exercise-cell row">
            <button onclick="chooseExercise('${type}', '${n}')" class="exercise-check" id= "${type}${n}check"></button>
            <div class="row middle-row">
                <div class="exercise-title col-12">${exerciseCollection[n].title}</div>
                <div class="exercise-description col-12">${exerciseCollection[n].description}</div>
                <div class="exercise-repetitions col-12">liczba powtórzeń:<input type="text" id="input${type}${n}" value="${exerciseCollection[n].repetitions}" name="powtórzenia"> </div>
            </div>
            <div class="exercise-image"><img src="${exerciseCollection[n].image}"></div>
        </div>`;
        n++;
    };
};


function chooseExercise(type, n, exPdf){
    if(size<4){
        exPdf = exercisePdf;
    } else if(size >3) {
        exPdf = exercisePdf2;
    };
    function createExerciseDiv(idButton){
        const exerciseDiv = `
        <div class="exercise-box-pdf">
            <div class="row">
                <div class="col-7 exercise-pdf-column">
                    <div class="exercise-title-pdf col-12">${type[n].title}</div>
                    <div class="exercise-description-pdf col-12">${type[n].description}</div>
                    <div id="${idButton[n].repetitions}Div" class="exercise-repetitions-pdf col-12">liczba powtórzeń: ${type[n].repetitions}</div>
                </div>
                <div class="col-5">
                        <img src=${type[n].image}>
                </div>
            </div>
        </div>`;
        //SWAP BUTTON COLOR AND ADDING NUMBER
        if (!type[n].trigger) {
            document.getElementById(`${idButton}${n}check`).style.backgroundColor = 'var(--jade)';
            type[n].trigger = true;
            queueNumber = queueNumber +1;
            type[n].queueNumber = queueNumber;
            document.getElementById(`${idButton}${n}check`).innerHTML = queueNumber;

        } else if(type[n].trigger) {
            document.getElementById(`${idButton}${n}check`).style.backgroundColor = 'var(--grey)';
            type[n].trigger = false;
            queueNumber = queueNumber -1;
            document.getElementById(`${idButton}${n}check`).innerHTML = "";
            if (idButton === "stretch") {
                subtractAllQueue(stretchExerciseCollection, strengthExerciseCollection, "strength", type[n].queueNumber, n);
            } else if (idButton === "strength") {
                subtractAllQueue(strengthExerciseCollection, stretchExerciseCollection, "stretch", type[n].queueNumber, n);
            }
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

        }

        //APPEND CHILD + INNER HTML
        exPdf.appendChild(createNewCell(`${idButton}Div${n}`));
        document.getElementById(`${idButton}Div${n}`).innerHTML = exerciseDiv;
        //INPUT REPETITIONS
        document.getElementById(`${idButton[n].repetitions}Div`).innerHTML = 'liczba powtórzeń: '+ document.getElementById(`input${idButton}${n}`).value;
        event.preventDefault();
        //RETURN SIZE
        return size = size+ type[n].size;
    }

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

//APP
fillCells(stretchExerciseCollection, stretchExercise, 'stretch');
fillCells(strengthExerciseCollection, strengthExercise, 'strength');
