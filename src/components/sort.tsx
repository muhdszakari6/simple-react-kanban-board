import { FormEvent, useState } from "react";

const Sort = () => {
  const [items, setItems] = useState<string[]>([]);
  const [item, setItem] = useState<string>("");
  const [dir, setDir] = useState<string>("asc");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item === "") return;
    let temp: string[] = [];
    if (dir == "asc") {
      temp = [...items, item].sort((a, b) => a.localeCompare(b));
    } else {
      temp = [...items, item].sort((a, b) => a.localeCompare(b)).reverse();
    }
    setItems([...temp]);
    setItem("");
  };

  const sort = () => {
    let temp: string[] = [];
    if (dir == "asc") {
      setDir("desc");
      temp = [...items, item].sort((a, b) => a.localeCompare(b)).reverse();
    } else {
      setDir("asc");
      temp = [...items, item].sort((a, b) => a.localeCompare(b));
    }
    setItems([...temp]);
  };

  return (
    <>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}>
        <div className="input-wrapper">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <button type="button" onClick={sort}>
            {dir == "asc" ? "desc" : "asc"}
          </button>
          <button type="button" onClick={() => setItems([])}>
            clear
          </button>
        </div>
        {items.map((item: string, index: number) => (
          <div key={index}>{item}</div>
        ))}
      </form>
    </>
  );
};

export default Sort;
