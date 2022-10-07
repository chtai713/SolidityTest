pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract DevNFToken is ERC721, ERC721Burnable, ERC721Pausable{
    uint256 curr_id = 0;
    address owner;

    constructor() ERC721("DEVNFToken", "DNT") {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    function mint() onlyOwner() public {
        _mint(owner, curr_id);
        curr_id += 1;
    }

    function pause() onlyOwner() public {
        _pause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}
