const Header = ({ image, input_text }) => {
  return (
    <div className="flex bg-green-400 p-5 items-center justify-center rounded-2xl shadow-lg w-4/5 h-36 mx-10 my-5 hover:-translate-y-2">
      <img src={image} style={{ width: "125px", height: "150px" }} />
      <p className="text-center font-mono text-2xl font-bold">
        How many calories are in {input_text}?
      </p>
    </div>
  );
};

const SideChart = () => {
  return (
    <div className="bg-slate-800 p-5 rounded-lg shadow-lg w-1/2 h-full text-center mx-10">
      <p className="text-white">Some Cool Chart of Food Macros Here</p>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center w-screen mt-5">
      <div className="flex header-container  w-full">
        <div className="flex flex-col  items-center justify-center">
          <Header
            image={"/pep-pizza-slice.webp"}
            input_text="a slice of Pepperoni Pizza"
          />
          <Header />
        </div>
        <SideChart />
      </div>
    </div>
  );
}
