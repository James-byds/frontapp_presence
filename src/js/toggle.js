import { checkinForm } from "./variables";
//script toggle checkin/checkout
const $controller = document.querySelector('#controllers');

$controller.addEventListener('click', (ev) => {
  const clickedElement = ev.target;
  const $checkin = document.querySelector('#checkin');
  const $checkout = document.querySelector('#completion');
  if (clickedElement.id === 'checkin_btn') {
    console.log('checkin form', checkinForm);
    checkinForm.classList.remove('is-hidden');
  } else if (clickedElement.id === 'checkout_btn') {
    checkinForm.classList.add('is-hidden');
  }
  $controller.classList.toggle('is-active');
});