import { ChangeEventHandler } from "react";

export const SelectComponent: React.FC<{handleSelectItem: ChangeEventHandler<HTMLSelectElement>}> = (props) => {
  const {handleSelectItem} = props
  return (
    <select onChange={handleSelectItem}>
      <option value="Hanoi">Ha Noi</option>
      <option value="BangKok">BangKok</option>
    </select>
  );
};
