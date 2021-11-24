var Actor;

const contract = require("@truffle/contract");
const actor_artifact = require("./builds/Actor.json");

Actor = contract(actor_artifact);

// Following are functions which permit to have a JS abstract of the Smart Contract
// and to interact with the ethereum blockchain
// (i.e. create a new instance, deploy it, call its function, etc.)
module.exports = {
    init: function () {
        Actor.setProvider(web3.currentProvider);
    },
    
    // Create a new actor on the bc
    createActor: async function (name) {
        const accounts = await web3.eth.getAccounts();

        newActor = await Actor.new(
            name, // string:
            { from: accounts[0] }
        );

        return newActor.address;
    },

    // Create a transaction
    createTransaction: async function (
        actorAddress,
        receiverAddress,
        productName,
        addressPreviousTransaction
    ) {
        //TODO in the sol file, verify that the previous transaction is accepted
        
        const sender = await Actor.at(actorAddress);

        const accounts = await web3.eth.getAccounts();

        var ans = await sender.createTransaction(
            actorAddress,
            receiverAddress,
            productName,
            addressPreviousTransaction,
            { from: accounts[0] }
        );
        
        console.log(ans)
        return ans.logs[0].args._address;
    },
};
