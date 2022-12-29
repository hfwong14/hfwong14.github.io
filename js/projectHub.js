
class Project {
    constructor(aName, aLink, aImg) {
        this.name = aName;
        this.link = aLink;
        this.img = aImg;
    }
}

function clickedCell(aLink) {
    alert(link);
    alert("HES");
}

function hubMain() {
    var projectBrowser = document.getElementById("projectBrowser");
    console.log(projectBrowser);

    var projectsList = [];
    
    const chessGame = new Project("Chess Game", "./projects/chess2.0/chess.html", "img/chessBG.png");
    projectsList.push(chessGame);
    const foodRandomizer = new Project("Food Randomizer", "./projects/foodRandomizer/foodRandomizer.html");
    projectsList.push(foodRandomizer);
    // projectsList.push(foodRandomizer);

    // Add projects to list
    for (var i = 0; i < projectsList.length; i++) {
        var curProject = projectsList[i];
        var tempElement = document.createElement("div");
        tempElement.classList.add("projects");
        tempElement.id = curProject.link;
        tempElement.style.backgroundImage = "url('./img/chessBG.png');";

        var tempText = document.createElement("p");
        // tempText.href = curProject.link;
        tempText.innerText = curProject.name;
        tempText.classList.add("projectName");
        tempElement.appendChild(tempText);

        tempElement.addEventListener("click", function() {location.assign(this.id)}, false);

        projectBrowser.appendChild(tempElement);
    }

    console.log("LOL");
}

hubMain();