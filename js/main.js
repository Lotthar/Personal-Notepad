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
            return;
        }
    }
});
// Stilizovanje font-a teksta
var switcher1 = 0, switcher2 = 0, switcher3 = 0;
$("#boldTxt").click(function(){
    if(switcher1 == 0){
        $("#boldTxt").css("background","#F3E4A0");
        $("#textArea").css("font-weight","bolder");
        switcher1 = 1;
    } else {
        $("#boldTxt").css("background", "#BA4025");
        $("#textArea").css("font-weight", "normal");
        switcher1 = 0;
    }
});
$("#italTxt").click(function () {
    if (switcher2 == 0) {
        $("#italTxt").css("background", "#F3E4A0");
        $("#textArea").css("font-style", "italic");
        switcher2 = 1;
    } else {
        $("#italTxt").css("background", "#BA4025");
        $("#textArea").css("font-style", "normal");
        switcher2 = 0;
    }
});
$("#underTxt").click(function () {
    if (switcher3 == 0) {
        $("#underTxt").css("background", "#F3E4A0");
        $("#textArea").css("text-decoration-line", "underline");
        switcher3 = 1;
    } else {
        $("#underTxt").css("background", "#BA4025");
        $("#textArea").css("text-decoration", "none");
        switcher3 = 0;
    }
});
$("#colorTxt").change(function(){
    let $boja = $("#colorTxt").val();
    $("#textArea").css("color", $boja);
});

$("#fontSize").change(function(){
    let size = $("#fontSize").val();
    console.log(size);
    switch(size){
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

// cuvanje biljeski