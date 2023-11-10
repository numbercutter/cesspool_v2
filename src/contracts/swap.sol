// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenSwap {
    IERC20 public token1;
    IERC20 public token2;

    address public owner;
    uint256 public rate; // Rate of token1 to token2
    bool public paused = false;

    event Swap(address indexed user, uint256 amountToken1, uint256 amountToken2);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PauseChanged(bool isPaused);
    event RateChanged(uint256 newRate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Swapping is paused");
        _;
    }

    constructor(address _token1, address _token2, uint256 _rate) {
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
        owner = msg.sender;
        rate = _rate;
    }

    function swap(uint256 amountToken1) public whenNotPaused {
        require(amountToken1 == 500 * 10**18, "You need to send exactly 500 token1");
        uint256 amountToken2 = (amountToken1 / rate) * 10**18;
        require(token2.balanceOf(address(this)) >= amountToken2, "Insufficient token2 in contract");

        // Transfer token1 from sender to this contract
        require(token1.transferFrom(msg.sender, address(this), amountToken1), "Token1 transfer failed");

        // Transfer token2 from this contract to the sender
        require(token2.transfer(msg.sender, amountToken2), "Token2 transfer failed");

        emit Swap(msg.sender, amountToken1, amountToken2);
    }

    function setRate(uint256 newRate) external onlyOwner {
        rate = newRate;
        emit RateChanged(newRate);
    }

    function pause() external onlyOwner {
        paused = true;
        emit PauseChanged(true);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit PauseChanged(false);
    }

    function withdrawToken1(uint256 amount) external onlyOwner {
        require(token1.transfer(msg.sender, amount), "Token1 withdrawal failed");
    }

    function withdrawToken2(uint256 amount) external onlyOwner {
        require(token2.transfer(msg.sender, amount), "Token2 withdrawal failed");
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
