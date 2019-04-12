var baseUrl = "http://localhost/NotepadJS/php/";
// povecanje prostora za pisanje dinamicki kako se prozor mijenja
$(document).ready(function() {
    let $prozorVisina = $(window).height() - 145;
    $('.notepad').height($prozorVisina - 20);
    $(window).resize(function(){
        let $prozorVisina = $(window).height() - 145;
        $('.notepad').height($prozorVisina - 20);
    });

    // ucitavanje svih note-a iz baze kad se ucita dokument
    loadAllNotes();
});
// 
function loadAllNotes(){
    $.getJSON('../NotepadJS/php/api.php', { method: 'allNotes' }, function (notes) {
        let redBr = 1;
        let separatori = notes.length - 1;
        $.each(notes, function (index, pad) {
            if (notes == undefined || notes == null) {
                alert("Nemate nikakvih biljeski u bazi!");
            } else {
                // * smjestanje podataka
                $("#wrappedNotes").append("<div class='row'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr + ")").append("<div class='col-sm-6 ime-pad'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr + ") .ime-pad").append("<h4 class='imePad'>" + pad.naziv + "</h4>");
                $("#wrappedNotes .row:nth-child(" + redBr + ")").append("<div class='col-sm-6 datum-pad'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr + ") .datum-pad").append("<h5 class='datumPad'>" + pad.datum + "</h5>");
                if (separatori != 0)
                    $("#wrappedNotes").append("<hr class='separator'>");
                separatori--;
                redBr += 2;
            }
        });
    });
}

// pojavljivanje pada za cuvanje na klik na dugme "saved pads"
$("#savedPads").click(function () {
    $("#text-wrap").toggleClass(" col-md-8");
    $("#savedNotes").toggleClass(" col-md-4 on-off");
});
// Stavljanje novog pada
$("#newPad").click(function(){
    let text = document.getElementById("textArea").value;
    if(text === ""){
        document.getElementById("naslovTekst").value = "New Pad";
        return; // funckija koja ce da vraca cuva notepad
    }
    else{
        if(confirm("Are you sure you don't want to save this Pad?")){
            document.getElementById("textArea").value = "";
            document.getElementById("naslovTekst").value = "New Pad";
        }
        else{
            return;
        }
    }
});
// Stilizovanje font-a teksta
var switcherB = 0, switcherI = 0, switcherU = 0;
// bold tekst
function bolder(){
    $("#boldTxt").click(function () {
        if (switcherB == 0) {
            $("#boldTxt").css("background", "#F3E4A0");
            $("#textArea").css("font-weight", "bolder");
            switcherB = 1;
        } else {
            $("#boldTxt").css("background", "#BA4025");
            $("#textArea").css("font-weight", "normal");
            switcherB = 0;
        }
    });
}
// italic tekst
function italic(){
    $("#italTxt").click(function () {
        if (switcherI == 0) {
            $("#italTxt").css("background", "#F3E4A0");
            $("#textArea").css("font-style", "italic");
            switcherI = 1;
        } else {
            $("#italTxt").css("background", "#BA4025");
            $("#textArea").css("font-style", "normal");
            switcherI = 0;
        }
    });
}
// underline tekst 
function underline() {
    $("#underTxt").click(function () {
        if (switcherU == 0) {
            $("#underTxt").css("background", "#F3E4A0");
            $("#textArea").css("text-decoration-line", "underline");
            switcherU = 1;
        } else {
            $("#underTxt").css("background", "#BA4025");
            $("#textArea").css("text-decoration", "none");
            switcherU = 0;
        }
    });
}
//bojanje teksta
function colorTxt(){
    $("#colorTxt").change(function () {
        let $boja = $("#colorTxt").val();
        $("#textArea").css("color", $boja);
    });
}
// font size teksta 
function fontVelicina() {
    $("#fontSize").change(function () {
        let size = $("#fontSize").val();
        console.log(size);
        switch (size) {
            case '1':
                $("#textArea").css("font-size", "20px");
                break;
            case '2':
                $("#textArea").css("font-size", "25px");
                break;
            case '3':
                $("#textArea").css("font-size", "30px");
                break;
            case '4':
                $("#textArea").css("font-size", "35px");
                break;
            case '5':
                $("#textArea").css("font-size", "40px");
                break;
            case '6':
                $("#textArea").css("font-size", "45px");
                break;
            default:
                $("#textArea").css("font-size", "20px");
                break;
        }
    });
}
bolder(); italic(); underline(); colorTxt(); fontVelicina()
// Vratiti tekst biljeske sa odredjenim naslovom
function dajTekst(noteNaslov, callback) {
    let zahtjev = new XMLHttpRequest();
    zahtjev.open("GET", baseUrl + "api.php?method=noteTekst&naslov=" + noteNaslov);
    zahtjev.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // izmijeniti tako da vraca i sve ostalo vezano za tekst
            callback((JSON.parse(this.responseText)).tekst);
        }
    }
    zahtjev.send();
}
// Ucitavanje svega iz Pada ukljucujuci i stilove
function dajNoteData(noteNaslov, callback) {
    let zahtjev = new XMLHttpRequest();
    zahtjev.open("GET", baseUrl + "api.php?method=noteData&naslov=" + noteNaslov);
    zahtjev.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // izmijeniti tako da vraca i sve ostalo vezano za tekst
            console.log((JSON.parse(this.responseText)));
            callback((JSON.parse(this.responseText)));
        }
    }
    zahtjev.send();
}

// adding listeners to each name of the note if possible 
function addReturn() {
    let container = document.getElementById("wrappedNotes");
    container.addEventListener("click", function(e){
        let naslov = e.target.innerHTML;
        let trenutniNaslov = document.getElementById("naslovTekst");
        let notepad = document.getElementById("textArea");
        allNoteNames(function (svaImena) {
            if (svaImena.has(trenutniNaslov)){
                if(confirm("Jeste li sacuvali sve izmjene biljeske?")){
                    dajNoteData(naslov, function (biljeskaPodaci) {
                        notepad.value = biljeskaPodaci.tekst;
                        document.getElementById("naslovTekst").value = biljeskaPodaci.naziv;
                        if (biljeskaPodaci.Bold == "0") notepad.style.fontWeight = "bolder";
                        else notepad.style.fontWeight = "normal";
                        if (biljeskaPodaci.Italic != "0") notepad.style.fontStyle = "italic";
                        else notepad.style.fontStyle = "normal";
                        if (biljeskaPodaci.Under != "0") notepad.style.textDecoration = "underline";
                        else {
                            notepad.style.textDecoration = "none";
                        }
                        notepad.style.color = biljeskaPodaci.bojaSlova;
                        notepad.style.fontSize = biljeskaPodaci.velicinaFonta + "px";
                    });
                }
                else{
                    return;
                }
            } else {
                dajNoteData(naslov, function (biljeskaPodaci) {
                    notepad.value = biljeskaPodaci.tekst;
                    document.getElementById("naslovTekst").value = biljeskaPodaci.naziv;
                    if (biljeskaPodaci.Bold == "0") notepad.style.fontWeight = "bolder";
                    else notepad.style.fontWeight = "normal";
                    if (biljeskaPodaci.Italic != "0") notepad.style.fontStyle = "italic";
                    else notepad.style.fontStyle ="normal";
                    if (biljeskaPodaci.Under != "0") notepad.style.textDecoration = "underline";
                    else {
                        notepad.style.textDecoration = "none";
                    }
                    notepad.style.color = biljeskaPodaci.bojaSlova;
                    notepad.style.fontSize = biljeskaPodaci.velicinaFonta + "px";
                });
            }
        });
    });
}
addReturn();

// ucitaj sva imena poruka iz baze u skup 
function allNoteNames(callback) {
    let skup = new Set();
    $.getJSON('../NotepadJS/php/api.php', { method: 'allNotesNames' }, function (names) {
        $.each(names, function (index, name) {
            skup.add(name.naziv);
        });
        callback(skup);
    });
}
// Provjerava je li naslov vec postoji u bazi tj da li moze da se napravi note sa tim naslovom
let naslov = document.getElementById("naslovTekst");
naslov.addEventListener("change", function(){
    allNoteNames(function(svaImena){
        if(svaImena.has(naslov.value)){
            alert("Vec postoji biljeska sa tim imenom, promjenite ime!");
            naslov.value = "New Pad";
            return;
        } else {
            return;
        }
    });
});


