#Pizza Delivery App
####Node.Js Master Course - Assignment #2

##1. Description
As the assignement requires, this a Pizza Delivery API which allows to:
- Register and destroy (self) user account
- Order one or multiple pizzas with a cart
- Pay using third party Stripe API
- Receive a receipt through mail using Mailgun as a sandbox mail system

##2. Design choices
As this is an assignment which tell nothing about HTTP or HTTPS request but as it require payment, the API will only accept HTTPS connections.

The designed API will store data in a json files system.

All transmissions will require the use of a token and will be encrypted accordingly to avoid issues.

Every day, all the processed orders from the day before will be compressed and archived.

There's no "administrator" rights implemented, just users one. We assume the administrator access data directly from the server.

As per GDPR asks developers to do so, this is "privacy by design", so we'll limit the data stored to the strict necessary one and with full consent (stored as well).

##3. API Reference
