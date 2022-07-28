import { NavigationItemTree } from "../../types/navigation";
import Item from "./item";

interface IProps {
  items: NavigationItemTree[];
  level: number;
}

const List: React.FC<IProps> = ({ items, level }) => {
  const preparedItems = items.map(item => <Item item={item} level={level} key={item.id} />);
  return level > 0
    ? <div className="dropdown-menu">{preparedItems}</div>
    : <>{preparedItems}</>;
}

export default List;
