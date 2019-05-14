// povecanje prostora za pisanje dinamicki kako se prozor mijenja
$(document).ready(function() {
	let $prozorVisina = $(window).height() - 145;
	$(".notepad").height($prozorVisina - 20);
	$(window).resize(function() {
		let $prozorVisina = $(window).height() - 145;
		$(".notepad").height($prozorVisina - 20);
	});

	// ucitavanje svih note-a iz baze kad se ucita dokument
	loadAllNotes();
});
//// ------------------------------------------------------------------------------
//ucitavanja svih biljeski
function loadAllNotes() {
	$.getJSON("../NotepadJS/php/api.php", { method: "allNotes" }, function(
		notes
	) {
		let redBr = 1;
		let separatori = notes.length - 1;
		$.each(notes, function(index, pad) {
			if (notes == undefined || notes == null) {
				alert("Nemate nikakvih biljeski u bazi!");
			} else {
				// * smjestanje podataka
				$("#wrappedNotes").append("<div class='row'></div>");
				$("#wrappedNotes .row:nth-child(" + redBr + ")").append(
					"<div class='col-sm-6 ime-pad'></div>"
				);
				$("#wrappedNotes .row:nth-child(" + redBr + ") .ime-pad").append(
					"<h4 class='imePad'>" + pad.naziv + "</h4>"
				);
				$("#wrappedNotes .row:nth-child(" + redBr + ")").append(
					"<div class='col-sm-6 datum-pad'></div>"
				);
				$("#wrappedNotes .row:nth-child(" + redBr + ") .datum-pad").append(
					"<h5 class='datumPad'>" + pad.datum + "</h5>"
				);
				if (separatori != 0)
					$("#wrappedNotes").append("<hr class='separator'>");
				separatori--;
				redBr += 2;
			}
		});
	});
}
// ------------------------------------------------------------------------------
// pojavljivanje pada za cuvanje na klik na dugme "saved pads"
$("#savedPads").click(function() {
	$("#text-wrap").toggleClass(" col-md-8");
	$("#savedNotes").toggleClass(" col-md-4 on-off");
});
// ------------------------------------------------------------------------------
// Stavljanje novog pada
document.querySelector("#newPad").addEventListener("click", function() {
	let text = document.getElementById("textArea");
	text.style.fontWeight = "normal";
	text.style.fontStyle = "normal";
	text.style.textDecoration = "none";
	text.fontSize = "20px";
	text.color = "black";
	if (text.value === "") {
		document.getElementById("naslovTekst").value = "New Pad";
		return; // funckija koja ce da vraca cuva notepad
	} else {
		if (confirm("Are you sure you don't want to save this Pad?")) {
			document.getElementById("textArea").value = "";
			document.getElementById("naslovTekst").value = "New Pad";
		} else {
			return;
		}
	}
});
// ------------------------------------------------------------------------------
// Stilizovanje font-a teksta
var switcherB = 0,
	switcherI = 0,
	switcherU = 0;
// bold tekst
function bolder() {
	if (switcherB == 0) {
		$("#boldTxt").css("background", "#F3E4A0");
		$("#textArea").css("font-weight", "bolder");
		switcherB = 1;
	} else {
		$("#boldTxt").css("background", "#BA4025");
		$("#textArea").css("font-weight", "normal");
		switcherB = 0;
	}
}

// italic tekst
function italic() {
	if (switcherI == 0) {
		$("#italTxt").css("background", "#F3E4A0");
		$("#textArea").css("font-style", "italic");
		switcherI = 1;
	} else {
		$("#italTxt").css("background", "#BA4025");
		$("#textArea").css("font-style", "normal");
		switcherI = 0;
	}
}

// underline tekst
function underline() {
	if (switcherU == 0) {
		$("#underTxt").css("background", "#F3E4A0");
		$("#textArea").css("text-decoration-line", "underline");
		switcherU = 1;
	} else {
		$("#underTxt").css("background", "#BA4025");
		$("#textArea").css("text-decoration", "none");
		switcherU = 0;
	}
}
//bojanje teksta
function colorTxt() {
	$("#colorTxt").change(function() {
		let $boja = $("#colorTxt").val();
		$("#textArea").css("color", $boja);
	});
}
// font size teksta
function fontVelicina() {
	$("#fontSize").change(function() {
		let size = $("#fontSize").val();
		switch (size) {
			case "20":
				$("#textArea").css("font-size", "20px");
				break;
			case "25":
				$("#textArea").css("font-size", "25px");
				break;
			case "30":
				$("#textArea").css("font-size", "30px");
				break;
			case "35":
				$("#textArea").css("font-size", "35px");
				break;
			case "40":
				$("#textArea").css("font-size", "40px");
				break;
			case "45":
				$("#textArea").css("font-size", "45px");
				break;
			default:
				$("#textArea").css("font-size", "20px");
				break;
		}
	});
}
$("#boldTxt").click(bolder);
$("#italTxt").click(italic);
$("#underTxt").click(underline);
colorTxt();
fontVelicina();
// ------------------------------------------------------------------------------
// Vratiti tekst biljeske sa odredjenim naslovom
function dajTekst(noteNaslov, callback) {
	let zahtjev = new XMLHttpRequest();
	zahtjev.open(
		"GET",
		baseUrl + "api.php?method=noteTekst&naslov=" + noteNaslov
	);
	zahtjev.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// izmijeniti tako da vraca i sve ostalo vezano za tekst
			callback(JSON.parse(this.responseText).tekst);
		}
	};
	zahtjev.send();
}
// ------------------------------------------------------------------------------
// Ucitavanje svega iz Pada ukljucujuci i stilove
function dajNoteData(noteNaslov, callback) {
	let zahtjev = new XMLHttpRequest();
	zahtjev.open(
		"GET",
		"../NotepadJS/php /" + "api.php?method=noteData&naslov=" + noteNaslov
	);
	zahtjev.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// izmijeniti tako da vraca i sve ostalo vezano za tekst
			try {
				callback(JSON.parse(this.responseText));
			} catch (e) {}
		}
	};
	zahtjev.send();
}
// ------------------------------------------------------------------------------
// adding listeners to each name of the note if possible
function addReturn() {
	let container = document.getElementById("wrappedNotes");
	container.addEventListener("click", function(e) {
		let naslov = e.target.innerHTML;
		let trenutniNaslov = document.getElementById("naslovTekst");
		let notepad = document.getElementById("textArea");
		allNoteNames(function(svaImena) {
			if (svaImena.has(trenutniNaslov)) {
				if (confirm("Jeste li sacuvali sve izmjene biljeske?")) {
					dajNoteData(naslov, function(biljeskaPodaci) {
						notepad.value = decodeURIComponent(biljeskaPodaci.tekst);
						document.getElementById("naslovTekst").value = biljeskaPodaci.naziv;
						if (biljeskaPodaci.bold != "0") {
							notepad.style.fontWeight = "bolder";
							switcherB = 1;
							bolder();
						} else notepad.style.fontWeight = "normal";
						if (biljeskaPodaci.italic != "0") {
							switcherI = 1;
							italic();
							notepad.style.fontStyle = "italic";
						} else notepad.style.fontStyle = "normal";
						if (biljeskaPodaci.under != "0") {
							switcherU = 1;
							underline();
							notepad.style.textDecoration = "underline";
						} else {
							notepad.style.textDecoration = "none";
						}
						notepad.style.color = "#" + biljeskaPodaci.boja;
						$("#colorTxt").val("#" + biljeskaPodaci.boja);
						notepad.style.fontSize = biljeskaPodaci.font + "px";
						$("#fontSize").val(biljeskaPodaci.font);
					});
				} else {
					return;
				}
			} else {
				dajNoteData(naslov, function(biljeskaPodaci) {
					notepad.value = decodeURIComponent(biljeskaPodaci.tekst);
					document.getElementById("naslovTekst").value = biljeskaPodaci.naziv;
					if (biljeskaPodaci.bold != "0") {
						notepad.style.fontWeight = "bolder";
						switcherB = 0;
						bolder();
					} else {
						notepad.style.fontWeight = "normal";
						switcherB = 1;
						bolder();
					}
					if (biljeskaPodaci.italic != "0") {
						switcherI = 0;
						italic();
						notepad.style.fontStyle = "italic";
					} else {
						switcherI = 1;
						italic();
						notepad.style.fontStyle = "normal";
					}
					if (biljeskaPodaci.under != "0") {
						switcherU = 0;
						underline();
						notepad.style.textDecoration = "underline";
					} else {
						switcherU = 1;
						underline();
						notepad.style.textDecoration = "none";
					}
					notepad.style.color = "#" + biljeskaPodaci.boja;
					$("#colorTxt").val("#" + biljeskaPodaci.boja);
					notepad.style.fontSize = biljeskaPodaci.font + "px";
					$("#fontSize").val(biljeskaPodaci.font);
				});
			}
		});
	});
}
addReturn();
// ------------------------------------------------------------------------------
// ucitaj sva imena poruka iz baze u skup
function allNoteNames(callback) {
	let skup = new Set();
	$.getJSON("../NotepadJS/php/api.php", { method: "allNotesNames" }, function(
		names
	) {
		$.each(names, function(index, name) {
			skup.add(name.naziv);
		});
		callback(skup);
	});
}
// ------------------------------------------------------------------------------
// Provjerava je li naslov vec postoji u bazi tj da li moze da se napravi note sa tim naslovom
let naslov = document.getElementById("naslovTekst");
naslov.addEventListener("change", function() {
	allNoteNames(function(svaImena) {
		if (svaImena.has(naslov.value)) {
			alert("Vec postoji biljeska sa tim imenom, promjenite ime!");
			naslov.value = "New Pad";
			return;
		} else {
			return;
		}
	});
});
// ------------------------------------------------------------------------------
// Cuvanje biljeske
document.querySelector("#saving").addEventListener("click", function() {
	var method = "";
	let biljeskaTxt = document.querySelector("#textArea").value;
	if (biljeskaTxt == "") {
		alert("Niste unijeli nikakav tekst!");
		return;
	}
	let naslov = document.querySelector("#naslovTekst").value;
	let boja = document.querySelector("#colorTxt").value.substring(1);
	let font = document.querySelector("#fontSize").value;

	allNoteNames(function(svaImena) {
		if (svaImena.has(naslov)) {
			method = "Updating";
		} else {
			method = "Saving";
		}
		let url = "../NotepadJS/php/api.php?method=" + method + "&naslov=" + naslov;

		if (switcherB == 1) url += "&bold=1";
		else url += "&bold=0";

		if (switcherI == 1) url += "&italic=1";
		else url += "&italic=0";

		if (switcherU == 1) url += "?under=1";
		else url += "&under=0";

		url += "&boja=" + boja + "&font=" + font;

		let trenutno = new Date();
		let dd = String(trenutno.getDate()).padStart(2, "0");
		let mm = String(trenutno.getMonth() + 1).padStart(2, "0");
		let yyyy = trenutno.getFullYear();
		let datum = yyyy + "-" + mm + "-" + dd;

		url += "&datum=" + datum;

		url += "&tekst=" + encodeURIComponent(biljeskaTxt);
		let zahtjev = new XMLHttpRequest();
		zahtjev.open("POST", url, true);
		zahtjev.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				alert("Uspjesno ste sacuvali biljesku!");
				location.reload();
			}
		};
		zahtjev.send();
	});
});
// ------------------------------------------------------------------------------
// brisanje biljeske
document.querySelector("#deletePad").addEventListener("click", function() {
	let naslov = document.querySelector("#naslovTekst").value;
	let biljeskaTxt = document.querySelector("#textArea").value;
	if (naslov == "New Pad" && biljeskaTxt == "") {
		return;
	}
	let url = "../NotepadJS/php/api.php?method=deleting" + "&naslov=" + naslov;
	let zahtjev = new XMLHttpRequest();
	zahtjev.open("POST", url, true);
	zahtjev.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			alert("Uspjesno ste izbrisali biljesku!");
			location.reload();
		}
	};
	zahtjev.send();
});
