



import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Product from "../Pages/Admin/Product/Product";
import GenericPage from "../Pages/GenericPage/GenericPage";
import Home from "../Pages/Home/Home";
import Leather from "../Pages/Men/Clothing/Leather";
import Sweatshirt from "../Pages/Men/Clothing/Sweatshirt";
import Tshirt from "../Pages/Men/Clothing/Tshirt";
import KidSales from "../Pages/Sales/Kid-Sales/KidSales";
import MenSales from "../Pages/Sales/Men-Sales/MenSales";
import ViewAll from "../Pages/Sales/View-All/ViewAll";
import WomenSales from "../Pages/Sales/Women-Sales/WomenSales";
import CoatsJackets from "../Pages/Men/Clothing/CoatsJackets";
import Knitwear from "../Pages/Men/Clothing/Knitwear";
import Denim from "../Pages/Men/Clothing/Denim";
import Shorts from "../Pages/Men/Clothing/Shorts";
import Swimwear from "../Pages/Men/Clothing/Swimwear";
import Underwear from "../Pages/Men/Clothing/Underwear";
import Sneaker from "../Pages/Men/Shoes/Sneaker";
import OutofOffice from "../Pages/Men/Shoes/OutofOffice";
import BeRightBack from "../Pages/Men/Shoes/BeRightBack";
import Vulcanized from "../Pages/Men/Shoes/Vulcanized";
import Boots from "../Pages/Men/Shoes/Boots";
import FormalShoes from "../Pages/Men/Shoes/FormalShoes";
import Slides from "../Pages/Men/Shoes/Slides";
import BackPacks from "../Pages/Men/Bags/BackPacks";
import Crossbodybags from "../Pages/Men/Bags/Crossbodybags";
import Totebags from "../Pages/Men/Bags/Totebags";
import WaistBags from "../Pages/Men/Bags/WaistBags";
import HatsandScarves from "../Pages/Men/Accessories/HatsandScarves";
import WalletandCardholders from "../Pages/Men/Accessories/WalletandCardholders";
import OthersAccessories from "../Pages/Men/Accessories/OthersAccessories";
import Bracelets from "../Pages/Men/Jewelry/Bracelets";
import Necklaces from "../Pages/Men/Jewelry/Necklaces";
import Rings from "../Pages/Men/Jewelry/Rings";
import Earrings from "../Pages/Men/Jewelry/Earrings";
import TopsBras from "../Pages/Women/Activewear.jsx/TopsBras";
import Leggings from "../Pages/Women/Activewear.jsx/Leggings";
import TShirtsTops from "../Pages/Women/Clothing/TShirtsTops";
import Knitwear1 from "../Pages/Women/Clothing/Knitwear1";
import Sweatshirts from "../Pages/Women/Clothing/Sweatshirts";
import Dresses from "../Pages/Women/Clothing/Dresses";
import CotsJackets1 from "../Pages/Women/Clothing/CotsJackets1";
import Leatherw from "../Pages/Women/Clothing/Leatherw";
import Denimw from "../Pages/Women/Clothing/Denimw";
import Pants from "../Pages/Women/Clothing/Pants";
import Skirts from "../Pages/Women/Clothing/Skirts";
import Shirts from "../Pages/Women/Clothing/Shirts";
import Swimwear2 from "../Pages/Women/Clothing/Swimwear2";
import Underwearw from "../Pages/Women/Clothing/Underwearw";
import Sneakersw from "../Pages/Women/Shoes/Sneakersw";
import OutofOfficew from "../Pages/Women/Shoes/OutofOfficew";
import BeRightBackw from "../Pages/Women/Shoes/BeRightBackw";
import Vulcanizedw from "../Pages/Women/Shoes/Vulcanizedw";
import BootsAnkleBootsw from "../Pages/Women/Shoes/BootsAnkleBootsw";
import MulesandPumps from "../Pages/Women/Shoes/MulesandPumps";
import Sandalss from "../Pages/Women/Shoes/Sandalss";
import Loafersw from "../Pages/Women/Shoes/Loafersw";
import Slidesandw from "../Pages/Women/Shoes/Slidesandw";
import ShoulderBags from "../Pages/Women/Bags/ShoulderBags";
import TophandleBags from "../Pages/Women/Bags/TophandleBags";
import ToteBagsw from "../Pages/Women/Bags/ToteBagsw";
import ClutchesPouches from "../Pages/Women/Bags/ClutchesPouches";
import WalletandCardholders1 from "../Pages/Women/Accessories/WalletandCardholders1";
import SoftAccessories from "../Pages/Women/Accessories/SoftAccessories";
import Beltsw from "../Pages/Women/Accessories/Beltsw";
import Braceletsw from "../Pages/Women/Jewelry/Braceletsw";
import Necklacesw from "../Pages/Women/Jewelry/Necklacesw";
import Ringsw from "../Pages/Women/Jewelry/Ringsw";
import Earringsw from "../Pages/Women/Jewelry/Earringsw";
import BoyClothing from "../Pages/Kids/Boys/BoyClothing";
import BoyShoes from "../Pages/Kids/Boys/BoyShoes";
import BoyAccessories from "../Pages/Kids/Boys/BoyAccessories";
import GirlClothing from "../Pages/Kids/Girls/GirlClothing";
import GirlShoes from "../Pages/Kids/Girls/GirlShoes";
import GirlAccessories from "../Pages/Kids/Girls/GirlAccessories";
import Baby from "../Pages/Kids/Bady/Baby";
import Sunglasse from "../Pages/Eyewear/Sunglasses/Sunglasse";
import Eyeglass from "../Pages/Eyewear/Eyeglass/Eyeglass";
import MensIcon from "../Pages/Icons/Men,s-Icon/MensIcon";
import WomenIcon from "../Pages/Icons/Women's-icon/WomenIcon";
import Fall from "../Pages/Special-Collection/Fall/Fall";
import Winter from "../Pages/Special-Collection/Winter/Winter";
import Frsco from "../Pages/Special-Collection/Fresco/Frsco";
import AuthRoot from "../Layout/AuthRoot";
import Register from "../Authantation/Register";
import SignIn from "../Authantation/SignIn"
import ViewAllM from "../Pages/Men/View-All/ViewAllM";
import ViewAllW from "../Pages/Women/View-All/ViewAllW";
import ViewAllK from "../Pages/Kids/View-All/ViewAllK";
import ViewAllE from "../Pages/Eyewear/ViewAll/ViewAllE";
import ViewAllMC from "../Pages/Men/Clothing/ViewAllMC";
import ViewAllMS from "../Pages/Men/Shoes/ViewAllMS";
import ViewAllMB from "../Pages/Men/Bags/ViewAllMB";
import ViewAllMA from "../Pages/Men/Accessories/ViewAllMA";
import ViewAllMJ from "../Pages/Men/Jewelry/ViewAllMJ";
import ViewAllWA from "../Pages/Women/Activewear.jsx/ViewAllWA";
import ViewAllWC from "../Pages/Women/Clothing/ViewAllWC";
import ViewAllWs from "../Pages/Women/Shoes/ViewAllWs";
import ViewAllWB from "../Pages/Women/Bags/ViewAllWB";
import ViewAllWAs from "../Pages/Women/Accessories/ViewAllWAs";
import ViewAllJJ from "../Pages/Women/Jewelry/ViewAllJJ";
import ViewBoys from "../Pages/Kids/Boys/ViewBoys";
import ViewGG from "../Pages/Kids/Girls/ViewGG";
import Cart from "../Pages/Cart/Cart";
import WishList from "../Pages/WishList/WishList";
import ProductDetails from "../Pages/Men/Products-Details/ProductDetails";
import Banner from "../Pages/Admin/Banner/Banner";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", index: true, Component: Home },
      
      
      // Sales
      { path: "/sales", Component: GenericPage},
      { path: "/sales/men", Component:MenSales },
      { path: "/sales/women", Component: WomenSales},
      { path: "/sales/kids", Component: KidSales },
      { path: "/sales/all", Component: ViewAll },

      //all icon
      {  path: "/product/:id",
         loader: async ({ params }) => {
      const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
      if (!res.ok) {
        throw new Response("Product not found", { status: 404 });
      }
      return res.json();
    },
    element: <ProductDetails />},



     //cart pages
      {path:"/wishlist",Component:WishList},

      // Men
      { path: "/men/clothing/tshirt", Component:Tshirt },
      { path: "/men/clothing/sweatshirt",Component:Sweatshirt},
      { path: "/men/clothing/leather", Component:Leather },
      { path: "/men/clothing/coats-jackets",Component:CoatsJackets  },
      {path:"/men/clothing/denim",Component:Denim},
      { path: "/men/clothing/knitwear", Component: Knitwear },
      {path:"/men/clothing/shorts",Component:Shorts},
      { path: "/men/clothing/swimwear", Component: Swimwear },
      { path: "/men/clothing/underwear-socks", Component: Underwear },
      {path:"/men/alls",Component:ViewAllMC},
      //shoes
      {path:"/men/shoes/Sneaker",Component:Sneaker},
      {path:"/men/shoes/OutofOffice",Component:OutofOffice},
      {path:"/men/shoes/BeRightBack" ,Component:BeRightBack},
      {path:"/men/shoes/Vulcanized",Component:Vulcanized},
      {path:"/men/shoes/Boots", Component:Boots},
      {path:"/men/shoes/FormalShoes", Component:FormalShoes},
      {path:"/men/shoes/Slides", Component:Slides},
      {path:"/men/shoes/ViewAll", Component:ViewAllMS},
      //bag
      {path:"/men/bags/BackPacks", Component:BackPacks},
      {path:"/men/bags/Crossbodybags",Component:Crossbodybags},
      {path:"/men/bags/Totebags", Component:Totebags},
      {path:"/men/bags/WaistBags", Component:WaistBags},
      {path:"/men/bags/ViewAll", Component:ViewAllMB},
      //Accessoris
      {path:"/men/accessories/Hatsand",Component:HatsandScarves},
      {path:"/men/accessories/Walletand",Component:WalletandCardholders},
      {path:"/men/accessories/OthersAccessories",Component:OthersAccessories},
      {path:"/men/accessories/ViewAll", Component:ViewAllMA},
      //juelary
      {path:"/men/jewelry/Bracelets", Component:Bracelets},
      {path:"/men/jewelry/Necklaces",Component:Necklaces},
      {path:"/men/jewelry/Rings", Component:Rings},
      {path:"/men/jewelry/Earrings",Component:Earrings},
      {path:"/men/all",Component:ViewAllM},
      {path:"/men/jewelry/ViewAll",Component:ViewAllMJ},

      // Women
      { path: "/women/activewear/Tops&Bras", Component: TopsBras },
      { path: "/women/activewear/Leggings", Component: Leggings },
      { path: "/women/clothing/Tops", Component: TShirtsTops },
      { path: "/women/clothing/Knitwear", Component: Knitwear1 },
      { path: "/women/clothing/Sweatshirts", Component: Sweatshirts },
      { path: "/women/clothing/Dresses", Component: Dresses },
      { path: "/women/clothing/Cots&Jackets", Component: CotsJackets1 },
      { path: "/women/clothing/Leather", Component: Leatherw },
      {path:"/women/activewear/ViewAll",Component:ViewAllWA},

      { path: "/women/clothing/Denim", Component: Denimw },
      { path: "/women/clothing/Pants", Component: Pants},
      { path: "/women/clothing/Skirts", Component: Skirts },
      { path: "/women/clothing/Shirts", Component: Shirts },
      { path: "/women/clothing/Swimwear", Component: Swimwear2},
      { path: "/women/clothing/Underwear", Component: Underwearw },
      {path:"/women/clothing/Viewall",Component:ViewAllWC},
      //shoe
      { path: "/women/shoes/Sneakers", Component: Sneakersw },
      { path: "/women/shoes/OutofOffice", Component: OutofOfficew },
      { path: "/women/shoes/RightBack", Component:BeRightBackw },
       { path: "/women/shoes/Vulcanized", Component: Vulcanizedw },
      { path: "/women/shoes/Bootsand", Component: BootsAnkleBootsw },
      { path: "/women/shoes/Mules", Component: MulesandPumps },
       { path: "/women/shoes/Sandals", Component: Sandalss },
      { path: "/women/shoes/Loafers", Component: Loafersw },
      { path: "/women/shoes/Slides", Component: Slidesandw },
      {path:"/women/shoes/Viewall",Component:ViewAllWs},
      //bag
       { path: "/women/bags/ShoulderBags", Component: ShoulderBags },
      { path: "/women/bags/handleBags", Component: TophandleBags },
      { path: "/women/bags/ToteBags", Component: ToteBagsw },
      { path: "/women/bags/Pouches", Component: ClutchesPouches },
      {path:"/women/bags/Viewall",Component:ViewAllWB},

      //accesoris
         { path: "/women/accessories/Walletand", Component: WalletandCardholders1 },
      { path: "/women/accessories/SoftAccessories", Component: SoftAccessories },
      { path: "/women/accessories/Belts", Component: Beltsw },
      {path:"/women/accessories/Viewall",Component:ViewAllWAs},

      //juellary
       { path: "/women/jewelry/Bracelets", Component: Braceletsw },
      { path: "/women/jewelry/Necklaces", Component: Necklacesw },
      { path: "/women/jewelry/Rings", Component: Ringsw },
      { path: "/women/jewelry/Earrings", Component: Earringsw },
      {path:"/women/jewelry/ViewAll", Component:ViewAllJJ},
    


      // Kids
      { path: "/kids/boys/Clothing", Component: BoyClothing },
      { path: "/kids/boys/Shoes", Component: BoyShoes },
      { path: "/kids/boys/Accessories", Component: BoyAccessories },
      { path: "/kids/girls/Clothing", Component: GirlClothing },
      { path: "/kids/girls/Shoes", Component: GirlShoes},
      { path: "/kids/girls/Accessories", Component: GirlAccessories },
       { path: "/kids/baby", Component: Baby },
       {path:"/kids/all", Component:ViewAllK},
       {path:"/kids/boys/ViewAll", Component:ViewBoys},
       {path:"/kids/girls/ViewAll",Component:ViewGG},

      // Eyewear
     
      { path: "/eyewear/sunglasses", Component: Sunglasse },
      { path: "/eyewear/eyeglass", Component: Eyeglass },
      { path: "/eyewear/all", Component: ViewAllE },

      // Icons
      { path: "/icons/men", Component: MensIcon },
      { path: "/icons/women", Component: WomenIcon },
      { path: "/icons/womennn", Component: GenericPage },
      { path: "/icons/all", Component: GenericPage },

      // Special Collection
      { path: "/special-collection/fall", Component: Fall },
      { path: "/special-collection", Component: GenericPage },
      { path: "/special-collection/winter", Component: Winter },
      { path: "/special-collection/fresco", Component: Frsco },

      // Admin
      { path: "/admin", Component: GenericPage },
      { path: "/admin/banner", Component: Banner },
      { path: "/admin/product", Component: Product },

      // Others
      { path: "/brand", Component: GenericPage },
      { path: "/login", Component: GenericPage },
      { path: "/wishlist", Component: GenericPage },
      { path: "/cart", Component: GenericPage },
    ],
  },
    {
    path: "/auth",
    Component: AuthRoot,
    children: [
      { path: "/auth/register", Component: Register },
      { path: "/auth/login", Component: SignIn },
      // { path: "/auth/profile", Component: Profile }
    ]

  },
]);
