import React from "react";
import { useTranslation } from "react-i18next";
import Ellipse from "src/components/bg-decor/Ellipse";
import OverlayModal from "src/components/OverlayModal/OverlayModal";
import { ROUTES } from "src/constants/routing/urls";
import useAuthCheck from "src/hooks/useAuthCheck";

import FoundForm from "./components/FoundForm";
import { useStyles } from "./found.styles";

const Found: React.FC = () => {
  const { classes } = useStyles();
  const user = useAuthCheck();
  const { t } = useTranslation();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.foundTitleWrap}>
          <h2 className={classes.foundTitle}>{t("pages.foundFormPage.title")}</h2>
        </div>
        <FoundForm t={t} />
      </div>
      {!user && (
        <OverlayModal
          text={t("pages.foundFormPage.overlayModal.unauthorized.text")}
          title={t("pages.foundFormPage.overlayModal.unauthorized.title")}
          buttonTitle={t("pages.foundFormPage.overlayModal.unauthorized.buttonTitle")}
          to={ROUTES.LOGIN}
        />
      )}
      <Ellipse className={classes.bgDecor} />
    </div>
  );
};

export default Found;
