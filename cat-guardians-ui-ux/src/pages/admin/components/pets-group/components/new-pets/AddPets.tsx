import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import UploadIcon from "src/components/icons/UploadIcon";
import { createNewPets } from "src/pages/petsList/store/actions";

import { useStyles } from "./addPets.styles";

const AddPets = ({ onClose, currentPage }) => {
  const { classes } = useStyles();
  const [photos, setPhotos] = useState([]);
  const [fileError, setFileError] = useState("");

  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const handleDelete = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleChange = (files: FileList) => {
    const newPhotosArray = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file
    }));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotosArray]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      handleChange(event.dataTransfer.files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    if (!photos.length) {
      setFileError("Please select file");
      return;
    }
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);
    formData.append("color", data.color);
    formData.append("breed", data.breed);
    formData.append("bio", data.bio);
    formData.append("requirements_for_owner", data.requirements_for_owner);
    formData.append("preferences", data.preferences);
    formData.append("aversions", data.aversions);

    photos.forEach(({ file }) => {
      formData.append("photos", file);
    });

    const payload = { formData, currentPage };

    dispatch(createNewPets.request(payload));

    onClose();
    reset();
  };

  return (
    <div>
      <div className={classes.addFormContainer}>
        <div className={classes.addFormHeader}>
          <CustomButton title="Close" className={classes.closeBtn} handleClick={onClose} />
        </div>
        <form action="" className={classes.addForm} onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className={classes.formLabel}>
            Name
            <input id="name" type="text" className={classes.formInput} {...register("name")} />
          </label>
          <div className={classes.inputBox}>
            <label htmlFor="select-gender" className={classes.formLabel}>
              Gender:
              <select
                name="gender"
                id="select-gender"
                className={classes.formInput}
                {...register("gender")}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </label>
            <label htmlFor="birth-date" className={classes.formLabel}>
              Birth date:
              <input
                id="birth-date"
                type="date"
                name="birth-date"
                {...register("birth_date")}
                className={classes.formInput}
              />
            </label>
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="color" className={classes.formLabel}>
              Color:
              <select name="color" id="color" {...register("color")} className={classes.formInput}>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Tabby">Tabby</option>
                <option value="Orange">Orange</option>
                <option value="Gray">Gray</option>
                <option value="Calico">Calico</option>
                <option value="Tortoiseshell">Tortoiseshell</option>
                <option value="Blue">Blue</option>
                <option value="Pointed">Pointed</option>
              </select>
            </label>
            <label htmlFor="breed" className={classes.formLabel}>
              Breed:
              <select name="breed" id="breed" {...register("breed")} className={classes.formInput}>
                <option value="Mixed-Breed">Mixed-Breed</option>
                <option value="Mongrel">Mongrel</option>
                <option value="Siamese">Siamese</option>
                <option value="Persian">Persian</option>
                <option value="Maine Coon">Maine Coon</option>
                <option value="Sphynx">Sphynx</option>
                <option value="Bengal">Bengal</option>
                <option value="Ragdoll">Ragdoll</option>
                <option value="British">British</option>
                <option value="British Shorthair">British Shorthair</option>
              </select>
            </label>
          </div>
          <div className={classes.fileArea} onDrop={handleDrop} onDragOver={handleDragOver}>
            <label htmlFor="file" className={classes.fileAreaLabel}>
              <UploadIcon width="72" height="61" />
              <span className={classes.dragDropFileText}>
                Drag & drop files or <span>Browse</span>
              </span>
              <span className={classes.formatsText}>Supported formats JPEG, JPG, PNG</span>
              <input
                id="file"
                type="file"
                className={classes.uploadInput}
                onChange={(e) => handleChange(e.target.files)}
                multiple
              />
            </label>
            <div className={classes.imageWrapper}>
              {photos.map((img, index) => (
                <div key={img} className={classes.imgContainer}>
                  <img className={classes.img} src={img.url} alt={`image-${index}`} />
                  <span className={classes.deleteIcon} onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>
            {fileError && <p className={classes.formErrorMsg}>{fileError}</p>}
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="bio" className={classes.textAreaLabel}>
              Bio:
              <textarea
                name="bio"
                id="bio"
                {...register("bio")}
                className={classes.formTextArea}
              ></textarea>
            </label>
            <label htmlFor="requirements" className={classes.textAreaLabel}>
              Requirements for owner:
              <textarea
                name="requirements"
                id="requirements"
                {...register("requirements_for_owner")}
                className={classes.formTextArea}
              ></textarea>
            </label>
          </div>
          <div className={classes.inputBox}>
            <label htmlFor="preferences" className={classes.textAreaLabel}>
              Preferences:
              <textarea
                name="preferences"
                id="preferences"
                {...register("preferences")}
                className={classes.formTextArea}
              ></textarea>
            </label>
            <label htmlFor="aversions" className={classes.textAreaLabel}>
              Aversions:
              <textarea
                name="aversions"
                id="aversions"
                {...register("aversions")}
                className={classes.formTextArea}
              ></textarea>
            </label>
          </div>
          <div>
            <CustomButton title="Create" className={classes.createBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPets;
