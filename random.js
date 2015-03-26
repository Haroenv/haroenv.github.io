first = new Array(
	"student",
	"git lover",
	"open sourcer",
	"programmer",
	"nerd",
	"space enthousiast"
	);

function generate() {
	index1 = Math.floor(Math.random() * first.length);
	var jobtitle = first[index1] ;
	document.getElementById("generated").innerHTML = jobtitle;
}