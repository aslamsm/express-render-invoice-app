import Footer from "./Footer";
import Header from "./Header";
import "./Layout.css";
import MainSection from "./MainSection";
import Nav from "./Nav";


function Layout() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <MainSection></MainSection>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
