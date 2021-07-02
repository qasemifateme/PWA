importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

var config = {
    apiKey: "<Web API Key>",
    authDomain: "<Project ID>.firebaseapp.com",
    databaseURL: "https://<Project ID>.firebaseio.com",
    projectId: "<Project ID>",
    storageBucket: "<Project ID>.appspot.com",
    messagingSenderId: "<Messenging Sender ID>"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/messaging'

export default {
  methods: {
    saveNotificationToken(token) {
      const registerNotifTokenURL = '/register-notif-token/'
      const payload = {
        registration_id: token,
        type: 'web'
      }
      axios.post(registerNotifTokenURL, payload)
        .then((response) => {
          console.log('Successfully saved notification token!')
          console.log(response.data)
        })
        .catch((error) => {
          console.log('Error: could not save notification token')
          if (error.response) {
            console.log(error.response.status)
            // Most of the time a "this field must be unique" error will be returned,
            // meaning that the token already exists in db, which is good.
            if (error.response.data.registration_id) {
              for (let err of error.response.data.registration_id) {
                console.log(err)
              }
            } else {
              console.log('No reason returned by backend')
            }
            // If the request could not be sent because of a network error for example
          } else if (error.request) {
            console.log('A network error occurred.')
            // For any other kind of error
          } else {
            console.log(error.message)
          }
        })
      },
    },
  mounted() {
    var config = {
      apiKey: "<Web API Key>",
      authDomain: "<Project ID>.firebaseapp.com",
      databaseURL: "https://<Project ID>.firebaseio.com",
      projectId: "<Project ID>",
      storageBucket: "<Project ID>.appspot.com",
      messagingSenderId: "<Messenging Sender ID>"
    }
    firebase.initializeApp(config)

    const messaging = firebase.messaging()

    messaging.usePublicVapidKey("<Public Vapid Key>")

    messaging.requestPermission().then(() => {
      console.log('Notification permission granted.')
      messaging.getToken().then((token) => {
        console.log('New token created: ', token)
        this.saveNotificationToken(token)
      })
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err)
    })

    messaging.onTokenRefresh(function () {
      messaging.getToken().then(function (newToken) {
        console.log('Token refreshed: ', newToken)
        this.saveNotificationToken(newToken)
      }).catch(function (err) {
        console.log('Unable to retrieve refreshed token ', err)
      })
    })
  }
}
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

function askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  }

//Web Push Notifications//
let click_open_url
self.addEventListener('push', function(event) {
  let push_message = event.data.json()
  // push notification can send event.data.json() as well
  click_open_url = push_message.notification.data.url
  const options = {
    body: push_message.notification.body,
    icon: push_message.notification.icon,
    image: push_message.notification.image,
    tag: 'request',
    actions: [
      { "action": "yes", "title": "Yes" },
      { "action": "no", "title": "No" }
    ]
  };
  event.waitUntil(self.registration.showNotification(push_message.notification.title, options));
});
self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();
  if ( click_open_url ){
    const promiseChain = clients.openWindow(click_open_url);
    event.waitUntil(promiseChain);
  }
});

// if('serviceWorker' in navigator && 'pushManager' in window) {
//    Notification.requestPermission()
//     .then(result => console.log(result));
// }
