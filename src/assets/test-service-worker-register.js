window.onload = function () {
  if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
  }

  if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
  }

  registerServiceWorker()
    .then(function (registrationResult) {
      askPermission()
        .then(function (permissionResult) {
          console.log(permissionResult, 'permissionResult');
          subscribeUserToPushApi(registrationResult)
            .then(function (subscription) {
              sendSubscriptionToBackEnd(subscription)
                .then(function(saveSubscriptionResult){
                  console.log(saveSubscriptionResult, 'saveSubscriptionResult');
                })
            });
        });
    });
};

function registerServiceWorker() {
  return navigator.serviceWorker.register('assets/service-worker.js')
    .then(function (registration) {
      console.log(registration, 'Service worker successfully registered.');
      return registration;
    })
    .catch(function (err) {
      console.error('Unable to register service worker.', err);
    });
}

function askPermission() {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function (permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
}

function subscribeUserToPushApi(registration) {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BNsacyS1pspaZ63NR8qwDHomBIviuVuSMC78VuehQJTUd0gqIzAyd0VGoYqqEyNcrYpiURxGHNRHBeYX-yQ9uMY'
    )
  };

  return registration.pushManager.subscribe(subscribeOptions);
}

function sendSubscriptionToBackEnd(subscription) {
  return fetch('http://api.crazypush.com/api/subscribe/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      siteId: window.siteId,
      subscription: subscription
    })
  })
    .then(function (response) {
      console.log(response, 'response');
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      console.log(responseData, 'responseData');
      if (!responseData) {
        throw new Error('Bad response from server');
      }
    })
}

function getNotificationPermissionState() {
  if (navigator.permissions) {
    return navigator.permissions.query({name: 'notifications'})
      .then(function (result) {
        return result.state;
      })
  }

  return new Promise(function (resolve) {
    resolve(Notification.permission);
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
