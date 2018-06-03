# Datatog for IBM Watson Workspace

This is a sample Magic: the Gathering bot built from the [IBM Watson Workspace Starter Bot](https://github.com/van-ibm/watsonworkspace-starter). It uses the public API at magicthegathering.io to present card information when requested.

## Quick Start

1. Open a command line (terminal) and change directory to the `datatog` directory.
2. Install dependencies by running `npm install`.
3. Create a `.env` file per the dotenv instructions in Local Development documentation.
4. Run `npm run-script dev` from a command line.
5. Copy the URL seen in step 2 `Use 'https://cdf9d82f.ngrok.io/<APP_ID>/webhook' as your webhook URL in Watson Workspace` message for later use.
6. Click the `Create new app` button on the [Developer Apps](https://developer.watsonwork.ibm.com/apps) page.
7. Enter the `App Name` and the `Description of App`.
8. Click `Create`.
9. The next dialog will give you the App ID and App secret. You need to save these values to the respective environment variables in the `.env` file called `APP_ID` and `APP_SECRET`.
10. Click on the `Listen to Events` link.
11. Click on the `Add an outbound webhook button`.
12. Give the webhook a name (any name will do) and select any of the events. The `message-created` and `message-annotation-added` events are particularly useful.
13. In the Webhook URL text box, specify the URL for your app you copied previously. For example, `https://cdf9d82f.ngrok.io/a7cfbdac-cdab-3d6f-ae13-0654b6b8e880/webhook`.
14. Copy the `Webhook secret` from the resulting dialog to the `WEBHOOK_SECRET` property in the `.env` file.
15. Make a change to `index.js` and save. This causes the bot to restart and load the updated `.env` file.
16. Back in you browser, select the `Enable` button to complete the process.
17. Follow the instructions in [Share App](https://developer.watsonwork.ibm.com/apps/dashboard/share) to add the app to a space.

## Use

Once the bot is added to a space, it will listen for messages containing [any text in square brackets]. If that text matches one or more card names, e.g. [Thirst for Knowledge], it will send a message to the space containing the text of one of those cards.
