const Layout = ({ children }) => {
  return (
    <div className="container mx-auto bg-[#06162a] border-t-8 border-primary rounded">
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
