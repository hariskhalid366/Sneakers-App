// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvancedToken is ERC20Burnable, ERC20Capped, Pausable, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 cap
    )
        ERC20(name, symbol)
        ERC20Capped(cap * 10 ** decimals())
    {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _update(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Capped)
        whenNotPaused
    {
        super._update(from, to, amount);
    }
}



import {
  createThirdwebClient,
  sendTransaction,
  getContract,
  Engine,
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc1155";

// Create a thirdweb client
const client = createThirdwebClient({
  secretKey: "<your-project-secret-key>",
});

// Create a server wallet
const serverWallet = Engine.serverWallet({
  client,
  address: "<your-server-wallet-address>",
});

// Prepare the transaction
const transaction = claimTo({
  contract: getContract({
    client,
    address: "0x...", // Address of the ERC1155 token contract
    chain: baseSepolia, // Chain of the ERC1155 token contract
  }),
  to: "0x...", // The address of the user to mint to
  tokenId: 0n, // The token ID of the NFT to mint
  quantity: 1n, // The quantity of NFTs to mint
});

// Enqueue the transaction via Engine
const { transactionId } =
  await serverWallet.enqueueTransaction({
    transaction,
  });

// Get the execution status of the transaction at any point in time
const executionResult = await Engine.getTransactionStatus({
  client,
  transactionId,
});

// Utility function to poll for the transaction to be submitted onchain
const txHash = await Engine.waitForTransactionHash({
  client,
  transactionId,
});
console.log("Transaction hash:", txHash);