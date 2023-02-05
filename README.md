# fritzSmartAPI [WIP]
node.js module for Fritzbox Smart Home API (AHA-HTTP-Interface) 

## Instalation
```bash
npm install fritzsmartapi
```

## Basic Usage

Example to get the session ID using default Fritz!Box hostname (fritz.box):
```js
import * as fritzAPI from 'fritzsmartapi';

fritzAPI.doInitSession({
		host: 'fritz.box',
		mode: 'PBKDF2',
		password: 'mypassword,
		useSSL: false,
		user: 'username',
}).
	then((response) => {
		const sessionId = response.SessionInfo.SID;
		console.log(sessionID)
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
