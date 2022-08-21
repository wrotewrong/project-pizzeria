import { settings, select, classNames, templates } from './settings.js';
import Product from './components/product.js';
import Cart from './components/Cart.js';

// sticky header
const header = document.querySelector('.header');
const content = document.querySelector(select.containerOf.menu);
const headerPaddingTop = parseInt(
  window.getComputedStyle(header, null).getPropertyValue('padding-top')
);

window.addEventListener('scroll', function () {
  if (window.pageYOffset > headerPaddingTop) {
    header.classList.add('sticky');
    content.classList.add('extended');
  } else {
    header.classList.remove('sticky');
    content.classList.remove('extended');
  }
});
// sticky header

const app = {
  initMenu: function () {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      new Product(
        thisApp.data.products[productData].id,
        thisApp.data.products[productData]
      );
    }
  },

  initData: function () {
    const thisApp = this;
    thisApp.data = {};
    const url = `${settings.db.url}/${settings.db.products}`;

    fetch(url)
      .then(function (responseRaw) {
        return responseRaw.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);

        /* save parsedResponse as thisApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenue method */
        thisApp.initMenu();
      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product.prepareCartProduct());
    });
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);

    thisApp.initData();
    // thisApp.initMenu();
    thisApp.initCart();
  },
};

app.init();
