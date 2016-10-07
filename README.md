# FlyLog
Front end AOP logging and monotoring tool.


## Install

``` text
npm install -g flylog
```


## Usage

### Server
Start server:

``` text
flylog
```

By default FlyLog listens to port 3000. Different port can be specified via args:

``` text
flylog 3000
```

### Client
Add `<script crossorigin id="fly-echo" src="//localhost:3000/flyEcho.js">` to your page, then enter `localhost:3000` for monitoring.
