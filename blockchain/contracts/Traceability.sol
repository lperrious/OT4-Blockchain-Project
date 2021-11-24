pragma solidity >=0.4.22 <0.9.0;

pragma experimental ABIEncoderV2;

contract Actor {
    string public name;

    //address public owner;

    constructor(string memory _name) public {
        name = _name;
        //owner = msg.sender;
    }

    event TransactionCreated(address _address);

    function createTransaction(
        address _actorAddress,
        address _receiverAddress,
        string memory _productName,
        address _addressPreviousTransaction
    ) public {
        //require(msg.sender == owner, "Only the actor can create a transaction");

        Transaction newTransaction = new Transaction(
            _actorAddress,
            _receiverAddress,
            _productName,
            _addressPreviousTransaction
        );
        emit TransactionCreated(address(newTransaction));
    }

    function getActorInformations()
        external
        view
        returns (string memory _name)
    {
        _name = name;
    }
}

contract Transaction {
    address actorAddress;
    address receiverAddress;
    string productName;
    address addressPreviousTransaction;
    uint256 public date;
    bool public isFinished;
    bool public isAccepted;

    constructor(
        address _actorAddress,
        address _receiverAddress,
        string memory _productName,
        address _addressPreviousTransaction
    ) public {
        actorAddress = _actorAddress;
        receiverAddress = _receiverAddress;
        productName = _productName;
        addressPreviousTransaction = _addressPreviousTransaction;
        date = block.timestamp;
        isFinished = false;
        isAccepted = false;
    }

    function acceptTransaction() external {
        isAccepted = true;
    }

    function finishTransaction() external {
        isFinished = true;
    }

    function getTransactionInformations()
        external
        view
        returns (
            address _actorAddress,
            address _receiverAddress,
            string memory _productName,
            address _addressPreviousTransaction,
            uint256 _date,
            bool _isFinished,
            bool _isAccepted
        )
    {
        _actorAddress = actorAddress;
        _receiverAddress = receiverAddress;
        _productName = productName;
        _addressPreviousTransaction = addressPreviousTransaction;
        _date = date;
        _isFinished = isFinished;
        _isAccepted = isAccepted;
    }
}
