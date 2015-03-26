descriptions = new Array(
	"student",
	"git lover",
	"open sourcer",
	"programmer",
	"nerd",
	"space enthousiast",
	"poweruser"
	);

var oldIndex = 0;

function generate() {
	index1 = Math.floor(Math.random() * descriptions.length);
	if (index1 == oldIndex) {
		if (index1 == 0) {
			index1 = descriptions.length;
		} else {
			index1--;
		};
	};
	var desc= descriptions[index1];
	document.getElementById("generated").innerHTML = desc;
	oldIndex = index1;
}