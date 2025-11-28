###  Moon Store – Modern E-Commerce Web App
Moon Store is a modern and fully responsive e-commerce web application where users can browse, filter, and purchase products easily. It provides a smooth shopping experience with clean UI, fast performance, and secure authentication.

### live demo 
🔗 https://moon-store-eight.vercel.app/
### Features
- **Browse & Search** products  
- **Filter** by categories, brands, and price  
- View **detailed product information**  
- **Add / Remove / Update** products in the cart  
- **Add / Remove** products from wishlist  
- Pay using **Cash** or **Credit Card**  
- View all **previous orders**  
- **Authentication:**  
  - Create account  
  - Login / Logout  
  - Reset password  
  - Auto logout when token expires  
- Fully **responsive design**  
- **SEO-friendly** meta tags  
- Optimized performance & code splitting  

### Tech Stack
- **Frontend:** React, React Router, Vite  
- **State Management:** Redux Toolkit, React Context  
- **Forms:** Formik, Yup  
- **Styling:** Tailwind CSS  
- **API Layer:** Axios (centralized in `services/api.js`)  
- **Other Libraries:**  
  - react-hot-toast  
  - react-multi-carousel  
  - react-loader-spinner  
  - react-responsive-pagination  
  - react-icons  
  - jwt-decode  

### Project Structure
```bash
src/
│   App.jsx
│   main.jsx
│   index.css
│
├── assets/
│   ├── hero-offers.png
│   ├── hero-products.png
│   ├── hero-styles.png
│   ├── Icon.svg
│   ├── light-Icon.png
│   ├── logo.svg
│   ├── signInimg.png
│   └── signUpImg.png
│
├── components/
│   ├── layouts/
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── MoreMenu.jsx
│   │   └── Navbar.jsx
│   │
│   ├── notification/
│   │   └── promise.js
│   │
│   └── ui/
│       ├── BreButton.jsx
│       ├── ButtonTop.jsx
│       ├── EmptyBox.jsx
│       ├── ErrorMsg.jsx
│       ├── HomeIcon.jsx
│       ├── Loading.jsx
│       └── Spinner.jsx
│
├── features/
│   ├── auth/
│   │   ├── authSlice.js
│   │   ├── components/
│   │   │   ├── InputForm.jsx
│   │   │   ├── ResetCodeForm.jsx
│   │   │   ├── ResetPasswordForm.jsx
│   │   │   ├── SignInForm.jsx
│   │   │   ├── SignUpForm.jsx
│   │   │   └── VerifedEmailForm.jsx
│   │   ├── hooks/
│   │   │   ├── useChangePass.js
│   │   │   ├── useResetCode.js
│   │   │   └── useVerifyEmail.js
│   │   └── services/
│   │       └── apis.js
│   │
│   ├── brands/
│   │   ├── components/
│   │   │   ├── Brand.jsx
│   │   │   └── BrandsBox.jsx
│   │   ├── hooks/
│   │   │   └── useBrands.js
│   │   └── services/
│   │       └── apis.js
│   │
│   ├── cart/
│   │   ├── components/
│   │   │   ├── CartBox.jsx
│   │   │   └── CartItem.jsx
│   │   ├── hooks/
│   │   │   ├── useClearCart.js
│   │   │   └── useGetCart.js
│   │   └── services/
│   │       └── apis.js
│   │
│   ├── categories/
│   │   ├── components/
│   │   │   └── Category.jsx
│   │   ├── hooks/
│   │   │   └── useCategories.js
│   │   └── services/
│   │       └── apis.js
│   │
│   ├── home/
│   │   └── components/
│   │       ├── Categories.jsx
│   │       ├── Hero.jsx
│   │       ├── Navgaions.jsx
│   │       └── Section.jsx
│   │
│   ├── orders/
│   │   ├── ordersSlice.js
│   │   ├── components/
│   │   │   ├── OrderDetails.jsx
│   │   │   └── Orders.jsx
│   │   ├── hooks/
│   │   │   └── useOrders.js
│   │   └── services/
│   │       └── apis.js
│   │
│   ├── payment/
│   │   ├── component/
│   │   │   └── PaymentForm.jsx
│   │   ├── hooks/
│   │   │   ├── useCashPayment.js
│   │   │   └── useOnlinePayment.js
│   │   └── services/
│   │       └── apis.js
│   │
│   └── products/
│       ├── components/
│       │   ├── AllProducts.jsx
│       │   ├── Filtertion.jsx
│       │   ├── ProductDetails.jsx
│       │   └── ShortProduct.jsx
│       ├── hooks/
│       │   ├── useAddToCart.js
│       │   ├── useProduct.jsx
│       │   ├── useProducts.js
│       │   ├── useRemoveFromCart.js
│       │   └── useResetCound.js
│       └── services/
│           └── apis.js
│
├── wishlist/
│   ├── components/
│   │   ├── Wishlist.jsx
│   │   └── WishlistItem.jsx
│   ├── hooks/
│   │   ├── useAddToWishlist.js
│   │   ├── useGetWishlist.js
│   │   └── useRemoveFromWishlist.js
│   └── services/
│       └── apis.js
│
├── pages/
│   ├── Brands.jsx
│   ├── Cart.jsx
│   ├── Categories.jsx
│   ├── Error.jsx
│   ├── Home.jsx
│   ├── Payment.jsx
│   ├── Products.jsx
│   ├── ResetCode.jsx
│   ├── ResetPassword.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   ├── VerifyEmail.jsx
│   └── Wishlist.jsx
│
└── utilities/
    └── helpers.js
```
### Run Locally
```bash
git clone https://github.com/Ma7moud-Emad/moon-store.git
cd moon-store
npm install
npm run dev