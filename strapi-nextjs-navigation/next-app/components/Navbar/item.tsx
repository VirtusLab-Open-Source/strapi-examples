import Link from "next/link";
import { Nav } from "react-bootstrap";
import { NavigationItemTree } from "../../types/navigation";
import List from "./list";

interface IProps {
  item: NavigationItemTree;
  level: number;
}

const Item: React.FC<IProps> = ({ item, level }) => {
  return (
    <Nav.Link href={item.path}>
      <Link href={item.path} passHref={item.type === "EXTERNAL"}>
        {item.title}
      </Link>
      {item.items && item.items.length ? <List items={item.items} level={level + 1} /> : null}
    </Nav.Link>
  );
}

export default Item;
