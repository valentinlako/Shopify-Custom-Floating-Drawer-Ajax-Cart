# Shopify Custom Floating Drawer Ajax Cart

![image](https://user-images.githubusercontent.com/1571083/201380528-8ff9165f-e3d1-45a4-807e-8bd05a73cc06.png)

---

## Setup

// Add cart-drawer.liquid file within your theme's "Sections" folder

// Add ajaxify-cart.liquid file within your theme's "Snippets" folder

// Add v-drawer.css file within your theme's "Assets" folder

// Add v-drawer.js file within your theme's "Assets" folder

After all files have been uploaded, in your theme.liquid main file, right under the ```<body>``` element, add the following line of code:

```
{% section 'cart-drawer' %} 
```
  
Now, find the element which when clicked will open the drawer cart (the cart icon from the header, as an example). Find his unique class, then go v-drawer.js line 3 and add it there
  
Enjoy!
