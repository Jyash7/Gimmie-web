import AllProducts from "components/views/all_products";
import BannerSecond from "components/views/banner_second";
import Banner from "components/views/bannner";
import CardComponent from "components/views/card_component";
import Footer from "components/views/footer";
import Header from "components/views/header";


const PrivateRoutes = [

  { path: "/header", name: "dashboard", component: Header },
  { path: "/banner", name: "dashboard", component: Banner },
  { path: "/trending-banner", name: "dashboard", component: BannerSecond },
  { path: "/trendind-products", name: "dashboard", component: CardComponent },
  { path: "/all-products", name: "dashboard", component: AllProducts },
  { path: "/footer", name: "dashboard", component: Footer },


];
export default PrivateRoutes;
