# Inventory Save POS (React.JS)

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Introduce
Inventory Save POS is an is an application that is used for the purpose of recording data and transactions in the form of goods in a structured manner, of course this will help the client when trying to find out reports and developments through the store using a web-based POS application. This application was created using Front End React and from Back End is supported by Express for its own API.

  - Free access API service used for POS application data exchange
  - Created using the JS framework, BackEnd Express with Node.JS and Front End is React.js
  - etc.

# Prerequiste

  - Node.js - Download and Install Node.js - Simple bash script to manage multiple active node.js versions.
  - Clone this repo into local storage and build for the production or development mode.

### Configuration
> - Basic Configuration
> - Structured
> - Input Validation (Development Mode)
> - File Upload (Image + Validation) (Development Mode)
> - Authorization with JWT (Development Mode)
> - Redis Implementation

### Installation

Inventory Save POS requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and start the server.

```sh
$ git clone https://github.com/budiprihhastomo/InventorySave_POS_React.git
$ cd InventorySave_POS_REST_API
$ npm install
$ npm start
```
```sh
or you can build this app with :
$ npm build
```

### Plugins

Inventory Save POS is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin |
|--------|
| @hapi/joi |
| @types/jsonwebtoken |
| bcryptjs |
| body-parser |
| cors |
| express |
| express-fileupload |
| fs |
| morgan |
| mysql |
| path |
| util |
| uuid |

#### API Route URL (Public)
| Plugin | Purpose | 
|--------|---------|
| /dashboard | the content is dashboard of application and showed the history | 
| /transaction | transaction will be processed in here  |

License
----

© Budi Prih Hastomo
