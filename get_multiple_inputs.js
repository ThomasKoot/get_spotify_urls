const pipeAsync = require('./pipe_async')

function getMultipleInputs(prompts, callback) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });

    const getInput = (key, question) => (prev, callback) => {
        readline.question(question ? question : key + " ", val => {
            callback(null, {...prev, [key]: val})
        });
    }

    function onEnd(val) {
        readline.close();
        callback(null, val)
    }

    const inputFunctions = prompts.map(q => {
        if (typeof q === "string") {
            return getInput(q)
        } 
        return getInput(q.key, q.question)        
    })

    pipeAsync({},[...inputFunctions, onEnd])
}

module.exports = getMultipleInputs
