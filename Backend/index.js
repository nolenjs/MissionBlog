
const fs = require('fs');
const express = require('express');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json';

let app = express();

let auth;

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
// Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), hello);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        auth = oAuth2Client;
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

//Where the GET requests come from
app.get('/list', (req, res) => {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.messages.list({
        'userId': 'me',
        'q': 'from:nolen.shubin@myldsmail.net'
    }, (err, resp) => {
        if (err) return err;
        const msgs = resp.data.messages;
        console.log(msgs);
        const messages = msgs.map((msg) => {
            const respo = msg;
            //console.log('new stuff', internalDate, snippet, parts);
            return {
                date: respo.data.internalDate * 1000,
                attachments: respo.data.payload.parts,
                snippet: respo.data.snippet
            }
        });
        res.send(messages);
    });
});
function hello(authoritah) {
    console.log("something");
}
/**
 * Lists the messages from Elder Shubin in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// const listMessages = () => {
//     const gmail = google.gmail({version: 'v1', auth});
//     gmail.users.messages.list({
//         'userId': 'me',
//         'q': 'from:nolen.shubin@myldsmail.net'
//     }, (err, res) => {
//         if (err) return err;
//         const msgs = res.data.messages;
//         console.log(msgs);
//         msgs.forEach(getMessage);
//         const messages = msgs.map((message) => {
//            return getMessage(message)
//         })
//     });
// }
//
// function getMessage(msg, i, arr){
//     const gmail = google.gmail({version: 'v1', auth});
//     gmail.users.messages.get({
//         'id': msg.id,
//         'userId': 'me'
//     }, (err, res) => {
//         if (err) return err;
//         arr[i] = {
//             date: res.data.internalDate * 1000,
//             attachments: res.data.payload.parts,
//             snippet: res.data.snippet
//         };
//         //console.log(arr[i]);
//     });
// }

app.listen(3300, () => {
    console.log('listening on port 3300')
});