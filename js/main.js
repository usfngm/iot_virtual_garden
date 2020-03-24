// REPLACE THE xxx WITH UR ACTUAL DATA
var options = {
    // ADD UR ORG ID instead of the xxx
    host: 'xxx.messaging.internetofthings.ibmcloud.com',
    port: '1883', // LEAVE IT AS IT IS
    clientId: 'xxx' + Math.random().toString(16).substr(2, 8),
    username: 'xxx', // APP KEY HERE
    password: 'xxx' // APP TOKEN HERE
}

$(document).ready(() => {

    var client = mqtt.connect(options);

    client.subscribe("iot-2/type/test/id/1234/evt/evt/fmt/json");

    client.on("message", function (topic, payload) {
        var value = JSON.parse(payload);
        if (value.randomNumber >= 50) {
            $('#myGarden').attr("src", "img/on.gif");
            $('#status').removeClass('red');
            $('#status').addClass('green');
            $('#status').html('Water Sprinklers: ON');
        }
        else {
            $('#myGarden').attr("src", "img/off.gif");
            $('#status').removeClass('green');
            $('#status').addClass('red');
            $('#status').html('Water Sprinklers: OFF');
        }
        $('#humidity').html('Current Humidty is: ' + value.randomNumber);
    })

    client.on("connect", function (test) {
        console.log("CONNECTED");
    })

    client.on("error", (error) => {
        console.log("ERROR");
        console.log(error);
    })
})