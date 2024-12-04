import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomButton from "src/components/buttons/CustomButton";
import ImageIcon from "src/components/icons/ImageIcon";
import TgIcon from "src/components/icons/TgIcon";
import UploadIcon from "src/components/icons/UploadIcon";
import OverlayModal from "src/components/OverlayModal/OverlayModal";
import { StatusCode } from "src/constants/httpStatus/httpStatus";
import { ROUTES } from "src/constants/routing/urls";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./foundForm.styles";
import { fetchClearFoundPets, postFoundPets } from "./store/action";
import { selectFoundForm, selectFoundState } from "./store/selectors";

const FoundForm: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();

  const dispatch = useDispatch();

  const foundFormState = useSelector(selectFoundState);
  const foundData = useSelector(selectFoundForm);

  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [fileName, setFileName] = useState(
    t("pages.foundFormPage.foundForm.labels.file.selectFile")
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleDelete = () => {
    setFileName(t("pages.foundFormPage.foundForm.labels.file.selectFile"));
    setImage(null);
    setPhoto(null);
  };

  const handleChange = (files) => {
    if (files[0]) {
      setFileName(files[0].name);
      setImage(URL.createObjectURL(files[0]));
      setPhoto(files[0]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files[0]) {
      handleChange(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const submit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone_number", data.phone_number);
    formData.append("email", data.email);
    formData.append("address", data.address);
    formData.append("description", data.description);
    if (photo) {
      formData.append("photo", photo);
    }
    dispatch(postFoundPets.request(formData));
    reset(handleDelete);
  };

  const onHandleClose = () => {
    dispatch(fetchClearFoundPets.request(null));
  };

  return (
    <div className={classes.formWrapper}>
      <form action="#" className={classes.form} onSubmit={handleSubmit(submit)}>
        <label htmlFor="name" className={classes.formLabel}>
          {t("pages.foundFormPage.foundForm.labels.name")}
          <input
            type="text"
            id="name"
            placeholder={t("pages.foundFormPage.foundForm.placeholders.name")}
            className={
              errors.name ? ([classes.inputError] as never) : ([classes.formInput] as never)
            }
            {...register("name", {
              required: {
                value: true,
                message: t("pages.foundFormPage.foundForm.errorsMsg.name")
              },
              minLength: 2
            })}
          />
          {errors.name && <p className={classes.formErrorMsg}>{`${errors.name?.message}`}</p>}
        </label>

        <label htmlFor="phoneNO" className={classes.formLabel}>
          {t("pages.foundFormPage.foundForm.labels.phone_number")}
          <input
            type="tel"
            id="phoneNO"
            placeholder={t("pages.foundFormPage.foundForm.placeholders.phone_number")}
            className={
              errors.phone_number ? ([classes.inputError] as never) : ([classes.formInput] as never)
            }
            {...register("phone_number", {
              required: {
                value: true,
                message: t("pages.foundFormPage.foundForm.errorsMsg.phone_number.required")
              },
              pattern: {
                value: /^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/,
                message: t("pages.foundFormPage.foundForm.errorsMsg.phone_number.inValid")
              }
            })}
          />
          {errors.phone_number && (
            <p className={classes.formErrorMsg}>{`${errors.phone_number?.message}`}</p>
          )}
        </label>

        <label htmlFor="email" className={classes.formLabel}>
          {t("pages.foundFormPage.foundForm.labels.email")}
          <input
            type="email"
            id="email"
            placeholder={t("pages.foundFormPage.foundForm.placeholders.email")}
            className={
              errors.email ? ([classes.inputError] as never) : ([classes.formInput] as never)
            }
            {...register("email", {
              required: {
                value: true,
                message: t("pages.foundFormPage.foundForm.errorsMsg.email.required")
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("pages.foundFormPage.foundForm.errorsMsg.email.inValid")
              }
            })}
          />
          {errors.email && <p className={classes.formErrorMsg}>{`${errors.email?.message}`}</p>}
        </label>

        <label htmlFor="location" className={classes.formLabel}>
          {t("pages.foundFormPage.foundForm.labels.location")}
          <input
            type="text"
            id="location"
            placeholder={t("pages.foundFormPage.foundForm.placeholders.location")}
            className={
              errors.address ? ([classes.inputError] as never) : ([classes.formInput] as never)
            }
            {...register("address", {
              required: {
                value: true,
                message: t("pages.foundFormPage.foundForm.errorsMsg.location")
              },
              minLength: 6
            })}
          />
          {errors.address && <p className={classes.formErrorMsg}>{`${errors.address?.message}`}</p>}
        </label>

        <label htmlFor="textArea" className={classes.formLabel}>
          {t("pages.foundFormPage.foundForm.labels.description")}
          <textarea
            name="message"
            id="textArea"
            placeholder={t("pages.foundFormPage.foundForm.placeholders.description")}
            className={
              errors.description
                ? ([classes.errorformTextArea] as never)
                : ([classes.formTextArea] as never)
            }
            {...register("description", {
              required: {
                value: true,
                message: t("pages.foundFormPage.foundForm.errorsMsg.description.required")
              },
              minLength: {
                value: 30,
                message: t("pages.foundFormPage.foundForm.errorsMsg.description.minLength")
              }
            })}
          ></textarea>
          {errors.description && (
            <p className={classes.formErrorMsg}>{`${errors.description?.message}`}</p>
          )}
        </label>

        <div className={classes.fileArea} onDrop={handleDrop} onDragOver={handleDragOver}>
          <label htmlFor="file" className={classes.fileAreaLabel}>
            <UploadIcon width="72" height="61" />
            <span className={classes.dragDropFileText}>
              {t("pages.foundFormPage.foundForm.labels.file.title.main")}{" "}
              <span>{t("pages.foundFormPage.foundForm.labels.file.title.browse")}</span>
            </span>
            <span className={classes.formatsText}>
              {t("pages.foundFormPage.foundForm.labels.file.supportFormat")} JPEG, JPG, PNG
            </span>
            <input
              id="file"
              type="file"
              className={classes.uploadInput}
              onChange={(e) => handleChange(e.target.files)}
            />
          </label>

          <div className={classes.imageWrapperMobile}>
            {image ? <img className={classes.imageMobile} src={image} alt="image" /> : null}
          </div>

          <span className={classes.fileName}>
            {fileName}
            <span className={classes.fileNameDeleteIcon} onClick={handleDelete}>
              <DeleteIcon />
            </span>
          </span>
        </div>

        <CustomButton
          className={classes.submitButton}
          title={t("pages.foundFormPage.foundForm.sendButton")}
          type="submit"
        />

        {foundFormState.loading && <CircularProgress />}
        {foundFormState.error.message && (
          <Alert severity="error">{foundFormState.error.message}</Alert>
        )}

        <div className="">
          <Link to="https://t.me/cat-guardians" className={classes.tgLink}>
            {t("pages.foundFormPage.foundForm.addSubmitWay")}
            <TgIcon width="38" height="38" />
          </Link>
        </div>
      </form>

      <div className={classes.imageWrapper}>
        {image ? (
          <img className={classes.image} src={image} alt="image" />
        ) : (
          <ImageIcon width="200" height="200" />
        )}
      </div>
      {foundData?.status === StatusCode.CREATED && (
        <OverlayModal
          text={t("pages.foundFormPage.overlayModal.successSubmit.text")}
          title={t("pages.foundFormPage.overlayModal.successSubmit.title")}
          buttonTitle={t("pages.foundFormPage.overlayModal.successSubmit.buttonTitle")}
          to={ROUTES.ROOT}
          handleClose={onHandleClose}
        />
      )}
    </div>
  );
};
export default FoundForm;
