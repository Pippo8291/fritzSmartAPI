# fritzSmartAPI [WIP]
[![NPM Version](https://img.shields.io/npm/v/fritzsmartapi.svg)](https://www.npmjs.com/package/fritzsmartapi)
[![NPM Downloads](https://img.shields.io/npm/dt/fritzsmartapi.svg)](https://www.npmjs.com/package/fritzsmartapi)
[![GitHub](https://img.shields.io/github/license/SheepCreativeSoftware/fritzSmartAPI)](https://github.com/SheepCreativeSoftware/fritzSmartAPI)
[![node-lts](https://img.shields.io/node/v-lts/fritzsmartapi)](https://www.npmjs.com/package/fritzsmartapi)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=RG6PSXR828X94)

node.js module for Fritzbox Smart Home API (AHA-HTTP-Interface)  

This module is still work in progress!  
Major changes can and will happend before v1.0.0

## Instalation
```bash
npm install fritzsmartapi
```

## Basic Usage

Example to get the session ID using default Fritz!Box hostname (fritz.box):  
Supports PBKDF2 (Default; Requires Fritz!OS 7.24) or MD5 (Requires Fritz!OS 5.50) Challenge-Response Process for login  
If the Fritz!OS version does not support PBKDF2 then the function automaticly falls back to MD5.

```js
import * as fritzAPI from 'fritzsmartapi';

const credentials = {
  password: 'mypassword',
  user: 'username',
};

const connection = {
  host: 'fritz.box',
  mode: 'PBKDF2', // [Optional] Challenge-Response Process
  useSSL: false,  // [Optional] Use SSL/TLS Connection (default=false)
};

fritzAPI.doInitSession(credentials, connection).
  then((sessionId) => {
    console.log('Session ID: ' + sessionId); // e.g. Session ID: 9c977765016899f8
  }).
  catch((error) => {
    console.log('Login failed', error);
  });
```
Example to get the a list of all devices with the same connection details:
```js
fritzAPI.getDeviceListInfos(sessionId, connection).
  then((response) => {
    console.log(response); // Device List
    const {device} = response.devicelist;
    const actorId = device[0].identifier; // e.g. Actor identifier of the first device in list
  });
```
Example to switch a socket on a socket switch on or off:
```js
const switchOn = true;

fritzAPI.setSwitchOnOff(sessionId, actorId, switchOn, connection).
  then((switchState) => {
    console.log('Switch is set to: ' + switchState); // e.g. Switch is set to: true
  });
```

## Functions
Not yet documented

## Fritzbox Interface Documentation
- [AVM Interfaces](https://avm.de/service/schnittstellen/)
### FRITZ!Box login process
- [[EN] FRITZ!Box login process PDF](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Recommendations%20for%20user%20guidance%20for%20logging%20into%20a%20FRITZBox_v1.1_EN.pdf) 
- [[DE] Anmeldeverfahren an einer FRITZ!Box PDF](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf)
### AHA HTTP Interface Documentation
- [[EN] Technical Note - Session ID PDF](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/AVM_Technical_Note_-_Session_ID_deutsch_2021-05-03.pdf)
- [[DE] Technical Note - Session ID PDF](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/AVM_Technical_Note_-_Session_ID_deutsch_2021-05-03.pdf)
- [[DE] AHA-HTTP-Interface PDF](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/AHA-HTTP-Interface.pdf)
