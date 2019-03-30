var baseUrl = "http://localhost/NotepadJS/php/"
// povecanje prostora za pisanje
$(document).ready(function() {
    let $prozorVisina = $(window).height() - 145;
    $('.notepad').height($prozorVisina - 20);
    $(window).resize(function(){
        let $prozorVisina = $(window).height() - 145;
        $('.notepad').height($prozorVisina - 20);
    });

    // ucitavanje svih note-a iz baze kad se ucita dokument
    $.getJSON('../NotepadJS/php/api.php', { method: 'allNotes' }, function (notes) {
        let redBr = 1;
        let separatori = notes.length -1;
        $.each(notes, function (index, pad) {
            if(notes == undefined || notes == null){
                alert("Nemate nikakvih biljeski u bazi!");
            } else {
                // * smjestanje podataka
                $("#wrappedNotes").append("<div class='row'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr+")").append("<div class='col-sm-6 ime-pad'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr+") .ime-pad").append("<h4 class='imePad'>"+pad.ime+"</h4>");
                $("#wrappedNotes .row:nth-child(" + redBr+")").append("<div class='col-sm-6 datum-pad'></div>");
                $("#wrappedNotes .row:nth-child(" + redBr+") .datum-pad").append("<h5 class='datumPad'>" + pad.datum + "</h5>");
                console.log($("#wrappedNotes .row:nth-child(" + redBr + ")"));
                if(separatori != 0)
                    $("#wrappedNotes").append("<hr class='separator'>");
                    separatori--;
                redBr+=2;
            }
        });
    });
});

// pojavljivanje pada za cuvanje na klik na dugme "saved pads"
$("#savedPads").click(function () {
    $("#text-wrap").toggleClass(" col-md-8");
    $("#savedNotes").toggleClass(" col-md-4 on-off");
});
// Stavljanje novog pada
$("#newPad").click(function(){
    let text = document.getElementById("textArea").value;
    if(text === "") return; // funckija koja ce da vraca cuva notepad
    else{
        if(confirm("Are you sure you don't want to save this Pad?")){
            document.getElementById("textArea").value = "";
        }
        else{
            saveNotepad();
            return;
        }
    }
});
