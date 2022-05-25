# Fashion Cloud

## API's Description
The APIs are as follows:

Its a **GET** API, that returns the items based on key value.

```
/api/cache/getItemByKey/:key 
``` 
Its a **GET** API that reurns all the the chache Items

```
/api/cache/getAllItems
```

Its a **POST** API that creates and upodates the value based on key, the value of the cache and the ttl should be passed as body parameter in the query.
```
/api/cache/addAndUpdateItem/:key
```
The body of the API:
```
{
    "value": "a",
    "ttl": 1800
}
```

Its a **DELETE** API which delete the cache item based on key.
```
/api/cache/removeItem/:key
```

Its a **DELETE** API which deletes all the cache values.

```
/api/cache/clearItems/:key
```







## Run APP on local machine
Clone the repository.
```
git clone <CLONE_URL>
```

Run the command to install all the dependencies
```
npm install
```

Run the app using the command, the app will be run as a nodemon.

```
npm start
```

After the last command the app will be running on the port 8080 as a localhost and the APIS can be tested using **Postman**.

**API**
http://localhost:8080/api/cache/getItemByKey/:key 
http://localhost:8080/api/cache/getAllItems
http://localhost:8080/api/cache/addAndUpdateItem/:key
http://localhost:8080/api/cache/removeItem/:key
http://localhost:8080/api/cache/clearItems/:key


>Utkarsh Goyal


