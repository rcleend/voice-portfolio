import React from "react";

interface CurvedTextProps {
  text: string;
}

const CurvedText: React.FC<CurvedTextProps> = ({ text }) => {
  return (
    <svg
      className="absolute -bottom-16 -left-14 w-[calc(100%+7rem)]"
      viewBox="0 0 160 25"
      height="70"
    >
      <path id="curve" d="M10,12 Q80,45 150,12" fill="none" />
      <text className="text-xl font-bold fill-current select-none">
        <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
};

export default CurvedText;
