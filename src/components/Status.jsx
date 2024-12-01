export default function Status({ Connected, Error }) {
  return Connected ? (
    <div className="text-base text-center bg-green-500">Connected</div>
  ) : Error ? (
    <div className="text-base text-center bg-red-500">
      {JSON.stringify(Error.type)}
    </div>
  ) : (
    <div className="text-base text-center bg-yellow-500">Connecting...</div>
  );
}
