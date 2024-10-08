import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMouseMove } from "@/features/chat/hooks/useMouseAnimation";
import CurvedText from "./curvedText";

const MenuItem = ({
  item,
  index,
  onMenuItemClick,
}: {
  item: string;
  index: number;
  onMenuItemClick: (input: string) => void;
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null);
  const { isHovered, position, handleMouseEnter, handleMouseLeave } =
    useMouseMove(menuItemRef);

  const menuItemVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 20,
      transition: {
        delay: i * 0.02,
        duration: 0.1,
      },
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      key={item}
      custom={index}
      variants={menuItemVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        ref={menuItemRef}
        id="menu-item"
        className={`w-max text-center text-lg mb-4  bg-white rounded-full shadow-md transition-all duration-300 ease-out ${
          isHovered ? "shadow-lg scale-110" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `translate(${position.x}px, ${position.y}px) scale(1.1)`
            : "",
        }}
      >
        <span
          onClick={() => {
            onMenuItemClick(item);
          }}
          className="text-black font-semibold block px-4 py-2 cursor-pointer"
        >
          {item}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Menu: React.FC<{ onMenuItemClick: (input: string) => void }> = ({
  onMenuItemClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isHovered, position, handleMouseEnter, handleMouseLeave } =
    useMouseMove(buttonRef);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Add useEffect to handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  const menuItems = [
    "Who is Roel?",
    "What is Roel looking for?",
    "Schedule Meeting",
  ];

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 flex flex-col items-center"
          >
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                index={index}
                onMenuItemClick={(input) => {
                  onMenuItemClick(input);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        className={`w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center focus:outline-none shadow-xl transition-all duration-300 ease-out ${
          isHovered ? "shadow-lg scale-110" : ""
        }`}
        onClick={toggleMenu}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `translate(${position.x}px, ${position.y}px) scale(1.1)`
            : "",
        }}
      >
        <motion.div
          className="text-white text-4xl font-bold"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
        >
          +
        </motion.div>
      </motion.button>
      <CurvedText text={"Sound on..."} />
    </div>
  );
};

export default Menu;
