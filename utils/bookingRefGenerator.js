class BookingRef {
    constructor(strategy){
        this.strategy = strategy;
    }

    generateRef(){
        return this.strategy.generate();
    }
}

module.exports = BookingRef;