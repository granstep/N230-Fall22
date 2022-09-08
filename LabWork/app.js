//encalsulation
class Stock{
    constructor(amount){
        this.amount = amount;
    }

    setAmount(newAmount){
        if(newAmount >= 0){
            this.amount = newAmount;
        }
        else{
            console.error("Stock can not be negative.");
        }
    }

    getAmount(){
        return this.amount;
    }
}
//inheritance
class Book extends Stock{
    constructor(amount, price){
        super(amount);
        this.price = price;
    }
    setAmount(newAmount){
        if(newAmount >= 0){
            this.amount = newAmount;
        }
        else{
            console.error("Stock can not be negative.");
        }
    }
}