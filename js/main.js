// REPLACE THE xxx WITH UR ACTUAL DATA
var options = {
    host: 'xxx.messaging.internetofthings.ibmcloud.com', // ORG ID
    port: '1883', // LEAVE IT AS IT IS
    clientId: 'xxx' + Math.random().toString(16).substr(2, 8), // c_id x:xxx:
    username: 'xxx', // APP KEY HERE
    password: 'xxx' // APP TOKEN HERE
}

$(document).ready(() => {

    // Establish the connection with the IoT Platform
    var client = mqtt.connect(options);

    // This is how we subscribe to the events coming from our virtual device
    // Note the following parameters:

    // test here is the type of the device
    // 1234 is the device ID
    // sensor_reading is the event name
    // json is the msg type
    // the rest of the format is fixed 
    // the format is iot-2/type/<DEVICE_TYPE>/id/<DEVICE_ID>/evt/<EVENT_NAME>/fmt/<MSG_FORMAT>
    client.subscribe("iot-2/type/test/id/1234/evt/sensor_reading/fmt/json");

    // This is a callback function when we receieve a message from
    // the topic we are subscribing to
    client.on("message", function (topic, payload) {
        var value = JSON.parse(payload);
        // If the incoming value is over or equal 50, we will
        // turn on the water sprinklers
        if (value.randomNumber >= 50) {
            $('#myGarden').attr("src", "img/on.gif");
            $('#status').removeClass('red');
            $('#status').addClass('green');
            $('#status').html('Water Sprinklers: ON');
        }
        // else we will close them
        else {
            $('#myGarden').attr("src", "img/off.gif");
            $('#status').removeClass('green');
            $('#status').addClass('red');
            $('#status').html('Water Sprinklers: OFF');
        }
        // display humidity
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