var channel = chrome.runtime.connect();
channel.onMessage.addListener(function (message) {
    console.log('channel message', message);
    window.postMessage(message, '*');
});

window.addEventListener('message', function (event) {
    if (event.source != window)
        return;
    if (event.data && (event.data.type == 'getScreen' || event.data.type == 'cancelGetScreen'))
        channel.postMessage(event.data);    
});
isInstalledNode = document.createElement('div');
isInstalledNode.id = 'my-extension-installed-with-id-dfiechekfdkkdmnpnialahccdakgdkpa';
document.body.appendChild(isInstalledNode);
