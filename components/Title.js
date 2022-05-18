const Title = ({ children }) => {
  return (
    <div className="flex gap-2 items-center p-3 text-[#00494e] bg-gradient-to-b from-[#1cf2ff] to-[#01bcc8] text-xl font-normal uppercase">
      <img src="https://www.videochaterotico.com/tpl/common-images/header-ico.svg" />
      <div>{children}</div>
    </div>
  );
};

export default Title;
