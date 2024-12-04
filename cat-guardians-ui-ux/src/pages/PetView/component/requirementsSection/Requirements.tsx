import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "src/components/buttons/CustomButton";
import { TabEnam } from "src/constants/tub-enum/tabEnum";
import { IPets } from "src/pages/petsList/interfaces/pets";

import { useStyles } from "./requirement.styles";

const Requirements: React.FC<IPets> = ({ requirements_for_owner, preferences }) => {
  const [tab, setTab] = useState(TabEnam.req);
  const { classes } = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <div className={classes.buttonsWrapper}>
        <CustomButton
          className={
            tab === TabEnam.req ? ([classes.activeButton] as never) : ([classes.button] as never)
          }
          title={t("pages.petView.requirementsTab.tabFirst")}
          handleClick={() => setTab(TabEnam.req)}
        />
        <CustomButton
          className={
            tab === TabEnam.likes ? ([classes.activeButton] as never) : ([classes.button] as never)
          }
          title={t("pages.petView.requirementsTab.tabSecond")}
          handleClick={() => setTab(TabEnam.likes)}
        />
      </div>
      <div className={classes.tabsTextWrapper}>
        {tab === TabEnam.req && <p className={classes.tabsText}>{requirements_for_owner}</p>}
        {tab === TabEnam.likes && <p className={classes.tabsText}>{preferences}</p>}
      </div>
    </div>
  );
};

export default Requirements;
