import { PaginationItem, styled } from "@mui/material";
import { colorTheme } from "src/theme/themeVariables";

export const StyledPaginationItem = styled(PaginationItem)(() => ({
  "&.Mui-selected": {
    borderRadius: ".8rem",
    border: `.1rem solid ${colorTheme.color.base.typography[600]}`,
    background: colorTheme.color.base.background[300],
    padding: "1rem",
    height: "auto"
  }
}));
