
```node

yarn init -y
yarn add tsoa express 
yarn add -D typescript @types/node @types/express
yarn run tsc --init

yarn add inversify-binding-decorators inversify reflect-metadata 
yarn add bcrypt jsonwebtoken crypto-js
yarn add -D @types/bcrypt @types/jsonwebtoken 
yarn add mongodb mongoose

yarn add  cookie-parser
yarn add -D @types/cookie-parser
yarn add swagger-ui-express
yarn add -D @types/swagger-ui-express

yarn add nodemon
yarn add -D concurrently
```

create tsoa.json


## update tsconfig.json ##

1. set `"resolveJsonModule": true` to allow importing JSON files
2. set `"experimentalDecorators": true` and `"emitDecoratorMetadata": true` to allow annotations.
3. "incremental": true
4. "types": ["reflect-metadata"],
5. "sourceMap": true
6. "target": "es6"
7. 

## update package.json ##

change `"main": "build/server.js"`
add scripts 
```json
 "scripts": {
    "dev": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
    "dev:docker": "concurrently \"nodemon\" \"nodemon -x tsoa spec-and-routes\"",
    "build": "tsoa spec-and-routes && tsc"
  }
```

run yarn build to build the routes required by Swagger docs.

add "proxy": "http://tutlid-api:8000", in package.json to allow relative path for API //TODO elaborate

