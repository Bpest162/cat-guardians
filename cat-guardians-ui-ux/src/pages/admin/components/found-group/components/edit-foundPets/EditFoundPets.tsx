import { MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import { foundPetsStatusArr } from "src/constants/adminPage-config/selectFieldValue";
import { editFoundPets, getFoundPets } from "src/pages/found/components/store/action";

import { useStyles } from "./editFoundPets.styles";

const EditFoundPets = ({ elem, onClose, photo }) => {
  const { classes } = useStyles();
  const { control, register, handleSubmit, reset, setValue } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (elem) {
      await dispatch(editFoundPets.request({ itemId: elem.id, data: data }));

      dispatch(getFoundPets.request({}));
      onClose();
    }
  };

  useEffect(() => {
    if (elem) {
      const formattedDate = elem.created_at.split("T")[0];
      reset({
        id: elem.id,
        address: elem.address,
        created_at: formattedDate,
        phone_number: elem.phone_number,
        status: elem.status,
        description: elem.description
      });
      setValue("status", elem.status);
    }
  }, [elem, reset, setValue]);

  return (
    <div>
      <div className={classes.editFormContainer}>
        <div className={classes.editFormHeader}>
          <CustomButton title="Close" className={classes.closeBtn} handleClick={onClose} />
        </div>
        <form action="" className={classes.editForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="catId" className={classes.formLabel}>
            Aplication №(Read-Only):
            <input
              type="text"
              id="catId"
              className={classes.formInput}
              {...register("id")}
              readOnly
            />
          </label>
          <div className={classes.inputBox}>
            <label htmlFor="address" className={classes.formLabel}>
              Address(Read-Only):
              <input
                type="text"
                id="address"
                className={classes.formInput}
                {...register("address")}
                readOnly
              />
            </label>
            <label htmlFor="date" className={classes.formLabel}>
              Created(Read-Only):
              <input
                type="text"
                id="date"
                className={classes.formInput}
                {...register("created_at")}
                readOnly
              />
            </label>
          </div>
          <div className={classes.inputBox}>
            <FormControl className={classes.zIndex}>
              <span className={classes.formLabel}>
                Status
                <Controller
                  name="status"
                  control={control}
                  defaultValue={elem?.status || ""}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label=""
                      InputProps={{
                        classes: { root: classes.formInput }
                      }}
                      SelectProps={{
                        MenuProps: {
                          disablePortal: true,
                          disableScrollLock: true
                        }
                      }}
                      {...field}
                    >
                      {foundPetsStatusArr.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </span>
            </FormControl>
            <label htmlFor="phone" className={classes.formLabel}>
              Phone number(Read-Only):
              <input
                type="text"
                id="phone"
                className={classes.formInput}
                {...register("phone_number")}
                readOnly
              />
            </label>
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="description" className={classes.textAreaLabel}>
              Description(Read-Only):
              <textarea
                name="description"
                id="description"
                className={classes.formTextArea}
                {...register("description")}
                readOnly
              ></textarea>
            </label>
            <div>
              <span className={classes.formLabel}>
                Photo(Read-Only):
                <img src={photo} alt="photo" className={classes.image} />
              </span>
            </div>
          </div>
          <div>
            <CustomButton title="Save" className={classes.saveBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoundPets;
