const fetch = require('node-fetch');
module.exports = {
  name: 'tfetch',
  description: "test node fetch command",

  async execute(message, args, bot) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const body = await response.text();

    console.log(body);
    message.reply(`Hello ${body}`);

  }
}
