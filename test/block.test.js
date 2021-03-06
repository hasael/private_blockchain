const block = require('../src/block.js');

describe('block ', () => {
  it('should validate when unchanged', async () => {
    let myBlock = new block.Block("my data", null , -1);
    let result = await myBlock.validate();
    expect(result).toBe(true);
  });

  it('should not validate when changed', async () => {
    let myBlock = new block.Block("my data", null , -1);
    myBlock.body = "modified body";
    let result = await myBlock.validate();
    expect(result).toBe(false);
  });

  it('should return data', async () => {
    const bData = "my data";
    let myBlock = new block.Block(bData, null , -1);

    expect(myBlock.getBData()).toBe(bData);
  });

  it('should return star data and owner', async () => {

    const star = `"star": {
        "dec": "68 52' 56.9",
        "ra": "16h 29m 1.0s",
        "story": "Testing the story 4"
    }`;
    const owner = "tb1qj7jhnsngx7xp900906erklf4dj9g4lmr8rustn"
    let myBlock = new block.Block({ star: star, owner: owner }, null , -1);

    expect(myBlock.getBData().owner).toBe(owner);
    expect(myBlock.getBData().star).toBe(star);
  });
});