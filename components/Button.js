const Button = ({ children, ...props }) => {
  return (
    <button className="bg-primary-500 py-2 px-5 text-white rounded" {...props}>
      {children}
    </button>
  );
};

export default Button;
