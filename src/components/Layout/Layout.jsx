import AppBar from "../AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <div> {children}</div>
    </div>
  );
};
export default Layout;
