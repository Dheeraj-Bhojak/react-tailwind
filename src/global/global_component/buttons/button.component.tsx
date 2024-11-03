import {
  SideLeftBounceYellow,
  SideLeftBounceBlue,
  PressButton,
} from "./button.style";

export enum BUTTON_TYPE_CLASSES {
  slideLeftButtonYellow = "slideLeftButtonYellow",
  sideLeftBounceBlue = "sideLeftBounceBlue",
  pressButton = "pressButton",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: BUTTON_TYPE_CLASSES;
}

const getButton = (buttonType: BUTTON_TYPE_CLASSES) =>
  ({
    [BUTTON_TYPE_CLASSES.slideLeftButtonYellow]: SideLeftBounceYellow,
    [BUTTON_TYPE_CLASSES.sideLeftBounceBlue]: SideLeftBounceBlue,
    [BUTTON_TYPE_CLASSES.pressButton]: PressButton,
  }[buttonType]);

const Button: React.FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};
export default Button;
