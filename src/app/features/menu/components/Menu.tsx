import Addmenu from "./Addmenu";

const menu = () => {
  return (
    <>
      <div className="flex flex-row justify-between mt-10 px-2">
        <h1 className="text-2xl  font-bold">Menus</h1>
        <Addmenu/>
      </div>
    </>
  );
};

export default menu;
