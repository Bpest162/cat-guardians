export interface IButton {
  className: string;
  title: string;
  to?: string;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
}
