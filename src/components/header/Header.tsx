import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <a href="/" className="logo">
          CODYGO
        </a>
        <div className="nav">
          <a href="/hotel">Hotels</a>
          <a href="/brands">Brands</a>
          <a href="#">Pricing</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
