import "./footer.css";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h1>codygo</h1>
        <p>
          Copyright {new Date().getFullYear()} codygo | All rights reserved.
        </p>
      </div>
    </footer>
  );
};
