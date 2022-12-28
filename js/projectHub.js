
class Project {
    constructor(aName, aLink) {
        this.name = aName;
        this.link = aLink;
    }
}

function hubMain() {
    var projectBrowser = document.getElementById("projectBrowser");
    console.log(projectBrowser);

    var projectsList = [];
    
    const chessGame = new Project("Chess Game", "./projects/chess2.0/chess.html");
    projectsList.push(chessGame);

    // Add projects to list
    for (var i = 0; i < projectsList.length; i++) {
        var curProject = projectsList[i];
        var tempElement = document.createElement("div");
        tempElement.classList.add("projects");
        tempElement.id = curProject.name;
        tempElement.innerText = curProject.name;
        projectBrowser.appendChild(tempElement);
    }

    console.log("LOL");
}

hubMain();