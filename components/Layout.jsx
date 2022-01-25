import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({children}) => {


  return (
    <>
      <Navbar/>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;