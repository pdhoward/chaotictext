# ChaoticBots - AI/ML and theText Message

Experimental app for isolating and analyzing text messages in motion

## Overview

## Run the app

1. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/pdhoward/chaotictext
  ```

2. `cd` into this newly created directory.

5. Install the required npm packages using the following command:

  ```
  npm install
  ```

3. Build your app with the following command:

  ```
  npm run build
  ```

4. Edit the `manifest.yml` file for cloud deployment

5. Deploy and run after creating a mysql instance and binding-- as well as setting up Twilio instance with webhooks


## Configure Twilio

1. Navigate to the [Programmable SMS services page](https://www.twilio.com/console/sms/services) and click on "Create new Messaging Service"
2. From the configure pane, enter the url address for application
4. Navigate to the numbers pane and Buy a Number
5. Add the IBM Watson Message Insights and the IBM Watson Message Sentiment Add-ons
