import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h1 className="logo">CODYGO</h1>
        <div className="nav">
          <p className="active">Hotels</p>
          <p>Brands</p>
          <p>Pricing</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
