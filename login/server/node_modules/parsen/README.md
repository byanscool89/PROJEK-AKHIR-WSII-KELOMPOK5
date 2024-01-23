# parsen

Node.js + Parse

## How to install

```bash
npm install parsen
```

## How to use

### Require it

```js
var parsen = require('parsen');
```

### Set your keys

```js
parsen.parseApplicationId = <PARSE_APPLICATION_ID>
parsen.parseRESTAPIKey = <PARSE_REST_API_KEY>
```

### Users

Create:

```js
parsen.createUser(<username>, <password>, {userData}, callback(error, response, body){});
```

Login:

```js
parsen.loginUser(<username>, <password>, callback(error, response, body){});
```

Get:

```js
parsen.getUser(<userId>, callback(error, response, body){});
```

Update:

```js
parsen.updateUser(<userId>, <sessionToken>, {userData}, callback(error, response, body){});
```

Delete:

```js
parsen.deleteUser(<userId>, <sessionToken>, callback(error, response, body){});
```

### Objects

Create:

```js
parsen.createObject(<className>, {objectData}, callback(error, response, body){});
```

Get:

```js
parsen.getUser(<className>, <objectId>, callback(error, response, body){});
```

Update:

```js
parsen.updateObject(<className>, <objectId>, {objectData}, callback(error, response, body){});
```

Delete:

```js
parsen.deleteObject(<className>, <objectId>, callback(error, response, body){});
```

### Queries

Users:

```js
parsen.queryUsers({params}, callback(error, response, body){});
```

Objects:

```js
parsen.queryObjects(<className>, {params}, callback(error, response, body){});
```

### Batch

Create batch object:

```js
var batchObject = parsen.createBatchObject(<method>, <className>, {objectData});
```

Batch request:

```js
parsen.batch([batchObjects], callback(error, response, body){});
```

## Contribute

1. Fork
2. Create
3. Code
4. Push
5. Submit
6. Yay!

## License

(The MIT License)

Copyright (c) 2013 Ian Lollar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
