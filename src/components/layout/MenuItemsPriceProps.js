import MinusCircle from "@/components/icons/MinusCircle";
import PlusCircle from "@/components/icons/PlusCircle";
import Up from "@/components/icons/Up";
import Down from "@/components/icons/Down";
import { useState } from "react";

export default function MenuItemsPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [toggleOpen, setToggleOpen] = useState(false);

  function addProp() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(idxToRemove) {
    setProps((prev) => prev.filter((_, idx) => idxToRemove !== idx));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="p-1 border-0 justify-start"
        onClick={() => setToggleOpen((prev) => !prev)}
      >
        {toggleOpen ? <Up /> : <Down />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={toggleOpen ? "block" : "hidden"}>
        {props?.length > 0 &&
          props.map((size, idx) => (
            <div className="flex items-end gap-1">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, idx, "name")}
                />
              </div>
              <div>
                <label>Additional Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, idx, "price")}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="mb-2 px-2"
                  onClick={() => removeProp(idx)}
                >
                  <MinusCircle />
                </button>
              </div>
            </div>
          ))}
        <button type="button" onClick={addProp} className="bg-white">
          <PlusCircle />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
