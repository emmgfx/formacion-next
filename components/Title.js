const Title = ({ children }) => {
  return (
    <div className="flex gap-2 items-center p-3 text-primary-darkest bg-gradient-to-b from-primary-light to-primary-dark text-xl font-normal uppercase">
      <img src="https://www.videochaterotico.com/tpl/common-images/header-ico.svg" />
      <div>{children}</div>
    </div>
  );
};

export default Title;
