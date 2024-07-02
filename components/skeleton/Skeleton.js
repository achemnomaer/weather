export function CurrentWeatherSkeleton() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full h-12 rounded-md bg-blue-900 shadow-md animate-pulse"></div>

      <div className=" w-full h-[550px] rounded-md bg-blue-900 shadow-md animate-pulse"></div>
    </div>
  );
}

export function HourlyWeatherSkeleton() {
  return (
    <div className="w-full h-48 bg-blue-900 rounded-md shadow-md animate-pulse"></div>
  );
}

export function DailyWeatherSkeleton() {
  return (
    <div className="w-full h-[405px] bg-blue-900 rounded-md shadow-md animate-pulse"></div>
  );
}

export function GlobalSkeleton() {
  return (
    <div className="sm:bg-[#667BC6] sm:rounded-md sm:shadow-md grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 sm:px-4 sm:py-8">
      <div>
        <CurrentWeatherSkeleton />
      </div>

      <div className="flex flex-col gap-y-4">
        <HourlyWeatherSkeleton />
        <DailyWeatherSkeleton />
      </div>
    </div>
  );
}
