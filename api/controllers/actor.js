const { sendJWT } = require("../util/sendJWT");
const ActorContract = require("../contracts/actor");

/*  GET */

/*  POST */

exports.registerActor = async (req, res, next) => {
    try {
        // Create the actor (blockchain)
        // POC : Need some ether from a Ganache created account
        let newActorContract = await ActorContract.createActor(
            req.body.name
        );

        res.status(201).json({
            success: true,
            data: {
                actorAddress : newActorContract
            },
        });
    } catch (err) {
        next(err);
    }
};

/*  PUT */

/*  DELETE */