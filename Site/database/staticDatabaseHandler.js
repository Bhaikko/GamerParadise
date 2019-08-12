const { Platforms, Genres} = require("./database");

const addPlatform = (platform) => {
    Platforms.create({
        platform 
    });
}

const addGenre = (genre) => {
    Genres.create({
        genre 
    });
}

// platforms = ["PS1", "PS2", "PS3", "PS4", "Xbox", "Xbox 360", "Xbox One", "Wii", "Wii U", "Switch", "PC"];
// platforms.map((platform) => {
//     addPlatform(platform);
// });

// genres = ["Platformer", "Shooter", "Steath", "Survival", "Battle Royale", "Horror", "Racing", "Open World", "Sports", "Fighting"];
// genres.map((genre) => {
//     addGenre(genre);
// });
