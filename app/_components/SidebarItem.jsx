"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

// Dummy static data
// const staticSubItems = [
//   { title: "Overview", url: "/section1" },
//   { attributes: { episodeID: "episode1", Title: "Episode 1" } },
//   { attributes: { episodeID: "episode2", Title: "Episode 2" } },
// ];

const SidebarItem = ({
  title,
  url ,
  subItems,
  standAlone,
}) => {

  const generateLink = (subItem) => {
    if (subItem.url) {
      return subItem.url;
    } else if (url) {
      return `/pages/${url}/${subItem.attributes?.episodeID}`;
    } else {
      return "/pages";
    }
  };

  const isActiveLink = (subItem) => {
    const link = generateLink(subItem);
    return pathname === link;
  };

  const determineInitialOpenState = () => {
    return standAlone || subItems.some((subItem) => isActiveLink(subItem));
  };
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    setMaxHeight(isOpen ? `${contentRef?.current?.scrollHeight}px` : "0px");
  }, [isOpen]);

  // Initialize open state based on active links

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex font-notoGujarati tracking-wide items-center cursor-pointer p-1 px-5"
      >
        {!standAlone && (
          <span className="text-gray-500 mr-2">
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
        <div className={`text-gray-600 font-semibold flex-1`}>
          {standAlone || !subItems ? (
            <Link href={`/pages/${url}`} className="block ml-5">
              <span>&nbsp;&nbsp;{title}</span>
            </Link>
          ) : (
            <span className="">{title}</span>
          )}
        </div>
      </div>
      {!standAlone && (
        <div
          ref={contentRef}
          className={`transition-max-height duration-300 ease-in-out overflow-hidden`}
          style={{ maxHeight }}
        >
          {subItems && (
            <div className="px-5">
              {subItems.length < 2 ? (
                <div className="p-1 pl-8 block text-gray-600 mb-1 text-[0.75rem]">
                  Coming Soon.........
                </div>
              ) : (
                subItems.map((subItem, index) => (
                  <Link href={generateLink(subItem)} key={index}>
                    <div
                      className={`text-sm font-notoGujarati tracking-wide p-1 pl-8 block text-gray-600 cursor-pointer mb-1 
                        ${
                          isActiveLink(subItem)
                            ? "bg-gray-200 text-gray-800"
                            : "hover:bg-gray-200 hover:text-gray-800"
                        }`}
                    >
                      {/* Conditionally render the icon if it exists */}
                      {subItem.Icon && (
                        <subItem.Icon className="inline-block mr-2 text-gray-600" />
                      )}
                      {subItem.title ? (
                        subItem.title
                      ) : (
                        <>
                          Episode-{subItem.attributes?.episodeID} :{" "}
                          {subItem.attributes?.Title}
                        </>
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
