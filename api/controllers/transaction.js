const ActorContract = require("../contracts/actor");
const TransactionContract = require("../contracts/transaction");

/*  GET */

exports.getHistoryTransaction = async (req, res, next) => {
    try {
        const historyTransaction = TransactionContract.getHistoryTransaction(req.addressTransaction);

        res.status(201).json({
            success: true,
            data: historyTransaction,
        });
    } catch (err) {
        next(err);
    }
};

/*  POST */

exports.createTransaction = async (req, res, next) => {
    try {

        let addressPreviousTransaction = req.body.addressPreviousTransaction != undefined ? req.body.addressPreviousTransaction : "0x0000000000000000000000000000000000000000";

        const transaction = await ActorContract.createTransaction(
            req.body.actorAddress,
            req.body.receiverAddress,
            req.body.productName,
            addressPreviousTransaction
        );

        res.status(201).json({
            success: true,
            data: {
                transaction : transaction
            }
        });
    } catch (err) {
        next(err);
    }
};

/*  PUT */

exports.acceptTransaction = async (req, res, next) => {
    try {

        const ans = await TransactionContract.acceptTransaction(req.body.transactionAddress, req.body.receiverAddress);

        if(!ans.success){
            res.status(400).json({
                success: false,
                data: ans.data,
            });
        } else {
            res.status(200).json({
                success: true,
                data: ans.data,
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.finishTransaction = async (req, res, next) => {
    try {
        const ans = await TransactionContract.finishTransaction(req.body.transactionAddress, req.body.receiverAddress);

        if(!ans.success){
            res.status(400).json({
                success: false,
                message: ans.data,
            });
        } else {
            res.status(200).json({
                success: true,
                data: ans.data,
            })
        };
    } catch (err) {
        next(err);
    }
};

/*  DELETE */
