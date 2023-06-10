export const navigation_data = [{
  title: "HENCHED", href: "/", sub_routes: [
    { title: "Our Mission", childRoutes: [{ title: "top", href: "#top" }, { title: "blog", href: "#blog" }, { title: "signup", href: "#signup" }], href: "/" },
    { title: "Catalogue", childRoutes: [{ title: "All Products", href: "/products" }, { title: "womens", href: "/" }], href: "/" },
    { title: "Memberships", childRoutes: [{ title: "signup", href: "/" }, { title: "unsubscribe", href: "/" }], href: "/" },
  ]
}, {
  title: "PRODUCTS", href: "/", sub_routes: [
    { title: "Mens", childRoutes: [{ title: "top", href: "#top" }, { title: "blog", href: "#blog" }, { title: "signup", href: "#signup" }], href: "/" },
    { title: "Womens", childRoutes: [{ title: "mens", href: "/" }, { title: "womens", href: "/" }], href: "/" },
    { title: "Sale", childRoutes: [{ title: "signup", href: "/" }, { title: "unsubscribe", href: "/" }], href: "/" },
  ]
},
{ title: "SUPPORT", href: "/about" }, { title: "All Products", href: "/products" }]
// const sub_navigation_data = [{
//   title: "trending",
//   href: "/",
// }, {
//   title: "new items",
//   href: "/",
// }, {
//   title: "sale",
//   href: "/",
// }, {
//   title: "feautured",
//   href: "/",
// }]
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
// export const subheader_content = {
//   navigation: sub_navigation_data,
// };
export const subheader_content = null;
export const eventheader_content = {
  navigation: event_navigation_data,
}