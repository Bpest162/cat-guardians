import { ROUTES } from "../routing/urls";

interface IPageList {
  id: number;
  title: string;
  to: string;
}

const pagesList: IPageList[] = [
  {
    id: 1,
    title: "Home",
    to: ROUTES.ROOT
  },
  {
    id: 2,
    title: "Available cats",
    to: ROUTES.PETSLIST
  },
  {
    id: 3,
    title: "Donate",
    to: ROUTES.DONATE
  },
  {
    id: 4,
    title: "Found a cat",
    to: ROUTES.FOUND
  },
  {
    id: 5,
    title: "About us",
    to: ROUTES.ABOUTUS
  },
  {
    id: 6,
    title: "Contact us",
    to: ROUTES.CONTACTUS
  },
  {
    id: 7,
    title: "Login",
    to: ROUTES.LOGIN
  }
];
export default pagesList;
