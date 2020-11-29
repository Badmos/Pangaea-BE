# Pangaea-BE
Recreating a Pub/Sub System Using HTTP requests

## How To Run
There are two ways to run this code. The code has been deployed and hosted as a glitch service. You can use the link hosted on glitch by using this base URL ```https://wooded-shine-sapphire.glitch.me``` (Sleepy instance, goes to sleep after a long period of inactivity. Therefore, first calls after long periods of inactivity may take about 20 seconds) or install locally. Follow the steps below to install locally.
- Ensure to have Node.js installed
- Clone this repository
- Navigate to the root directory
- Run  ```npm install``` to install dependencies
- Run: ```node index.js```
- Go to any HTTP client and use ```http://localhost:8000/``` as the base URL.
- If you do not want to install locally by following the steps above, you can use ```https://wooded-shine-sapphire.glitch.me``` as your base URL and just make requests to the endpoint using any HTTP client.


## Endpoints and associated Payload
- Create a new Subscription: ```http://localhost:8000/subscribe/:topic```.
  - This creates a subscription for all events of topic and returns all events published to that topic/subscribing server
  - Endpoint: ```/subscribe/:topic```
  - HTTP Method to create a subscription ==> POST
  - Sample Payload for creating a subscription and expected data type: {
    "message": "topic1" ==> String
   }
- Publish an Event to a listening subscriber: ```http://localhost:8000/publish/:topic```
  - Endpoint publishes an event to a subscribing topic/server
  - Endpoint: ```/publish/:topic```
  - HTTP Method: POST
  - Sample Payload for publishing an event and expected data type: {
    "url": "http://localhost:8000/event" ==> String
   } 
  
- Event Logger: ```http://localhost:8000/event/```
  - Endpoint proxies the ```/publish/:topic``` endpoint and listens for incoming events. It also logs all the events created to the terminal whenever an event is published
  - It is for internal use and is triggered internally by the publisher.
  - Endpoint: ```/event```
  - HTTP Method: POST
- Index/Base: ```http://localhost:8000```
  - This endpoint returns all the events that have been created
  - Endpoint: ```/```
  - HTTP Method: GET
  
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
