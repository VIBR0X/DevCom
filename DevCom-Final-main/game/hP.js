var gunShot = new Audio('sounds/gunfinal.m4a');
var zombieRoar = new Audio('sounds/Zombiefinal.m4a');
zombieRoar.volume = 0.6;

var healthPoints = 100;

function updateHealthPoints(points) {

	healthPoints = points;
	var healthBar = document.querySelector("#healthBar");
	healthBar.style.width = points + "%";

	if(healthPoints < 1) {
		alert("Game over!");
		window.location.reload();
	}

}

function newGame() {
	randomEnemyAttacks();
	document.querySelector("button").style.display = "none";
	}


function livingEnemies() {
	return document.querySelectorAll(".enemy:not(.dead)");
}


function iShoot(enemy) {
	enemy.classList.remove("shooting");
	enemy.classList.remove("showing");
	enemy.classList.add("dead");
    if(!livingEnemies().length) {
		
		window.location.href =
			"level2/main.html";
	}

}


function enemyAttacksMe(enemy) {

	if(healthPoints > 0) {

		enemy.classList.add("showing");
		zombieRoar.play();

		setTimeout(()=> {
			enemyhitsMe(enemy);
		}, 2000);

		setTimeout(()=> {
			enemy.classList.remove("showing");
		}, 2000);
		
	}


}


function enemyhitsMe(enemy) {

	if(!enemy.classList.contains("dead")) {

		enemy.classList.add("shooting");
		updateHealthPoints(healthPoints - 20);

		setTimeout(()=> {
			enemy.classList.remove("shooting");
		}, 200);

	}

}


function randomEnemyAttacks() {

	var randomEnemyNo = Math.random() * livingEnemies().length;
	randomEnemyNo = Math.floor(randomEnemyNo);
	var enemy = livingEnemies()[randomEnemyNo];

	var randomDelay = Math.random() * 2000 + 1000;

	setTimeout( ()=> {
		enemyAttacksMe(enemy);
		randomEnemyAttacks();
	}, randomDelay);

}