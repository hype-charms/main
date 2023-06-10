export const navigation_data = [{
  title: "HYPE", href: "/", sub_routes: [
    { title: "Blog", href: "/" },
    { title: "Signup", href: "/" },
  ]
}, {
  title: "PRODUCTS", href: "/", sub_routes: [
    { title: "Charms", href: "/" },
    { title: "Charm-Packs", href: "/" },
    { title: "Sale", href: "/" },
  ]
}, {
  title: "SUPPORT", href: "/about"
}, {
  title: "All Products", href: "/products"
}
]
const event_navigation_data = [{
  title: "Signup now to enjoy benefits",
  href: "/",
}, {
  title: "You won't want to miss out on these deals",
  href: "/",
}, {
  title: "Buy one get one free on select items",
  href: "/",
}]
export const header_content = {
  brandName: "TEST",
  logo: "fa-kit fa-logo",
  navigation: navigation_data
};
export const subheader_content = null;
export const eventheader_content = {
  navigation: event_navigation_data,
}