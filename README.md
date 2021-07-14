# DCO
This is a marketing solution that allows the user to easily create ad campaigns. Upload images, create banner styles, and construct entire multi-dimensional banner ads with this easy to use graphical interface.

## Prerequisites
* [Nodejs](https://nodejs.org/en/download/)
* [NPM](https://www.npmjs.com/get-npm)
* [MongoDB](https://www.google.com/url?q=https://downloads.mongodb.com/win32/mongodb-win32-x86_64-enterprise-windows-64-3.4.16-signed.msi?_ga%3D2.111360580.1193175589.1536762381-1361458203.1536762381&sa=D&source=hangouts&ust=1536849182660000&usg=AFQjCNHP11Mw85730CNXJh3P40a_joYmtQ) 
* [Postman](https://www.getpostman.com/apps)
* [Azure Storage Explorer](https://azure.microsoft.com/en-us/features/storage-explorer/)

## Environment Setup

- Server
```cd server```
```npm install```
 
- Client
```cd client```
```npm install```

- Open **Postman** and import *'DCO-demo.postman_collection.json'* and run the tests to initialize the **MongoDB** collections


## Production
Start MongoDB Service
```mongod```

- Client
``` yarn build ```

* This copies the production build to ../server/build

- Server
``` yarn prod ```

* Runs client production bundle from server

## Development 
Start MongoDB Service
```mongod```

Server
```cd server```
```yarn dev```
*if you receive an error, try running ```npm install -g yarn```*

Client
```cd client```
```yarn start```

The web service will automatically open your default browser with the web page.

## File Storage
In **Azure**, Navigate to Storage Accounts > ``your_dco_storage_account``. Open in **Azure Storage Explorer**, navigate to DCO > Blob Containers > dco-cdn.


## Misc
When uploading CSV's for importing purposes, they must be comma-delimited. All special character will be parsed fine as long as they have not been altered during conversation to CSV. Excel sometimes will squash special characters so be aware and use a different tool.
