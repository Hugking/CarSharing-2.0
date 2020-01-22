module.exports = function(event, callback) {
    let name = event.data.name
    callback(null, 'hello ' + name)
}