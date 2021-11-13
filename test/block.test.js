const block = require('../src/block.js');
const SHA256 = require('crypto-js/sha256'); 

  describe('block ', () => {
    it('should validate when unchanged', async () => {
      let myBlock = new block.Block("my data");
      myBlock.hash = SHA256(myBlock.body).toString();
      let result = await myBlock.validate();
      expect(result).toBe(true);
    });

    it('should not validate when changed', async () => {
      let myBlock = new block.Block("my data");
      myBlock.hash = SHA256(myBlock.body).toString();
      myBlock.body = "modified body";
      let result = await myBlock.validate();
      expect(result).toBe(false);
    });
    
    it('should return data', async () => {
      const bData = "my data";
      let myBlock = new block.Block(bData);
      
      expect(myBlock.getBData()).toBe(bData);
    });
});