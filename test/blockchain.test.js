const BlockChain = require('../src/blockchain.js');
const SHA256 = require('crypto-js/sha256');
const BlockClass = require('../src/block.js');

describe('blockchain ', () => {
  it('should have genesis block', async () => {
    let myBC = new BlockChain.Blockchain();
    expect(await myBC.getChainHeight()).toBe(1);
  });

  it('should calculate chain height', async () => {
    let myBC = new BlockChain.Blockchain();
    myBC._addBlock(new BlockClass.Block({ data: "data1" }));
    myBC._addBlock(new BlockClass.Block({ data: "data2" }));
    myBC._addBlock(new BlockClass.Block({ data: "data3" }));
    expect(await myBC.getChainHeight()).toBe(4);
  });

  it('should return stars per owner', async () => {
    let myBC = new BlockChain.Blockchain();
    let address = "owner";
    myBC._addBlock(new BlockClass.Block({ star: "star1", owner: address }));
    myBC._addBlock(new BlockClass.Block({ star: "star2", owner: "other owner" }));
    myBC._addBlock(new BlockClass.Block({ star: "star3", owner: address }));
    let result = await myBC.getStarsByWalletAddress(address);
    expect(result.length).toBe(2);
  });

  it('should return validation errors', async () => {
    let myBC = new BlockChain.Blockchain();
    let address = "owner";
    let firstBlock = new BlockClass.Block({ star: "star1", owner: address });
    let secondBlock = new BlockClass.Block({ star: "star2", owner: address });
    let thirdBlock = new BlockClass.Block({ star: "star3", owner: address });
    myBC._addBlock(firstBlock);
    myBC._addBlock(secondBlock);
    myBC._addBlock(thirdBlock);
    secondBlock.previousBlockHash = "tampered hash";
    thirdBlock.body = "tampered block";
    let result = await myBC.validateChain();
    console.log(result);
    expect(result.length).toBe(2);
  });

  it('should reject more than 5 minutes time difference', async () => {
    let myBC = new BlockChain.Blockchain();
    let previous = 1637008342;
    let current = 1637008842;

    expect(myBC._isCorrectTime(previous, current)).toBe(false);
  });
  it('should accept up to 5 minutes time difference', async () => {
    let myBC = new BlockChain.Blockchain();
    let previous = 1637008342;
    let current = 1637008442;

    expect(myBC._isCorrectTime(previous, current)).toBe(true);
  });
});