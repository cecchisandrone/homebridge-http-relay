var gpio = require('pi-gpio');
var request = require('request');
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory('homebridge-http-relay', 'HttpRelay', HttpRelayAccessory);
}

function HttpRelayAccessory(log, config) {
    this.log = log;
    this.name = config['name'];
    this.duration = config['duration'];
    this.service = new Service.Switch(this.name);
    this.value = false;

    if (!this.duration) 
        throw new Error('You must provide a config value for duration.');

    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));

}

HttpRelayAccessory.prototype.getServices = function() {
    return [this.service];
}

HttpRelayAccessory.prototype.getOn = function(callback) {
    this.log("Getting relay status");
    callback(null, this.value);
}

HttpRelayAccessory.prototype.setOn = function(on, callback) {
    this.log("Toggling relay");
    this.value = true;
    var that = this;
    request.post('http://localhost:5000/toggle-relay?duration=' + this.duration, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        that.value = false;
        callback(null, that.value);
    });
}

var is_int = function(n) {
   return n % 1 === 0;
}

var is_defined = function(v) {
	return typeof v !== 'undefined';
}
