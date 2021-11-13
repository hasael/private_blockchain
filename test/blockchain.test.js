const BlockChain = require('../src/blockchain.js');
const SHA256 = require('crypto-js/sha256'); 

  describe('blockchain ', () => {
    it('should have genesis block', async () => {
      let myBC = new BlockChain.Blockchain();
      expect(await myBC.getChainHeight()).toBe(1);
    });
 
});