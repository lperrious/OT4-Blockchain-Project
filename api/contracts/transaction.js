const contract = require("@truffle/contract");

const transaction_artifact = require("./builds/Transaction.json");
const actor_artifact = require("./builds/Actor.json");

var Transaction = contract(transaction_artifact);
var Actor = contract(actor_artifact);

// Following are functions which permit to have a JS abstract of the Smart Contract
// and to interact with the ethereum blockchain
// (i.e. create a new instance, deploy it, call its function, etc.)
module.exports = {
    init: function () {
        Transaction.setProvider(web3.currentProvider);
        Actor.setProvider(web3.currentProvider);
    },

    getHistoryTransaction : async function (transactionAddress) {
        let historyTransaction = [];
    
        do {
            transaction = await (await Transaction.at(transactionAddress)).getTransactionInformations();
            historyTransaction.push({
                actorAddress: transaction._actorAddress,
                receiverAddress: transaction._receiverAddress,
                productName: transaction._productName,
                transactionAddress: transactionAddress,
                addressPreviousTransaction: transaction.addressPreviousTransaction,
                date: transaction._date,
                isFinished: transaction._isFinished,
                isAccepted: transaction._isAccepted,
            });
            transactionAddress = transaction._addressPreviousTransaction
        } while (transactionAddress != "0x0000000000000000000000000000000000000000");
    
        return historyTransaction;
    },

    // Accept an incoming transaction
    acceptTransaction: async function (addressTransaction, receiverAddress) {

        // TODO create a fonction in the actor.sol to call the accept method of the transaction contract
        // TODO Add a check in the transaction contract to verify the if it is the reciverAddress is the actor who initates the call
        // TODO Add a check to verify the contract is not already accepted
        // TODO Do the same for finish transaction
        
        var transaction = await Transaction.at(addressTransaction);

        const accounts = await web3.eth.getAccounts();

        await transaction.acceptTransaction({from : accounts[0]});
        
        isAccepted = await transaction.isAccepted.call()
        if(isAccepted) {
            return {
                success : true,
                data: "Transaction accepted."
            }
        };

        return {
            success: false,
            data: "Transaction not accepted."
        }

    },

    // Finish a pending transaction
    finishTransaction: async function (addressTransaction, receiverAddress) {
        var transaction = await Transaction.at(addressTransaction);

        const accounts = await web3.eth.getAccounts();

        await transaction.finishTransaction({from : accounts[0]});
        
        isFinished = await transaction.isFinished.call()
        if(isFinished) {
            return {
                success : true,
                data: "Transaction finished."
            }
        };

        return {
            success: false,
            data: "Transaction not finished."
        }
    },
};
