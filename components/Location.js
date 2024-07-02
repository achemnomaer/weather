import { LuMapPin } from "react-icons/lu";

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

export default function Location({ location }) {
  return (
    <div className="flex gap-x-2 text-gray-300 text-lg font-medium w-full px-4 py-3 rounded-md bg-blue-900 shadow-md">
      <span className="my-auto">
        <LuMapPin className="w-6 h-6 " />
      </span>
      <span className="my-auto">{location}</span>
    </div>
  );
}
