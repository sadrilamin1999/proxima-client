const Footer = () => {
  return (
    <div className="border-t border-stone-400/40">
      <div className="footer container mx-auto h-20 flex items-center justify-center">
        <p>&copy;{new Date().getFullYear()} Proxima, All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
