import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import image1 from "src/assets/donation-cat.png";
import CustomButton from "src/components/buttons/CustomButton";
import CustomLinkButton from "src/components/buttons/CustomLinkButton";
import { amounts } from "src/constants/donate-config/amounts";
import { Currencies } from "src/constants/donate-config/currencies";
import { getCurrencySymbol } from "src/constants/donate-config/getCurrencySymbol";
import { paymentMethods } from "src/constants/donate-config/paymentMethods";
import { PaymentTypes } from "src/constants/donate-config/paymentTypes";
import { FieldsProps } from "src/pages/adoption/lib/fieldsProps";

import { useStyles } from "./donationForm.styles";

const DonationForm: React.FC<FieldsProps> = ({ t }) => {
  const { classes } = useStyles();

  const [currency, setCurrency] = useState(Currencies.UAH);
  const [customAmount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const methods = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods;

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const onSubmit = () => {
    window.open(
      `https://send.monobank.ua/jar/8t1EEaf2So?a=${customAmount}&t=${comment}`,
      "_blank",
      "noopener,noreferrer"
    );
    methods.reset({
      paymentType: PaymentTypes.OneTime,
      currency: Currencies.UAH,
      amount: "",
      comment: "",
      paymentMethod: "",
      terms: false
    });
  };

  return (
    <FormProvider {...methods}>
      <div className={classes.sectionDonationBox}>
        <div className={classes.paymentsWrapper}>
          <div className={classes.paymentsTime}>
            <Controller
              control={control}
              name="paymentType"
              defaultValue={PaymentTypes.OneTime}
              render={({ field }) => (
                <RadioGroup
                  row
                  value={field.value}
                  onChange={field.onChange}
                  className={classes.paymentsRadioGroup}
                >
                  {Object.values(PaymentTypes).map((type) => (
                    <FormControlLabel
                      key={type}
                      value={type}
                      className={classes.customRadioIcon}
                      control={<Radio />}
                      label={t(`pages.donationForm.form.paymentPeriod.${type}`)}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </div>
          <div className={classes.horizontalLine}></div>
          <div className={classes.currencySection}>
            <div className={classes.currencyList}>
              <Controller
                control={control}
                name="currency"
                defaultValue={Currencies.UAH}
                render={({ field }) => (
                  <RadioGroup
                    row
                    value={field.value}
                    onChange={field.onChange}
                    className={classes.currencyRadioGroup}
                  >
                    {Object.values(Currencies).map((item) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={<Radio />}
                        label={item}
                        className={classes.customRadioIcon}
                        onClick={handleCurrencyChange}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
            <div className={classes.amountWrapper}>
              <Controller
                name="amount"
                defaultValue=""
                control={methods.control}
                rules={{ pattern: /^\d+$/ }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      setAmount(e.target.value);
                    }}
                  >
                    <div className={classes.buttonContainer}>
                      {amounts.map((amount) => (
                        <FormControlLabel
                          className={`${classes.linksSecondary} ${
                            field.value === amount ? classes.activeButton : ""
                          }`}
                          key={amount}
                          label={`${amount} ${getCurrencySymbol(currency)}`}
                          value={amount}
                          control={<Radio className={classes.customRadio} />}
                        />
                      ))}
                    </div>
                    <div className={classes.textFieldBox}>
                      <TextField
                        type="text"
                        placeholder={t("pages.donationForm.form.customAmount.placeholder")}
                        className={classes.inputCustomAmount}
                        {...field}
                        variant="standard"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setAmount(e.target.value);
                        }}
                        InputProps={{ disableUnderline: true }}
                      />
                      {errors.amount && (
                        <p className={classes.errorMessage}>
                          {t("pages.donationForm.form.customAmount.errorMsg")}
                        </p>
                      )}
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
            <p className={classes.commentHeader}>{t("pages.donationForm.form.comment.label")}</p>
            <div className={classes.inputComment}>
              <Controller
                defaultValue={""}
                name="comment"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="text"
                    placeholder={t("pages.donationForm.form.comment.placeholders")}
                    {...field}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onChange={(e) => {
                      field.onChange(e);
                      setComment(e.target.value);
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.horizontalLine}></div>
          <div className={classes.paymentMethodTitleWrapper}>
            <h5 className={classes.paymentMethodTitle}>
              {t("pages.donationForm.form.paymentMethod")}
            </h5>
          </div>
          <div className={classes.paymentMethodContainer}>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <div>
                  <RadioGroup {...field} value={field.value || ""} row>
                    {paymentMethods.map((method) => (
                      <FormControlLabel
                        key={method.value}
                        label={
                          <div
                            className={`${classes.gridItem} ${
                              field.value === method.value ? classes.gridItemIsActive : ""
                            }`}
                          >
                            <img src={method.image} alt="" />
                          </div>
                        }
                        value={method.value}
                        control={<Radio className={classes.customRadio} />}
                      />
                    ))}
                  </RadioGroup>
                </div>
              )}
            />
          </div>
          <div className={classes.termsWrapper}>
            <Controller
              control={control}
              name="terms"
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox className={classes.checkbox} />}
                  label={
                    <p className={classes.termsParagraph}>
                      {t("pages.donationForm.form.terms.main")}{" "}
                      <CustomLinkButton
                        to="#"
                        className={classes.linkTerms}
                        title={t("pages.donationForm.form.terms.link")}
                      />
                    </p>
                  }
                  {...field}
                  checked={field.value}
                />
              )}
              rules={{ required: true }}
            />
          </div>
          <CustomButton
            handleClick={handleSubmit(onSubmit)}
            type="submit"
            className={classes.linksPrimary}
            to=""
            title={t("pages.donationForm.form.buttonTitle")}
          />
        </div>
        <div className={classes.imgBox}>
          <img className={classes.image} src={image1} alt="" />
        </div>
      </div>
    </FormProvider>
  );
};

export default DonationForm;
