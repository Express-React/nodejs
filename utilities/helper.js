module.exports = {

    getSocketId :  function(socketMessage, basket){
        var oJson = {};
        var message = socketMessage.split("|");
        var uuid = message[0];
        oJson["socketId"] = basket[uuid];
        oJson["message"] = message[1];
        return oJson;
    }
}