import { MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import { statusArr } from "src/constants/adminPage-config/selectFieldValue";
import { editAdoption, fetchAdoptionList } from "src/pages/adoption/store/action";

import { useStyles } from "./editAdoption.syles";

const EditAdiption = ({ elem, onClose }) => {
  const { classes } = useStyles();
  const { control, register, handleSubmit, reset, setValue } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (elem) {
      await dispatch(editAdoption.request({ itemId: elem.id, data: data }));

      dispatch(fetchAdoptionList.request({}));
      onClose();
    }
  };

  useEffect(() => {
    if (elem) {
      reset({
        user: elem.user,
        cat: elem.cat,
        request_date: elem.request_date,
        decision_date: elem.decision_date,
        phone_number: elem.phone_number,
        status: elem.status,
        notes: elem.notes
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
          <label htmlFor="cat" className={classes.formLabel}>
            Cat(Read-Only):
            <input
              type="text"
              id="cat"
              className={classes.formInput}
              {...register("cat")}
              readOnly
            />
          </label>
          <label htmlFor="user" className={classes.formLabel}>
            User(Read-Only):
            <input
              type="text"
              id="user"
              className={classes.formInput}
              {...register("user")}
              readOnly
            />
          </label>
          <div className={classes.inputBox}>
            <label htmlFor="request_date" className={classes.formLabel}>
              Request date(Read-Only):
              <input
                type="text"
                id="request_date"
                className={classes.formInput}
                {...register("request_date")}
                readOnly
              />
            </label>
            <label htmlFor="date" className={classes.formLabel}>
              Decision date:
              <input
                type="date"
                id="date"
                className={classes.formInput}
                {...register("decision_date")}
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
                      {statusArr.map((option) => (
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
          <label htmlFor="notes" className={classes.textAreaLabel}>
            Notes(Read-Only):
            <textarea
              name="notes"
              id="notes"
              className={classes.formTextArea}
              {...register("notes")}
              readOnly
            ></textarea>
          </label>
          <div>
            <CustomButton title="Save" className={classes.saveBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdiption;
