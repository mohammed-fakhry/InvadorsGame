var hero = {
    top: 800,
    left: 850
};
var counter = 0;
var lost;
var missiles = [];
var enemies = [
    { top: 100, left: 200 },
    { top: 100, left: 400 },
    { top: 100, left: 600 },
    { top: 100, left: 800 },
    { top: 100, left: 1000 },
    { top: 100, left: 1200 },
    { top: 100, left: 1400 },
    { top: 100, left: 1600 },
    { top: 200, left: 200 },
    { top: 200, left: 400 },
    { top: 200, left: 600 },
    { top: 200, left: 800 },
    { top: 200, left: 1000 },
    { top: 200, left: 1200 },
    { top: 200, left: 1400 },
    { top: 200, left: 1600 }
]

document.addEventListener("click", function (e) {
    console.log(e)
})
document.addEventListener("keydown", function (e) {
    if (hero.left <= 2000) {
        //move left
        if (e.keyCode == 37) {
            if (hero.left < 1900 && hero.left >= 100) {
                hero.left = hero.left - 50;
                moveHero()
            }

        }
        // move right
        if (e.keyCode == 39) {
            if (hero.left < 1800) {
                hero.left = hero.left + 50;
                moveHero()
            }

        }
        //fire
        if (e.keyCode == 32) {
            missiles.push({
                left: hero.left + 22,
                top: hero.top
            })
            drawMissiles()

        }
    }
})

function moveHero() {
    document.getElementById("hero").style.left = hero.left + "px";
}

function drawMissiles() {
    document.getElementById("missiles").innerHTML = "";
    for (var m = 0; m < missiles.length; m++) {
        document.getElementById("missiles").innerHTML +=
            `<div class="missile" style="top: ${missiles[m].top}px; left:${missiles[m].left}px;"></div>`;
    }
}

function moveMissiles() {
    for (var m = 0; m < missiles.length; m++) {
        missiles[m].top = missiles[m].top - 30;
    }
}

function moveEnemies() {
    for (var e = 0; e < enemies.length; e++) {
        enemies[e].top = enemies[e].top + 1,
            enemies[e].top == hero.top - 80 &&
            (clearTimeout(lost),
                document.getElementById("restart").classList.remove("d-none"));
    }
}

function drawEnemies() {
    document.getElementById("enemies").innerHTML = "";
    for (var e = 0; e < enemies.length; e++) {
        document.getElementById("enemies").innerHTML +=
            `<div class="enemy" style="top: ${enemies[e].top}px; left:${enemies[e].left}px;"></div>`;
    }
}
function missileHint() {
    for (var e = 0; e < enemies.length; e++) {
        for (var m = 0; m < missiles.length; m++) {
            if (
                (missiles[m].top <= enemies[e].top + 50) &&
                (missiles[m].top >= enemies[e].top) &&
                (missiles[m].left <= enemies[e].left + 50) &&
                (missiles[m].left >= enemies[e].left)
            ) {
                (enemies.splice(e, 1),
                    missiles.splice(m, 1),
                    counter++,
                    document.getElementById("score").innerHTML = "Score: " + counter)
            }
        }
    }
}
function gameloop() {
    lost = setTimeout(gameloop, 70)
    moveMissiles()
    drawMissiles()
    moveEnemies()
    drawEnemies()
    missileHint()
    won()
}

document.getElementById("restart").addEventListener("click", function () {
    document.getElementById("restart").classList.add("d-none");
    location.reload()
})

document.getElementById("won").addEventListener("click", function () {
    document.getElementById("won").classList.add("d-none");
    location.reload()
})
gameloop();
function won() {
    if (counter == 16) {
        (clearTimeout(lost),
            document.getElementById("won").classList.remove("d-none"))
    }
}
