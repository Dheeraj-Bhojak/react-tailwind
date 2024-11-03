import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SliderBarContextProps {
  isSliderBarOpen: boolean;
  setIsSliderBarOpen: Dispatch<SetStateAction<boolean>>;
}

export const SliderBarContext = createContext<{
  state: SliderBarContextProps;
  toggleSliderBar: () => void;
}>({
  state: {
    isSliderBarOpen: true,
    setIsSliderBarOpen: () => {},
  },
  toggleSliderBar: () => {},
});

interface SliderBarProviderProps {
  children: ReactNode;
}

export const SliderBarProvider: React.FC<SliderBarProviderProps> = ({
  children,
}) => {
  const [isSliderBarOpen, setIsSliderBarOpen] = useState<boolean>(true);

  const toggleSliderBar = () => {
    setIsSliderBarOpen((prevIsSliderBarOpen) => !prevIsSliderBarOpen);
  };

  const value = {
    state: {
      isSliderBarOpen,
      setIsSliderBarOpen,
    },
    toggleSliderBar,
  };

  return (
    <SliderBarContext.Provider value={value}>
      {children}
    </SliderBarContext.Provider>
  );
};
