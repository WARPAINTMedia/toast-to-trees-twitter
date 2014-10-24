toast to trees twitter app
==========================

![sample.gif](https://raw.githubusercontent.com/WARPAINTMedia/toast-to-trees-twitter/master/sample.gif?token=ABW_mOpjYIlWgmLEnGrKQabpS_7fOFutks5UUmGQwA%3D%3D)


#### Setting up config.json

The Twitter application will not run without a `config.json` file that contains your application codes.

* Create a new application on the twitter developer site
* Once create, go to the API Keys page, and click "Create my access token"
* Create a new file in our project folder with nano config.json
* Paste in the following code replacing the values with your tokens and secrets:

```
{
  "consumer_key": "API Key",
  "consumer_secret": "API Secret",
  "access_token": "Your Access Token",
  "access_token_secret": "Your Access Secret"
}
```

You can now run the twitter app with `node server.js`. Then visit [http://localhost:3000](http://localhost:3000) and the app should be churning along.
