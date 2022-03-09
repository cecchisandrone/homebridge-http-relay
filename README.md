# homebridge-http-relay
# random comment

Triggers a relay exposed via http

## Requirements
-	[Homebridge](https://github.com/nfarina/homebridge) - _HomeKit support for the impatient_

## Installation
1.	Install Homebridge using `npm install -g homebridge`
2.	Install this plugin `npm install -g homebridge-http-relay`
3.	Update your configuration file - see `sample-config.json` in this repo

## Configuration
Example `config.json`

```json
{
  "accessories": [
    {
      "accessory": "HttpRelay",
      "name": "Gate",
      "duration": 1.5
    }
  ]
}
```
