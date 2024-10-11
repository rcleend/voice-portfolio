import useMarvinAvatar from "@/features/chat/hooks/useMarvinAvatar";
import { cn } from "@/lib/utils";

export function Avatar({
  isTalking,
  isConnected,
  shrink = false,
}: {
  isTalking: boolean;
  isConnected: boolean;
  shrink?: boolean;
}) {
  const { state } = useMarvinAvatar({
    isTalking,
    isConnected,
  });
  return (
    <div
      className={cn(
        `relative aspect-square transition-all duration-1000 linear`,
        shrink ? "absolute -top-36 w-1/2 max-w-[200px]" : "w-2/3 max-w-[450px]"
      )}
    >
      <svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="410 150 1100 900"
        className="w-full h-full drop-shadow-xl"
      >
        <g id="Marvin">
          <g
            id="Face"
            className={`${
              state === "talking" ? "animate-talking-head-movement" : ""
            }`}
          >
            <path
              id="Shape 1"
              className="fill-gray-200"
              d="m951.1 1088.1c-331.8-3.6-554.8-267.8-534.5-544.4 17.3-235.5 210.5-431.2 451.8-470.5 263.2-42.9 544.6 105.1 618.2 374.9 89.3 327.2-161.8 644-535.5 640z"
            />
            <path
              className="fill-white stroke-white stroke-miterlimit-[10]"
              d="m477 357c0 0-97.7 262.6 42 482 4.3 6.8-18.9-15.1-15 5 0.8 4-163.5-215.4-27-487z"
            />
            <path
              className="fill-gray-300"
              d="m1253 260c0 0 70.3 36.9 106 3 2.8-2.7 78.4 184.4 65.7 378.3-0.3 4.9-9-99.1-55.6-193-46.6-94.1-118.3-188.8-116.1-188.3z"
            />
            <path
              className="fill-white"
              d="m1404 346c0 0 41.8 40.2 31-2-10.8-42.2 66.2 136.8 58 228.4-5 55.1 6.8 142-111 322.6-6.6 10.1 73.5-166.1 54-347.4-8.1-75.1-32-201.6-32-201.6z"
            />
          </g>
          <g
            id="Eyes"
            className={`${
              state !== "disconnected" ? "animate-complex-eye-movement" : ""
            }`}
          >
            <path
              className="fill-black"
              d="m489 752c0 0 0.6 10.2 3 12 0.6 0.4 207.8-90.2 509-115 301.2-24.8 394.2-8.2 478 23 0.7 0.2 2.6-9.1 2.6-9.1 0 0-64.6-30.8-198.6-37.9-86.8-4.6-231 9.6-283 13-41.2 2.7-259.6 29.5-339 51-143.9 39-172 63-172 63z"
            />
            <path className="fill-black" d="m1224.3 633.7l96.7 103.3 67-95" />
            <path className="fill-black" d="m594 721l84 73 88-115" />
            <g
              className={`transition-transform duration-500 ${
                state === "idle" || state === "talking" ? "origin-center" : ""
              }`}
            >
              <path
                className={`transition-colors duration-500 ${
                  state === "disconnected"
                    ? "fill-gray-800"
                    : state === "talking"
                    ? "fill-green-500"
                    : "fill-green-700"
                }`}
                d="m1234 636l83 80 55-73-45-7"
              />
              <path
                className={`transition-colors duration-500 ${
                  state === "disconnected"
                    ? "fill-gray-800"
                    : state === "talking"
                    ? "fill-green-500"
                    : "fill-green-700"
                }`}
                d="m613 712l70 66 71-99-84 16"
              />
            </g>
          </g>
        </g>
      </svg>

      {state === "disconnected" && (
        <div className="absolute -top-20 -right-10 lg:-top-32 lg:-right-32 w-2/3 h-2/3 overflow-hidden">
          <div className="relative w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <text
                x="20"
                y="90"
                className="text-4xl fill-black animate-sleep-z1 opacity-0 select-none"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                z
              </text>
              <text
                x="40"
                y="70"
                className="text-5xl fill-black animate-sleep-z2 opacity-0 select-none"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                z
              </text>
              <text
                x="65"
                y="50"
                className="text-6xl fill-black animate-sleep-z3 opacity-0 select-none"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                z
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
