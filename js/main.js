//VARIABLES
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
const sortStretchButton = document.getElementById('sort-stretch-button');
const sortStrengthButton = document.getElementById('sort-strength-button');
let stretchExerciseCollection = "";
let strengthExerciseCollection = "";
let patientName = '';
let size = 1;
let queueNumber = 0;
let sortStretchTrigger = false;
let sortStrengthTrigger = false;

//LISTENERS
[readyButton, readyMenuButton].forEach(button => button.addEventListener('click', saveAll));
restartButton.addEventListener('click', ()=> {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(()=>{ location.reload()}, 500);
});
sortStretchButton.addEventListener('click', ()=>{
    sortStretchTrigger ?  hideSort() : showSort();
    function showSort() {
        $('#stretch-sort-text').css('transform' , 'translate(0, 4rem)');
        $('.relative-box').css('height', '8rem');
        sortStretchTrigger = true;
    };
    function hideSort() {
        $('#stretch-sort-text').css('transform' , 'translate(0, 0)');
        $('.relative-box').css('height', '4rem');
        sortStretchTrigger = false;
    };
});
sortStrengthButton.addEventListener('click', ()=>{
    sortStrengthTrigger ?  hideSort() : showSort();
    function showSort() {
        $('#strength-sort-text').css('transform' , 'translate(0, 4rem)');
        $('.relative-box').css('height', '8rem');
        sortStrengthTrigger = true;
    };
    function hideSort() {
        $('#strength-sort-text').css('transform' , 'translate(0, 0)');
        $('.relative-box').css('height', '4rem');
        sortStrengthTrigger = false;
    };
});

//EXERCISES 
window.addEventListener('load', ()=> {
    fetch("data/stretchExerciseCollection.json")
        .then(response => response.json())
        .then(data => {
            stretchExerciseCollection = data.stretchExerciseCollection;
            fillCells(stretchExerciseCollection, stretchExercise, 'stretch');
        });

    fetch("data/strengthExerciseCollection.json")
        .then(response => response.json())
        .then(data => {
            strengthExerciseCollection = data.strengthExerciseCollection;
            fillCells(strengthExerciseCollection, strengthExercise, 'strength');
    });
});

//FUNCTIONS
//CLOSE SIDE WINDOW 
function closeWindow(){
    $('.how-it-work').css('display', 'none');
    sessionStorage.setItem('isClosed', 'true');
};

function checkWindow(){
    if(sessionStorage.getItem('isClosed')){
        $('.how-it-work').css('display', 'none');
    };
};

//SCREEN, SAVE AND DOWNLOAD PDF
function genPDF() {
    const doc = new jsPDF();

    function setPage(divName, flexNumber) {
        let i = 1;

        exercisePdf2.appendChild(createNewCell(divName))
        while (i < flexNumber){    
            let firstExercise = exercisePdf.firstChild;
            if (firstExercise === null) {
                return;
            };
            document.getElementById(divName).append(firstExercise);
            i++;
        };
    };
    setPage('page-1', 4);
    html2canvas(contentPdf).then(canvas=> {
        const img = canvas.toDataURL('image/png');
        const pdfName = `zestaw-ćwiczeń-dla-${patientName}-PhysioOutline.pdf`;
        let newPageSize = 4;
        let pageEdge = 5;
        let pageNumber = 2;
        let saveNumber = 2;
        let bottomPageNumber = 2;
        
        doc.addImage(img, 'JPEG', 4, 5);
        doc.text("1", 195, 285); 
        if (size < 5) {
            doc.save(pdfName);
        } else {
            function createNewPage(){
                html2canvas(document.getElementById(`page-${pageNumber}`)).then(canvas=> {
                    const img = canvas.toDataURL('image/png');

                    doc.addPage();
                    doc.addImage(img, 'JPEG', 4, 5);
                    doc.text(`${bottomPageNumber}`, 195, 285); 
                    if(Math.ceil(size/4) === saveNumber) {
                        doc.save(pdfName);
                    };
                    saveNumber ++;
                    bottomPageNumber++;
                });
            };
            while (size > newPageSize) {
                setPage(`page-${pageNumber}`, pageEdge);
                setTimeout(createNewPage(), 500);
                newPageSize +=4;
                pageEdge +=4;
                pageNumber ++;
            };
        };
    });
};

//RADIO INPUT FUNCTION
function getInfoAboutFrequency() {
    const frequency = Array.from(document.forms[0]);

    frequencyText = frequency.find(freq => freq.checked);
    frequencyText = frequencyText.value
    return frequencyText
};

function createNewCell(name) {
    const div = document.createElement('div');

    div.id = name;
    return div;
};

//CREATING EXERCISES FOR CHOOSE
function fillCells(exerciseCollection, exerciseDivId, type){
    let n = 0;

    exerciseCollection.forEach(()=> {
        exerciseDivId.appendChild(createNewCell(`exercise${type}Number${n}`));
        const newCell = document.getElementById(`exercise${type}Number${n}`);

        newCell.classList.add('exercise-container');
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
    });
};

function chooseExercise(type, n){
    function createExerciseDiv(idButton){
        const exerciseDiv = `
        <div class="exercise-box-pdf">
            <div class="row">
                <div class="exercise-pdf-column">
                    <div class="exercise-title-pdf mt-1">${type[n].title}</div>
                    <div class="exercise-description-pdf">${type[n].description}</div>
                    <div id="${idButton}${n}repetitionsDiv" class="exercise-repetitions-pdf">liczba powtórzeń: ${type[n].repetitions}</div>
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
            $(`#${idButton}${n}check`).css("background-color", "var(--jade)");
            type[n].trigger = true;
            queueNumber = queueNumber +1;
            type[n].queueNumber = queueNumber;
            document.getElementById(`${idButton}${n}check`).innerHTML = queueNumber;
            //APPEND CHILD + INNER HTML
            exercisePdf.appendChild(createNewCell(`${idButton}Div${n}`));
            document.getElementById(`${idButton}Div${n}`).innerHTML = exerciseDiv;
            //INPUT REPETITIONS
            document.getElementById(`${idButton}${n}repetitionsDiv`).innerHTML = 'liczba powtórzeń: '+ document.getElementById(`input${idButton}${n}`).value;

            event.preventDefault();
            //RETURN SIZE
            return size = size+ type[n].size;
        } else {
            $(`#${idButton}${n}check`).hover(function(){
                $(this).css("background-color", "var(--grey-80)");
                }, function(){
                $(this).css("background-color", "var(--grey)");
            });
            $(`#${idButton}${n}check`).css("background-color", "var(--grey)");
            type[n].trigger = false;
            queueNumber = queueNumber -1;
            document.getElementById(`${idButton}${n}check`).innerHTML = "";
            //REMOVE CHILD 
            document.getElementById(`${idButton}Div${n}`).remove();
            event.preventDefault();
            if (idButton === "stretch") {
                subtractAllQueue(stretchExerciseCollection, strengthExerciseCollection, "strength", type[n].queueNumber, n);
            } else {
                subtractAllQueue(strengthExerciseCollection, stretchExerciseCollection, "stretch", type[n].queueNumber, n);
            };

            //RETURN SIZE
            return size = size - type[n].size;
        };
        function subtractAllQueue(type, type2, idButton2, clickNumber, n) {
            let x = 0;

            type[n].queueNumber = 0;
            type.forEach(()=>{
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
                };
                if (type2[x].queueNumber === 0) {
                    document.getElementById(`${idButton2}${x}check`).innerHTML = "";
                };
                x++;
            });
        };
    };
    if (type === 'stretch') {
        const idButton = 'stretch';
        type = stretchExerciseCollection;
        createExerciseDiv(idButton);
    } else {
        const idButton = 'strength';
        type = strengthExerciseCollection;
        createExerciseDiv(idButton);
    };
};

//SAVING ALL INPUT AND CHOSED DATA
function saveAll (event){
    const startDate = document.getElementById('start-date').value;
    const comments = document.getElementById('comments').value;

    patientName = document.getElementById('patient-name').value;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    function dateCheck(date){
        return date.length > 8 ? date[8]+date[9]+"-"+date[5]+date[6]+"-"+date[0]+date[1]+date[2]+date[3] : "";
    };
    //SAVE INPUT DATA
    $('#content-pdf').css('display', 'inline-block');
    $('#exercise-pdf2').css('display', 'inline-block');
    patientNamePdf.innerHTML = `Zestaw ćwiczeń dla ${patientName}`;
    datePdf.innerHTML = `Data rozpoczęcia ćwiczeń: ${dateCheck(startDate)}`;
    frequencyPdf.innerHTML = `Ćwiczenia należy wykonywać ${getInfoAboutFrequency()}.`;
    commentsPdf.innerHTML = `Uwagi: ${comments}`;
    //CREATING PDF
    genPDF();
    event.preventDefault();
    //DISABLING BUTTONS
    $('#ready-button').css('display', 'none');
    readyMenuButton.disabled = true;
    $('.exercise-check').prop('disabled', true);
    $('#restart-button').css('animation', 'clickMe 2s infinite');
    //HIDDING CONTENT-BOX-PDF
    setTimeout(()=>{$('.content-box-pdf').css('display', 'none');}, 1000);
};

//APP
checkWindow();
