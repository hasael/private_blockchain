const BlockChain = require('../src/blockchain.js');

describe('blockchain ', () => {
  it('should have genesis block', async () => {
    let myBC = new BlockChain.Blockchain();
    expect(await myBC.getChainHeight()).toBe(1);
  });

  it('should calculate chain height', async () => {
    let myBC = new BlockChain.Blockchain();
    myBC._addBlock({ data: "data1" });
    myBC._addBlock({ data: "data2" });
    myBC._addBlock({ data: "data3" });
    expect(await myBC.getChainHeight()).toBe(4);
  });

  it('should return stars per owner', async () => {
    let myBC = new BlockChain.Blockchain();
    let address = "owner";
    myBC._addBlock({ star: "star1", owner: address });
    myBC._addBlock({ star: "star2", owner: "other owner" });
    myBC._addBlock({ star: "star3", owner: address });
    let result = await myBC.getStarsByWalletAddress(address);
    expect(result.length).toBe(2);
  });

  it('should return validation errors', async () => {
    let myBC = new BlockChain.Blockchain();
    let address = "owner";

    myBC._addBlock({ star: "star1", owner: address });
    myBC._addBlock({ star: "star2", owner: address });
    myBC._addBlock({ star: "star3", owner: address });

    let secondBlock = myBC.chain[2];
    let thirdBlock = myBC.chain[3];
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