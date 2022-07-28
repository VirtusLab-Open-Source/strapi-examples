import Link from "next/link";

const footerItems = [{
  id: 1,
  title: 'Strapi Documentation',
  path: 'https://docs.strapi.io/',
}, {
  id: 2,
  title: 'Strapi Plugin Comments',
  path: 'https://github.com/VirtusLab-Open-Source/strapi-plugin-comments/',
}, {
  id: 3,
  title: 'Strapi Plugin Navigation',
  path: 'https://github.com/VirtusLab-Open-Source/strapi-plugin-navigation/',
}];

const MainFooter: React.FC = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <p className="col-md-4 mb-0 text-muted">Created by VirtusLab</p>
        <ul className="nav col-md-auto justify-content-end">
          {footerItems.map((navItem) => (
            <Link key={navItem.id} href={navItem.path} passHref>
              <li className="nav-item nav-link px-3 text-muted">
                {navItem.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default MainFooter;