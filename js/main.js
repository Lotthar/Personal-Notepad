// povecanje prostora za pisanje
$(document).ready(function() {
    let $prozorVisina = $(window).height() - 90;
    $('.notepad').height($prozorVisina - 20);
    $(window).resize(function(){
        let $prozorVisina = $(window).height() - 135;
        $('.notepad').height($prozorVisina - 20);
    });
});
let btn = [];
// pojavljivanje pada za cuvanje na klik na dugme "saved pads"
$("#savedPads").click(function () {
    $("#text-wrap").toggleClass(" col-md-8");
    $("#savedNotes").toggleClass(" col-md-4 on-off");
});
// Stavljanje novog pada
$("#newPad").click(function(){
    let text = document.getElementById("textArea").value;
    if(text === "") saveNotepad(); // funckija koja ce da vraca cuva notepad
    else{
        if(confirm("Are you sure you don't want to save this Pad?")){
            document.getElementById("textArea").value = "";
        }
        else{
            return;
        }
    }
});