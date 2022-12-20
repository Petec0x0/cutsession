class RandomStrategy {
    constructor(extent, characters) {
        this.extent = extent;
        this.characters = characters;
    }

    generate() {
        let ref = '';
        for (let i = this.extent; i > 0; --i){
            ref += this.characters[Math.floor(Math.random() * this.characters.length)];
        }
        return ref;
    }
}

module.exports = RandomStrategy;