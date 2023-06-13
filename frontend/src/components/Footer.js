const Footer = () => {
  const recentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <h2 className="footer__copyright">
        &copy;2022-{recentYear} Klimovich Pavel
      </h2>
    </footer>
  );
};

export default Footer;
