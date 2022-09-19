
const {ENTER, DOWN} = require('cli-prompts-test');
const runTest = require('cli-prompts-test');
const expect = require('expect.js');
const cliPath = `./main.js`;

describe("cli appand user`s data", () => {

  it("cli can appand user`s data to db", async () => {
    const { stdout } = await runTest([cliPath], ['Test', ENTER, DOWN, ENTER, '55', ENTER,  ENTER, ENTER, ENTER]);
  });
})


describe("cli can find and return user`s data", () => {

  it("cli can find User from db", async () => {
    const { stdout } = await runTest([cliPath], [ENTER, ENTER, 'Test', ENTER]);
    expect(stdout).to.contain(`{user: 'Test', gender: 'Male' , age: '55'}`);
  });

});