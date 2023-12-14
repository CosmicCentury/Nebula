import React, { useRef, useState } from "react";

interface useQuickAccessResult {
  QuickAccessComponent: React.FC<quickAccessComponentProps>;
  ref: React.MutableRefObject<{
    [key: string]: HTMLDivElement;
  }>;
}

interface quickAccessComponentProps {
  title: string;
}

interface menuProps {
  label: string;
  value: number;
}

type position = "static" | "relative" | "absolute" | "sticky" | "fixed";

interface useQuickAccessProps {
  navList: menuProps[];
  scrollPosition?: ScrollIntoViewOptions["block"];
  headerPosition?: position;
  highlightActive?: boolean;
}

const useQuickAccess = ({
  navList,
  scrollPosition = "center",
  headerPosition = "static",
  highlightActive = false,
}: useQuickAccessProps) => {
  const ref = useRef<{ [key: number]: HTMLDivElement }>({});

  const [isActive, setIsActive] = useState<number>(0);

  const onClickScrollToElement = (index: number) => {
    ref.current[index].scrollIntoView({
      behavior: "auto",
      block: scrollPosition,
    });
  };

  const QuickAccessComponent: React.FC<quickAccessComponentProps> = ({
    title,
  }) => (
    <div style={{ display: "flex", gap: "20px", position: headerPosition }}>
      <span>{title} </span>
      {navList.length > 0 ? (
        navList.map((x) => (
          <div
            style={{ borderBottom: isActive == x.value ? "5px solid" : "none" }}
            key={x.value}
            onClick={() => {
              onClickScrollToElement(x.value);
              setIsActive(x.value);
            }}
          >
            {x.label}
          </div>
        ))
      ) : (
        <div>list is empty</div>
      )}
    </div>
  );

  return { QuickAccessComponent, ref } as useQuickAccessResult;
};

export default useQuickAccess;
