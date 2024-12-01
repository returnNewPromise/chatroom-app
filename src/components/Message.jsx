export default function Message({ item }) {
  return (
    <div className="">
      <li
        className={`${
          item.user === "Me" ? `flex-row-reverse` : ""
        } min-h-4  my-4 rounded px-1 w-full flex  `}
      >
        <div
          className={`w-fit ${
            item.user === "Me" ? "bg-green-600" : "bg-slate-200"
          } p-2 rounded flex`}
        >
          <span
            className={`${
              item.user === "Me" ? " text-white" : " text-purple-500"
            }`}
          >
            {item.user}
          </span>
          :<span>{item.message}</span>
        </div>
      </li>
    </div>
  );
}
