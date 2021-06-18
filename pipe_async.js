function pipeAsync(val, fns) {
    if (fns.length === 1) {
        fns[0](val)
    } else {
        fns[0](val, interimCallback)
    }
    function interimCallback(err, res) {
        return err ? 
            console.log(err) : 
            pipeAsync(res, fns.slice(1))
    }
}

module.exports = pipeAsync