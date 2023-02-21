// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.5.0 < 0.9.0;
contract EtherPay {
    mapping (address => uint256) public userLockedBalance;
    event transactions(address indexed from, address to, uint amount, string symbol);
    event recipeints(address indexed reecipientOf, address recipient, string recipientName);

    function _transfer(address payable _to, string memory symbol) public payable {
        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol);
    }
    function lock() public payable {
        require(msg.value > 0, "Cannot lock 0 ETH");
        userLockedBalance[msg.sender] += msg.value;
    }

    function unlock() public payable {
        require(userLockedBalance[msg.sender] >= msg.value , "Insufficient balance to unlock funds");
        payable(msg.sender).transfer(userLockedBalance[msg.sender]);
        userLockedBalance[msg.sender] = 0;
    }

    function getUserLockedBalance(address user) public view returns (uint256) {
        return userLockedBalance[user];
    }

    function addRecipient(address recipient, string memory name) public {
        emit recipeints(msg.sender, recipient, name);
    } 
}

//goelri = 0xdC4d5DD3F1E67ee427E46D84158a359991e8DcA5