import { useEffect, useState } from "react";
import { NavigationItemFlat } from "../../types/navigation";
import Link from "next/link";
import { fetchFooterNavigation } from "../../api";

const MainFooter = () => {
  const [footerItems, setFooterItems] = useState<NavigationItemFlat[]>([]);
  useEffect(() => {
    fetchFooterNavigation()
      .then(setFooterItems)
      .catch(e => console.error(e));
  }, []);

  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <p className="col-md-4 mb-0 text-muted">Created by VirtusLab</p>
        <ul className="nav col-md-auto justify-content-end">
          {footerItems.map((navItem) => {
            const isExternal = navItem.type === "EXTERNAL";
            return (
              <Link key={navItem.id} href={isExternal ? navItem.externalPath : navItem.path}>
                <li className="nav-item nav-link px-3 text-muted">
                  {navItem.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default MainFooter;