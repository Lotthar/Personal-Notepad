// povecanje prostora za pisanje
$(document).ready(function() {
    let $prozorVisina = $(window).height() - 90;
    $('.notepad').height($prozorVisina - 20);
    $(window).resize(function(){
        let $prozorVisina = $(window).height() - 90;
        $('.notepad').height($prozorVisina - 20);
    });
});
let btn = [];
