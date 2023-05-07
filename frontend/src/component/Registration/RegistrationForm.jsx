import React, { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "yup-phone-lite";
import { yupResolver } from '@hookform/resolvers/yup';
import { Country, State, City } from "country-state-city";
import * as yup from "yup";
import { religion } from '../../utilities/religionList';
import parse from "date-fns/parse";
import { maritalStatus } from '../../utilities/maritalStatus';
import { bloodGroup } from '../../utilities/bloodGroupList';
import axios from "axios";
import "./Registration.css"

const aadharRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
const panRegex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

const schema = yup.object({
  name: yup.string().required(),
  dob: yup.string().required(),
  sex: yup.string().required(),
  phone: yup.string().phone("IN", "Please enter a valid phone number"),
  govIDAadharNum: yup.string().matches(aadharRegex, 'Aadhar Card number is not valid').notRequired(),
  govIDPanNo: yup.string().matches(panRegex, 'PAN Card number is not valid').notRequired(),
  eCNum: yup.string().phone("IN", "Please enter a valid phone number"),
});

function RegistrationForm() {

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  /*
   * method @submitForm for submit registration form data
   */

  const submitForm = (data) => {
    console.log("data", data?.state?.name)
    const body = {
      name: data?.name,
      age: data?.dob,
      sex: data?.sex,
      mobile: data?.phone,
      email: data?.email,
      addr: data?.addr,
      pincode: data?.pincode,
      occupation: data?.occupation,
      religion: data?.religion,
      maritalStatus: data?.maritalStatus,
      city: data?.city?.name,
      country: data?.country?.name,
      state: data?.state?.name,
      emergency: data?.eCNum,
      idType: data?.govtId,
      idNumber: data?.govIDAadharNum ? data?.govIDAadharNum : data?.govIDPanNo,
      guardianName: data?.gaurdType,
      addr: data?.address,
      bloodGroup: data?.blood_group,
      nationality: data?.nationality?.name
    }
    axios
      .post(
        "http://localhost:5000/submit",
        body
      ).then((res) => {
        alert(res?.data?.message)
      }).catch((err) => {
        console.log(err)
      })
  }

  const watchAll = watch();

  return (
    <form className='container' onSubmit={handleSubmit(submitForm)}>
      <div className='mt-4'>

        <u className='h5'>Personal Details</u>
        <div className="row g-3 align-items-center">
          <div className='col-md-5'>
            <div className='row'>
              <div className="col-auto">
                <label htmlFor="name" className="">Name<sup className='text-danger'>*</sup></label>
              </div>
              <div className="col">
                <input type="text" {...register("name")} id="name" className="form-control" />
                <p className='text-danger'>{errors.name?.message}</p>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className="row">
              <div className='col-md-8'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="dob" className="">Date of Birth or Age<sup className='text-danger'>*</sup></label>
                  </div>
                  <div className="col">
                    <input type="text" {...register("dob")} id="dob" className="form-control" placeholder="DD/MM/YYYY or Age in Years" />
                    <p className='text-danger'>{errors.dob?.message}</p>

                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="sex" className="">Sex<sup className='text-danger'>*</sup></label>
                  </div>
                  <div className="col">
                    <select {...register("sex")} id="sex" className="form-control">
                      <option value="">Enter Sex</option>
                      <option value="male">Male</option>
                      <option value="women">Women</option>
                      <option value="trans">Trans</option>
                    </select>
                    <p className='text-danger'>{errors.sex?.message}</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 align-items-center">
          <div className='col-md-5'>
            <div className='row'>
              <div className="col-auto">
                <label htmlFor="phone" className="">Phone</label>
              </div>
              <div className="col">
                <input type="text" {...register("phone")} id="phone" maxLength={10} className="form-control" />
                <p className='text-danger'>{errors.phone?.message}</p>

              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className="row">
              <div className='col-md-12'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="govtId" className="">Govt Issued ID</label>
                  </div>
                  <div className="col">
                    <select {...register("govtId")} className="form-control">
                      <option value="">ID Type</option>
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                    </select>
                  </div>
                  <div className="col">
                    {watchAll?.govtId == "aadhar" && <input type="text" {...register("govIDAadharNum")} className="form-control" />}
                    {watchAll?.govtId == "pan" && <input type="text" {...register("govIDPanNo")} className="form-control" />}
                    {/* <input type="text" {...register(govIDType === "aadhar_card" ? "govIDAadharNum" : "govIDPanNo")} id="govIDNum" className="form-control" /> */}
                    <p className='text-danger'>{errors?.govIDAadharNum?.message}</p>
                    <p className='text-danger'>{errors?.govIDPanNo?.message}</p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>

        <u className='h5'>Contact Details</u>
        <div className="row g-3 align-items-center">
          <div className='col-md-5'>
            <div className='row'>
              <div className="col-auto">
                <label htmlFor="name" className="">Guardian Details</label>
              </div>
              <div className="col">
                <select {...register("gaurdType")} id="gaurdType" className="form-control">
                  <option value="">Enter Label</option>
                  <option value="father">Father</option>
                  <option value="relative">Relative</option>
                </select>
              </div>
              <div className="col-auto">
                <input type="text" {...register("gaurdName")} id="gaurdName" className="form-control" />
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className="row">
              <div className='col-md-8'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="email" className="">Email</label>
                  </div>
                  <div className="col">
                    <input type="text" {...register("email")} id="email" className="form-control" placeholder='Enter Email' />
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="eCNum" className="">Emergency Contact Number</label>
                  </div>
                  <div className="col">
                    <input type="text" {...register("eCNum")} id="eCNum" className="form-control" placeholder='Enter Emergency No.' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4'>

        <u className='h5'>Address Details</u>
        <div className="row g-3 align-items-center">
          <div className='col-md-5'>
            <div className='row'>
              <div className="col-auto">
                <label htmlFor="addr" className="">Address</label>
              </div>
              <div className="col-auto">
                <input type="text" {...register("address")} id="addr" className="form-control" placeholder='Address' />
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className="row">
              <div className='col-md-8'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="email" className="">State</label>
                  </div>
                  <div className="col">
                    <Controller
                      control={control}
                      name="state"
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={State?.getStatesOfCountry(watchAll?.country?.isoCode)}
                          getOptionLabel={(options) => {
                            return options?.name;
                          }}
                          getOptionValue={(options) => {
                            return options?.name;
                          }}
                        />
                      )}
                    />

                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className="row">
                  <div className="col-auto">
                    <label htmlFor="eCNum" className="">City</label>
                  </div>
                  <div className="col">

                    <Controller
                      control={control}
                      name="city"
                      // onChange={item=>{
                      //   setSelectedCountry(item)
                      // }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={City.getCitiesOfState(
                            watchAll?.state?.countryCode,
                            watchAll?.state?.isoCode
                          )}
                          getOptionLabel={(options) => {
                            return options?.name;
                          }}
                          getOptionValue={(options) => {
                            return options?.name;
                          }}
                        />
                      )}
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 g-3 align-items-center">
          <div className="col-md-5">
            <div className="row">
              <div className="col-auto">
                <label htmlFor="email" className="">Country</label>
              </div>
              <div className="col">
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={Country.getAllCountries()}
                      getOptionLabel={(options) => {
                        return options?.name;
                      }}
                      getOptionValue={(options) => {
                        return options?.name;
                      }}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-auto">
                <label htmlFor="pincode" className="">Pincode</label>
              </div>
              <div className="col">
                <input type='text' {...register("pincode")} id='pincode' className='form-control' placeholder='Enter pincode' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <u className='h5'>Other Details</u>
        <div className="row g-3 align-items-center">
          <div className='col'>
            <div className='row'>
              <div className="col-auto">
                <label htmlFor="occupation" className="">Occupation</label>
              </div>
              <div className="col-auto">
                <input type="text" {...register("occupation")} id="occupation" className="form-control" placeholder='Address' />
              </div>
            </div>
          </div>
          <div className='col'>
            <div className="row">
              <div className="col-auto">
                <label htmlFor="religion" className="">Religion</label>
              </div>
              <div className="col">
                <select {...register("religion")} className="form-control">
                  <option value="">--select religion--</option>
                  {
                    religion?.map(value => (
                      <option value={value}>{value}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className="row">
              <div className="col-auto">
                <label htmlFor="eCNum" className="">Marital Status</label>
              </div>
              <div className="col">
                <select {...register("marital_status")} className='form-control'>
                  <option value="">Enter Marital Status</option>
                  {
                    maritalStatus?.map(value => (
                      <option value={value}>{value}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className="row">
              <div className="col-auto">
                <label htmlFor="bloodGroup" className="">Blood Group</label>
              </div>
              <div className="col">
                <select {...register("blood_group")} className='form-control'>
                  <option value="">Group</option>
                  {bloodGroup?.map(value => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>
        <div className="row">
          <div className='col-3'>
            <div className="row">
              <div className="col-auto">
                <label htmlFor="nationality" className="">Nationality</label>
              </div>
              <div className="col">
                <Controller
                  control={control}
                  name="nationality"
                  render={({ field }) => (
                    <Select
                      options={Country.getAllCountries()}
                      {...field}
                      getOptionLabel={(options) => {
                        return options?.name;
                      }}
                      getOptionValue={(options) => {
                        return options?.name;
                      }}
                    />)}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="d-flex justify-content-end">
        <button className='btn border-danger text-danger mx-4'>CANCEL</button>
        <button className='btn border-success text-success' type='submit'>SUBMIT</button>
      </div>
    </form>
  )
}

export default RegistrationForm