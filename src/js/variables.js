//get url localhost
const url = window.location.hostname;
const checkinForm = document.querySelector('#checkin');
const checkoutForm = document.querySelector('#checkout');
const mailForm = document.querySelector('#completion');
const baseApiUrl = url==='localhost'?
'http://localhost/presence/cms/api/content/':'https://ingrwf12.cepegra-frontend.xyz/cockpit_james/api/content/';
//sets api url if localhost
console.log('baseApiUrl', baseApiUrl);

export { checkinForm, checkoutForm, mailForm, baseApiUrl };