import {
  ChangeEventHandler,
} from "react";

export const SliderComponent: React.FC<{handleChangeItemSlider :ChangeEventHandler<HTMLInputElement>}> = ( 
 {handleChangeItemSlider}
) => {
  
  return (
    <input
      type="range"
      min="1"
      max="100"
      onChange={handleChangeItemSlider}
    />
  );
};
