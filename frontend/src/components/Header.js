const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <p className="header__title">{title}</p>
    </header>
  );
};

export default Header;
