import { checkinForm, checkoutForm, mailForm } from "./variables";
//script toggle checkin/checkout
const $controller = document.querySelector('#controllers');

$controller.addEventListener('click', (ev) => {
  const clickedElement = ev.target;
  const $checkin = document.querySelector('#checkin');
  const $checkout = document.querySelector('#completion');
  if (clickedElement.id === 'checkin_btn') {
    console.log('checkin form', checkinForm);
    //checkcin components
    checkinForm.classList.remove('is-hidden');
    mailForm.classList.remove('is-hidden');
    //checkout components
    checkoutForm.classList.add('is-hidden');
  } else if (clickedElement.id === 'checkout_btn') {
    checkinForm.classList.add('is-hidden');
    mailForm.classList.add('is-hidden');
    checkoutForm.classList.remove('is-hidden');
  }
  $controller.classList.toggle('is-active');
});