import { TbWashMachine, TbBus, TbListDetails } from "react-icons/tb";
import { AiFillDatabase } from "react-icons/ai";
import { IoHome } from "react-icons/io5";

const items = [
  {
    key: "1",
    label: "היים",
    icon: <IoHome />,
    path: "",
  },
  {
    key: "2",
    label: "באס און וואשן",
    icon: <TbBus />,
    path: "buses",
  },
  {
    key: "3",
    label: "דעטאלן",
    icon: <TbListDetails />,
    path: "details",
  },
  {
    key: "4",
    label: "אלטע אינפארמאציע",
    icon: <AiFillDatabase />,
    path: "old_data",
  },
];

export default items;
