function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-xl font-bold text-white">Librix</div>

        <nav className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">
            Про нас
          </a>
          <a href="#" className="hover:text-white">
            Контакти
          </a>
          <a href="#" className="hover:text-white">
            Допомога
          </a>
        </nav>

        <div className="text-sm mt-4 md:mt-0">
          © <span title="fucking niggers">{new Date().getFullYear()}</span> Librix. Всі права
          захищені.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
