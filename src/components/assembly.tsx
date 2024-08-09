import { FormEvent, useRef, useState } from "react";

export const Assembly = ({ stages }: { stages: string[] }) => {
  const id = useRef(0);
  const [items, setItems] = useState<
    { name: string; id: number; stage: number }[]
  >([]);
  const [item, setItem] = useState<string>("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const temp: any = [...items];
    temp.push({
      name: item,
      id: id.current + 1,
      stage: 0,
    });
    id.current = id.current + 1;
    setItems(temp);
    setItem("");
  };

  const nextStage = (id: number) => {
    const temp: { name: string; id: number; stage: number }[] = [...items];
    const i = temp.findIndex(
      (item: { name: string; id: number; stage: number }) => item.id === id
    );
    if (i !== -1) {
      const newItem = temp[i];
      temp[i].stage++;
      temp.splice(i, 1);
      temp.unshift(newItem);
      setItems([...temp]);
    }
  };

  const previousStage = (id: number) => {
    const temp: { name: string; id: number; stage: number }[] = [...items];
    const i = temp.findIndex(
      (item: { name: string; id: number; stage: number }) => item.id === id
    );
    if (i !== -1) {
      const newItem = temp[i];
      temp[i].stage--;
      temp.splice(i, 1);
      temp.push(newItem);
      setItems([...temp]);
    }
  };

  return (
    <>
      <h1 className="assembly-wrapper">Assembly</h1>
      <p>{id.current}</p>
      <form onSubmit={submit}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </form>
      <div className="stages-wrapper">
        {stages.map((stage, index) => (
          <div className="stage" key={index}>
            <div>
              {stage}
              {items.map(
                (item) =>
                  item.stage == index && (
                    <div
                      key={item.id}
                      onContextMenu={() => previousStage(item.id)}
                      onClick={() => nextStage(item.id)}
                    >
                      {item.name} {item.id}
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Assembly;
