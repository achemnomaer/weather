"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/context/globalContext";
import { useState } from "react";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

function SearchDialog() {
  let [isOpen, setIsOpen] = useState(false);

  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = useState(0);

  const getClickedCoords = (lat, lon) => {
    setActiveCityCoords([lat, lon]);
  };

  return (
    <div className="search-btn">
      {/* button to open search dialog */}
      <div className="flex">
        <button
          className="sm:hidden mt-0.5 my-auto"
          onClick={() => setIsOpen(true)}
        >
          <HiMagnifyingGlass className="w-7 h-7 text-gray-200 hover:text-white" />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="hidden min-w-80 max-w-md h-12 sm:flex gap-x-3 px-3 border border-slate-500 rounded-md bg-gray-200 hover:bg-white"
        >
          <div className="my-auto">
            <HiMagnifyingGlass className="w-6 h-6 text-gray-700" />
          </div>

          <p className="my-auto text-sm text-gray-600">Search City...</p>
        </button>
      </div>

      {/* Search dialog */}
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative border border-slate-400 transform overflow-hidden rounded-lg bg-gradient-to-tl bg-blue-900 text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
                  <div className="w-full flex justify-between border-b border-b-slate-400 px-2 py-2.5">
                    <div className="w-full flex gap-x-3">
                      <span className="my-auto text-gray-300">
                        <HiMagnifyingGlass className="w-6 h-6" />
                      </span>
                      <input
                        value={inputValue}
                        onChange={handleInput}
                        type="text"
                        autoFocus
                        className="block w-full bg-transparent border-none focus:outline-none text-gray-200 border placeholder:text-gray-300"
                        placeholder="Search..."
                      />
                    </div>
                    <span
                      onClick={() => setIsOpen(false)}
                      className="my-auto text-gray-300 hover:text-gray-200 cursor-pointer"
                    >
                      <HiXMark className="w-6 h-6" />
                    </span>
                  </div>
                  <ul className="px-2 pb-2">
                    <p className="p-2 font-medium text-slate-300">
                      Suggestions
                    </p>

                    {geoCodedList?.length === 0 && !geoCodedList && (
                      <p>No Results</p>
                    )}

                    {geoCodedList?.length > 0 &&
                      geoCodedList.map((item, index) => {
                        const { name, admin1, country } = item;
                        return (
                          <li
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            className={`py-3 px-2 text-sm  rounded-sm cursor-pointer
                        ${hoveredIndex === index ? "bg-slate-600" : ""}
                      `}
                            onClick={() => {
                              getClickedCoords(item.latitude, item.longitude);
                              setIsOpen(false);
                            }}
                          >
                            <p className=" text">
                              {name}, {admin1 && admin1 + ","} {country}
                            </p>
                          </li>
                        );
                      })}
                  </ul>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default SearchDialog;
