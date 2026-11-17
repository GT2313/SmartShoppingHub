
import './style.css'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '₹1,499',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
  link: 'https://link.amazon/B0fY3d86Y',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '₹1,999',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
  link: 'https://link.amazon/B09zaUh4m',
  },
  {
    id: 3,
    name: 'Stylish Backpack',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
  link: 'https://link.amazon/B0iv40pCO',
   },
  {
    id: 4,
    name: 'Smartphone',
    price: '₹12,999',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
  link: 'https://link.amazon/B0ikXHt9m',
}
]

let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')

document.querySelector('#app').innerHTML = `
  <header class="navbar">
    <div class="logo">Smart<span>Shopping</span> Hub</div>
    <input type="search" id="search" placeholder="Search products..." />
    <button class="cart" id="wishlistBtn">♡ Wishlist (<span id="wishCount">0</span>)</button>
  </header>

  <section class="hero">
    <div>
      <p class="tag">SMART SHOPPING STARTS HERE</p>
      <h1>Find the Best Deals.<br>Shop Smarter.</h1>
      <p>Discover amazing products and deals from trusted stores.</p>
      <a href="#products" class="shop-btn">Explore Products →</a>
    </div>
  </section>

  <section class="categories">
    <h2>Shop by Category</h2>
    <div class="category-list">
      <button>📱 Electronics</button>
      <button>👗 Fashion</button>
      <button>🏠 Home</button>
      <button>💄 Beauty</button>
      <button>🎧 Accessories</button>
    </div>
  </section>

  <section class="products" id="products">
    <h2 id="productHeading">Popular Products</h2>
    <div class="product-grid" id="productGrid"></div>
  </section>

  <footer>
    <p>© 2026 SmartShopping Hub | Shop Smart, Save More.</p>
  </footer>
`

const grid = document.querySelector('#productGrid')

function renderProducts(showWishlist = false) {
  const search = document.querySelector('#search').value.toLowerCase()

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(search) &&
    (!showWishlist || wishlist.includes(product.id))
  )

  grid.innerHTML = filtered.length
    ? filtered.map(product => `
      <article class="product">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <button class="wish-btn" data-id="${product.id}">
          ${wishlist.includes(product.id) ? '❤️' : '♡'}
        </button>
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="${product.link || '#'}" class="buy-btn" target="_blank" rel="noopener noreferrer">Buy Now</a>
      </article>
    `).join('')
    : '<p>No products found.</p>'

  document.querySelector('#wishCount').textContent = wishlist.length
  document.querySelector('#productHeading').textContent =
    showWishlist ? 'My Wishlist' : 'Popular Products'
}

grid.addEventListener('click', event => {
  const button = event.target.closest('.wish-btn')
  if (!button) return

  const id = Number(button.dataset.id)

  wishlist = wishlist.includes(id)
    ? wishlist.filter(item => item !== id)
    : [...wishlist, id]

  localStorage.setItem('wishlist', JSON.stringify(wishlist))
  renderProducts(document.querySelector('#productHeading').textContent === 'My Wishlist')
})

document.querySelector('#search').addEventListener('input', () => {
  renderProducts(document.querySelector('#productHeading').textContent === 'My Wishlist')
})

document.querySelector('#wishlistBtn').addEventListener('click', () => {
  const heading = document.querySelector('#productHeading').textContent
  renderProducts(heading !== 'My Wishlist')
})
 
renderProducts()
// Amazon Affiliate Disclosure
const affiliateDisclosure = document.createElement("p");

affiliateDisclosure.textContent =
  "As an Amazon Associate I earn from qualifying purchases.";

affiliateDisclosure.style.textAlign = "center";
affiliateDisclosure.style.padding = "15px";
affiliateDisclosure.style.fontSize = "13px";
affiliateDisclosure.style.color = "#666";

document.body.appendChild(affiliateDisclosure);
