import React, { useEffect } from 'react';
// @import dependencies
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
// @import components
import Button from 'components/button';
import Select from 'components/dropdown';
import InputField from 'components/inputField';
import RadioButtonGroup from 'components/radioButton';

const generateValidationSchema = fields => {
  const schema = fields?.reduce((acc, field) => {
    acc[field.name] = field?.validation || yup.string();
    return acc;
  }, {});
  return yup.object(schema).required();
};

const Fields = ({ item, register, errors, disable }) => {
  if (item.type === 'select') {
    return (
      <Select
        key={item?.name}
        name={item?.name}
        label={item?.label}
        register={register}
        disable={disable}
        options={item?.options}
        error={errors[item?.name]?.message}
        className={item?.className}
      />
    );
  }

  if (item.type === 'radio') {
    return (
      <RadioButtonGroup
        key={item?.name}
        name={item?.name}
        label={item?.label}
        disable={disable}
        register={register}
        options={item?.options}
        error={errors[item?.name]?.message}
        className={item?.className}
      />
    );
  }
  return (
    <>
      <InputField
        type={item?.type}
        name={item?.name}
        icon={item?.icon}
        alphabet={item?.alphabet}
        alphanumeric={item?.alphanumeric}
        label={item?.label}
        maxLength={item?.maxLength}
        register={register}
        error={errors[item?.name]?.message}
        className={item?.className}
        disable={disable}
        placeholder={item.placeholder}
      />
      {item?.forgotPassword && (
        <Link
          to='/auth/forget-password'
          className='mt-[-12px] block  cursor-pointer text-end text-[14px] font-medium text-[#25AF5E]'
        >
          Forget Password
        </Link>
      )}

      {item?.backLogin && (
        <Link
          to='/auth/login'
          className='mr-1 mt-[-12px] block cursor-pointer text-end text-[14px] font-medium text-[#25AF5E]'
        >
          Login
        </Link>
      )}
    </>
  );
};

const DynamicForm = ({
  isEdit,
  onSubmit,
  column = 1,
  buttonTitle,
  btnfullWidth = false,
  btnloader = false,
  formData = [],
  initialValues = null,
}) => {
  const location = useLocation();

  const { submittingStatus } = useSelector(state => state.loader);

  const data = isEdit ? formData?.filter(x => x?.isEdit) : formData;
  const validationSchema = generateValidationSchema(data);

  const defaultValues = location.pathname.includes('add')
    ? null
    : initialValues;

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach(key => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues, setValue]);

  const handleFormSubmit = data => {
    onSubmit(data);
  };

  useEffect(() => {
    if (submittingStatus === 'submitted') {
      reset();
    }
  }, [submittingStatus]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={column > 1 ? 'flex flex-wrap gap-x-10' : ''}
    >
      {data?.map(item => (
        <Fields
          item={item}
          errors={errors}
          key={item.name}
          register={register}
          disable={
            (isEdit && item?.editDisable) || (!isEdit && item?.addDisable)
          }
        />
      ))}

      <Button
        type='submit'
        title={defaultValues === null ? buttonTitle : 'Update'}
        variant={'success'}
        disabled={btnloader}
        className={
          column > 1
            ? 'mr-[65%] mt-2  xs:w-full md:w-3/5 lg:w-[35%]'
            : `mt-10 xs:w-full ${btnfullWidth ? 'w-full' : 'md:w-[35%]'}`
        }
      />
    </form>
  );
};

export default DynamicForm;
