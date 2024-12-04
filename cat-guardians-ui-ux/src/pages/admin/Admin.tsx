import React, { useEffect, useState } from "react";
import CustomButton from "src/components/buttons/CustomButton";
import { AdminTabEnam } from "src/constants/adminPage-config/buttonTab";

import { useStyles } from "./admin.styles";
import AdoptionGroup from "./components/adoption-group/AdoptionGroup";
import FoundGroup from "./components/found-group/FoundGroup";
import PetsGroup from "./components/pets-group/PetsGroup";

const AdminPage = () => {
  const { classes } = useStyles();
  const [tab, setTab] = useState(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? parseInt(savedTab, 10) : AdminTabEnam.PetsGroup;
  });

  useEffect(() => {
    localStorage.setItem("activeTab", tab.toString());
  }, [tab]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.titleWrap}>
          <h2 className={classes.title}>Hello, Admin! Your control panel is waiting for you.</h2>
        </div>
        <div className={classes.buttonsWrap}>
          <CustomButton
            title="PetsList"
            className={tab === AdminTabEnam.PetsGroup ? classes.activeButton : classes.button}
            handleClick={() => setTab(AdminTabEnam.PetsGroup)}
          />
          <CustomButton
            title="Adoption group"
            className={tab === AdminTabEnam.AdoptionGroup ? classes.activeButton : classes.button}
            handleClick={() => setTab(AdminTabEnam.AdoptionGroup)}
          />
          <CustomButton
            title="Found form group"
            className={tab === AdminTabEnam.FoundPetsGroup ? classes.activeButton : classes.button}
            handleClick={() => setTab(AdminTabEnam.FoundPetsGroup)}
          />
        </div>
        <div>
          {tab === AdminTabEnam.PetsGroup && <PetsGroup />}
          {tab === AdminTabEnam.AdoptionGroup && <AdoptionGroup />}
          {tab === AdminTabEnam.FoundPetsGroup && <FoundGroup />}
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
