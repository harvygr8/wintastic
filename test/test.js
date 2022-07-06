const wintastic = require('../dist/getStartupCommand');

const res = wintastic.getStartupCommand().then((res) => console.log(res));
