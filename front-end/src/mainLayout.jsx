import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />

    </>
  );
}

export default MainLayout;