import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomButton from "src/components/buttons/CustomButton";
import UploadIcon from "src/components/icons/UploadIcon";
import { updatePetById } from "src/pages/petsList/store/actions";

import { useStyles } from "./editPets.styles";

const EditPets = ({ pet, onClose }) => {
  const { classes } = useStyles();
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const handleDelete = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleChange = (files: FileList) => {
    const newImagesArray = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      file
    }));
    setNewImages((prevImages) => [...prevImages, ...newImagesArray]);
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

    newImages.forEach(({ file }) => {
      formData.append("photos", file);
    });

    if (pet) {
      const payload = {
        petId: pet.id,
        petData: formData
      };
      dispatch(updatePetById.request(payload));

      onClose();
    }
  };

  useEffect(() => {
    if (pet) {
      reset({
        name: pet.name,
        gender: pet.gender,
        birth_date: pet.birth_date,
        color: pet.color,
        breed: pet.breed,
        bio: pet.bio,
        requirements_for_owner: pet.requirements_for_owner,
        preferences: pet.preferences,
        aversions: pet.aversions,
        photos: pet.photos
      });

      if (pet.photos && pet.photos.length > 0) {
        setExistingImages(pet.photos);
      }
    }
  }, [pet, reset]);

  return (
    <div>
      <div className={classes.editFormContainer}>
        <div className={classes.editFormHeader}>
          <h2 className={classes.title}>Edit</h2>
          <CustomButton title="Close" className={classes.closeBtn} handleClick={onClose} />
        </div>
        <form action="" className={classes.editForm} onSubmit={handleSubmit(onSubmit)}>
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
          <div className={classes.existingImagesWrapper}>
            <span className={classes.formLabel}>Photos</span>
            <div className={classes.imageWrapper}>
              {existingImages.map((img, index) => (
                <div key={img} className={classes.imgContainer}>
                  <img className={classes.img} src={img} alt={`image-${index}`} />
                </div>
              ))}
            </div>
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
              {newImages.map((img, index) => (
                <div key={img} className={classes.imgContainer}>
                  <img className={classes.img} src={img.url} alt={`image-${index}`} />
                  <span className={classes.deleteIcon} onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>
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
          <div>
            <CustomButton title="Save" className={classes.saveBtn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPets;
