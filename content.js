// alert("Hello from your Chrome extension!");

let productIds = '';
const findProductsList = document.getElementsByClassName('products-list');
const productCards = {};

if (findProductsList.length === 1) {
  const productsList = Array.from(findProductsList[0].children);
  productsList.forEach((productCard) => {
    const findProductControl = productCard.getElementsByTagName('form');
    if (findProductControl.length === 1) {
      const productControl = findProductControl[0];
      const productId = productControl.getAttribute('data-product-id');
      productIds = productIds + productId + ','

      productCards[productId] = productCard;
    }
  })

  if (productIds) {
    productIds = productIds.slice(0, -1);
    // console.log('productsIds', productIds);
  
    fetch(`https://www.rbmagazin.com/products_by_id/${productIds}.json?lang=&format=json`)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data);
      const keys = Object.keys(productCards);
      keys.forEach((key) => {
        const card = productCards[key];
        const prod = data.products.find((p) => p.id == key);
        const quantity = prod.variants[0].quantity;
        // console.log(key, quantity);
  
        const appendDiv = document.createElement("div");
        const appendText = document.createTextNode(quantity);
        appendDiv.appendChild(appendText);
        card.children[0].appendChild(appendDiv);
      })
    });
  }
}
