const { Genres} = require("./database");

const addGenre = (genre) => {
    Genres.create({
        genre 
    });
}

// genres = ["Platformer", "Shooter", "Stealth", "Survival", "Battle Royale", "Horror", "Racing", "Open World", "Sports", "Fighting"];
// genres.map((genre) => {
//     addGenre(genre);
// });
