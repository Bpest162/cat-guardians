import { Pagination as MuiPagination } from "@mui/material";
import React from "react";
import ArrowLeft from "src/components/icons/ArrowLeft";
import ArrowRight from "src/components/icons/ArrowRight";

import { StyledPaginationItem } from "./lib/StyledPagination";
import { useStyles } from "./paginationMui.styles";

interface IPaginationProps {
  handleClick: (event: React.ChangeEvent<unknown>, value: number) => void;
  count: number;
  page: number;
}

const Pagination: React.FC<IPaginationProps> = ({ handleClick, count, page }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.paginationWrap}>
      <MuiPagination
        onChange={handleClick}
        count={Number(count || 0)}
        page={page}
        boundaryCount={1}
        siblingCount={0}
        renderItem={(item) => (
          <StyledPaginationItem slots={{ previous: ArrowLeft, next: ArrowRight }} {...item} />
        )}
      />
    </div>
  );
};
export default Pagination;
