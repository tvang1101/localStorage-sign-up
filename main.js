document.getElementById('signUpForm').addEventListener('submit', savePlayer);

// Save Player
function savePlayer(e) {
	var playerSF = document.getElementById('nameInput').value;
	var characterSF = document.getElementById('characterInput').value;
	var regionSF = document.getElementById('regionInput').value;

	if (!validateForm(playerSF, characterSF)) {
		return false;
	}

	var player = {
		name: playerSF,
		character: characterSF,
		region: regionSF
	};

	// Test if player is null
	if (localStorage.getItem('players') === null) {
		var players = [];
		players.push(player);

		// Re-set back to localStorage
		localStorage.setItem('players', JSON.stringify(players));
	} else {
		var players = JSON.parse(localStorage.getItem('players'));
		players.push(player);

		// Re-set back to localStorage
		localStorage.setItem('players', JSON.stringify(players));
	}

	document.getElementById('signUpForm').reset();

	fetchPlayers();

	e.preventDefault();
}

function fetchPlayers() {
	var players = JSON.parse(localStorage.getItem('players'));
	var playersResults = document.getElementById('playersResults');

	// Building output
	playersResults.innerHTML = '';

	for(var i = 0; i < players.length; i++) {
		var name = players[i].name;
		var character = players[i].character;
		var region = players[i].region;

		playersResults.innerHTML += '<div class="well">' + 
																'<h3>Player: ' + name + '</h3>' +
																'<h4>Character: ' + character + '</h4>' +
																'<h4>Region: ' + region + '</h4>' +
																'</div>';
	}

}

function validateForm(nameSF, characterSF){
	if (!nameSF | !characterSF) {
		alert('Please fill in the form');
		return false;
	}
	return true;
}