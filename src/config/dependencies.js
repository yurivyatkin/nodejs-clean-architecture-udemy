const useCases = require('../useCases');
const repositories = require('../repositories/inMemory');
module.exports = {
    useCases,
    ...repositories
}
