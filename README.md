# urlshortener

# development

```js 
    gulp //for servers task
    webpack // for clients build
```

# Demo 

https://kurz.herokuapp.com/

urlshortener is the MEAN app. 

All client logic in public folder. For build client app was used webpack. 
Client app is fully modular. Main module "main" contains tools and logic (from url.service) for manipulate long and short urls.
For help by generate short url exists helper service.
App let you copy short url after generating to clipboard.


Server app builded as service with api.
For generating short api, needs reqest with post http method to https://kurz.herokuapp.com/api/v1/shorturl
Params needs be like { longUrl - long url to reformat, hash - desired short urls hash }

Posible responses:
errMsg - ["Long url is not presented", "Long url is not valid", "Hash for short url is not alphanumeric", "Long url is not available", "Hash is already attached to this url", "Hash is already taken"]
msg - [ "Hash attached to url successfully" ]

Model for storing data presented safe part for client.

Records older 15 days removed automatically.