"use client";

import React, { useState } from 'react';
import Select from 'react-select';

const AddPropertyForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    pricePerMonth: '',
    cleaningFee: '',
    serviceFee: '',
    bedrooms: '',
    bathrooms: '',
    beds: '',
    squareFeet: '',
    amenities: '',
    petsAllowed: false,
    petFeeType: '', // 'oneTime', 'monthly', or 'nightly'
    petFeeAmount: '',
    petMonthlyFee: '',
    petNightlyFee: ''
  });
  const COUNTRIES = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
    "Italy",
    "Spain",
    "Netherlands",
    "Switzerland",
    "Sweden",
    // Add more countries as needed
  ];

  const AMENITIES = [
  { value: 'wifi', label: 'Wi-Fi' },
  { value: 'parking', label: 'Free Parking' },
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'gym', label: 'Gym' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'heating', label: 'Heating' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'tv', label: 'TV' },
  { value: 'washer', label: 'Washer' },
  { value: 'dryer', label: 'Dryer' },
  { value: 'workspace', label: 'Dedicated Workspace' },
  { value: 'hot_tub', label: 'Hot Tub' },
  { value: 'bbq', label: 'BBQ Grill' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'fireplace', label: 'Fireplace' },
];

  const [errors, setErrors] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
const handlePetFeeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      petFeeType: type
    }));
  };
  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Reset previous errors
      setErrors(prev => ({ ...prev, mainImage: '' }));
      
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors(prev => ({ ...prev, mainImage: 'Please select an image file (JPEG, PNG, GIF)' }));
        return;
      }
      
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, mainImage: 'Image must be less than 10MB' }));
        return;
      }
      
      setMainImage(file);
    } else {
      setErrors(prev => ({ ...prev, mainImage: 'Please select an image' }));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => {
        // Validate each file
        if (!file.type.match('image.*')) {
          alert(`Skipped: ${file.name} - Not an image file`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert(`Skipped: ${file.name} - Exceeds 10MB limit`);
          return false;
        }
        return true;
      });
      
      setAdditionalImages([...additionalImages, ...validFiles]);
    }
  };

  const removeAdditionalImage = (index) => {
    const updatedImages = [...additionalImages];
    updatedImages.splice(index, 1);
    setAdditionalImages(updatedImages);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'title', 'city', 'state', 'country', 'zipCode', 
      'pricePerMonth', 'bedrooms', 'amenities',
      'bathrooms', 'beds'
    ];

    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    // Validate numbers
    const numberFields = ['pricePerMonth', 'bedrooms', 'bathrooms', 'beds'];
    numberFields.forEach(field => {
      if (formData[field] && isNaN(formData[field])) {
        newErrors[field] = 'Must be a valid number';
      }
    });

    // Check main image
    if (!mainImage) {
      newErrors.mainImage = 'Main image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Prepare form data for submission
    const submissionData = {
      ...formData,
      mainImage: mainImage ? mainImage.name : null,
      additionalImages: additionalImages.map(img => img.name)
    };
    
    console.log('Form submission data:', submissionData);
    
    // Here you would normally send to your API
    // For now, we'll just simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted successfully!\nCheck console for data.');
    }, 1500);
  };

  const RequiredIndicator = () => (
    <span className="text-red-500">*</span>
  );
  const handleNumericInput = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    e.target.value = numericValue;
  };
  return (
    <div className="customer max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Property</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 border border-slate-200 rounded-xs p-6">
        {/* Basic Information Section */}
        <div className="block">
          <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Title<RequiredIndicator />
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
                placeholder="Beautiful Beachfront Villa"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full h-[110px] px-3 py-2 border border-[#cccccc] rounded-lg focus:outline-hidden focus:border-black"
                placeholder="Describe your property in detail..."
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="block">
          <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Location Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#cccccc] rounded-lg focus:outline-hidden focus:border-black "
                placeholder="123 Main Street"
              />
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                City<RequiredIndicator />
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.city ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
                placeholder="Miami"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                State<RequiredIndicator />
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.state ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
                placeholder="Florida"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state}</p>
              )}
            </div>
            
            <div className="w-full">
              <label className="block text-base font-medium text-black mb-1">
                Country<RequiredIndicator />
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                    errors.country ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc]'
                  } bg-white pr-8 cursor-pointer`}
                >
                  <option value="" className="text-gray-400">Select a country</option>
                  {COUNTRIES.map((country) => (
                    <option 
                      key={country} 
                      value={country}
                      className="cursor-pointer hover:bg-gray-100 text-black"
                    >
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Zip Code<RequiredIndicator />
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.zipCode ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
                placeholder="33139"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="block">
          <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Pricing Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Price Per Month<RequiredIndicator />
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                    onInput={handleNumericInput}
                  name="pricePerMonth"
                  value={formData.pricePerMonth}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full pl-7 pr-12 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                    errors.pricePerMonth ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.pricePerMonth && (
                <p className="mt-1 text-sm text-red-600">{errors.pricePerMonth}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Cleaning Fee
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                    onInput={handleNumericInput}
                  name="cleaningFee"
                  value={formData.cleaningFee}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full pl-7 pr-12 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                    errors.cleaningFee ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.cleaningFee && (
                <p className="mt-1 text-sm text-red-600">{errors.cleaningFee}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Service Fee
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="text"
                  onInput={handleNumericInput}
                  name="serviceFee"
                  value={formData.serviceFee}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full pl-7 pr-12 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                    errors.serviceFee ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.serviceFee && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceFee}</p>
              )}
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className="block">
          <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Property Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Bedrooms<RequiredIndicator />
              </label>
              <input
                type="text"
                onInput={handleNumericInput}
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.bedrooms ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
              />
              {errors.bedrooms && (
                <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Bathrooms<RequiredIndicator />
              </label>
              <input
                type="text"
                onInput={handleNumericInput}
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.bathrooms ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
              />
              {errors.bathrooms && (
                <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Beds<RequiredIndicator />
              </label>
              <input
                type="text"
                onInput={handleNumericInput}
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                  errors.beds ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                }`}
              />
              {errors.beds && (
                <p className="mt-1 text-sm text-red-600">{errors.beds}</p>
              )}
            </div>
            
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Square Feet
              </label>
              <div className="relative rounded-lg">
                <input
                  type="text"
                onInput={handleNumericInput}
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:border-black ${
                    errors.squareFeet ? 'border-red-500 focus:ring-red-500' : 'border-[#cccccc] '
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">sq ft</span>
                </div>
              </div>
              {errors.squareFeet && (
                <p className="mt-1 text-sm text-red-600">{errors.squareFeet}</p>
              )}
            </div>
            {/* AMENITIES */}
            <div className="w-full col-span-2">
              <label className="block text-base font-medium text-black mb-1">
                Amenities<RequiredIndicator />
              </label>
              <div className="relative">
                <Select
                    isMulti
                    name="amenities"
                    options={AMENITIES}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
              </div>
              {errors.amenities && (
                <p className="mt-1 text-sm text-red-600">{errors.amenities}</p>
              )}
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="block">
           <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Rules
          </h2>
          {/* Pet Allowed Toggle */}
          <div className="flex items-center justify-between flex-wrap">
            <label className="block text-base font-medium text-black">
              Pets Allowed?
            </label>
            <div className="flex items-center mt-1 w-full">
              <label className="flex items-center cursor-pointer mr-2 text-sm text-black">
                <input
                  type="radio"
                  name="petsAllowed"
                  checked={!formData.petsAllowed}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      petsAllowed: false,
                      petFeeType: '',
                      petFeeAmount: '',
                      petMonthlyFee: '',
                      petNightlyFee: '',
                    }))
                  }
                  className="mr-1"
                />
                No
              </label>
              <label className="flex items-center cursor-pointer ml-2 text-sm text-black">
                <input
                  type="radio"
                  name="petsAllowed"
                  checked={formData.petsAllowed}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      petsAllowed: true,
                    }))
                  }
                  className="mr-1"
                />
                Yes
              </label>
            </div>
          </div>

          {/* Pet Fee Options (shown only when petsAllowed is true) */}
          {formData.petsAllowed && (
            <div className="space-y-3 mt-2.5 pl-4 border-l-2 border-gray-200">
              <label className="block text-sm font-medium text-gray-700">
                Select Pet Fee Type:
              </label>
              
              {/* One-time Fee */}
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  id="petFeeOneTime"
                  name="petFeeType"
                  checked={formData.petFeeType === 'oneTime'}
                  onChange={() => handlePetFeeChange('oneTime')}
                  className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="petFeeOneTime" className="block cursor-pointer text-sm text-gray-700">
                  One-time Fee:
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    onInput={handleNumericInput}
                    name="petFeeAmount"
                    value={formData.petFeeAmount}
                    onChange={handleChange}
                    className="border focus:border-black focus-visible:border-black block w-full pl-7 py-2 pr-12 sm:text-sm border-slate-200 rounded-md outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    disabled={formData.petFeeType !== 'oneTime'}
                  />
                </div>
              </div>

              {/* Monthly Pet Rent */}
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  id="petFeeMonthly"
                  name="petFeeType"
                  value="monthly"
                  checked={formData.petFeeType === 'monthly'}
                  onChange={() => setFormData({...formData, petFeeType: 'monthly'})}
                  className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="petFeeMonthly" className="cursor-pointer block text-sm text-gray-700">
                  Monthly Pet Rent:
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    onInput={handleNumericInput}
                    name="petMonthlyFee"
                    value={formData.petMonthlyFee || ''}
                    onChange={(e) => setFormData({...formData, petMonthlyFee: e.target.value})}
                    className="border focus:border-black focus-visible:border-black block w-full pl-7 py-2 pr-12 sm:text-sm border-slate-200 rounded-md outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    disabled={formData.petMonthlyFee !== 'petMonthlyFee'}
                  />
                </div>
              </div>

              {/* Nightly Pet Rent */}
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  id="petFeeNightly"
                  name="petFeeType"
                  value="nightly"
                  checked={formData.petFeeType === 'nightly'}
                  onChange={() => setFormData({...formData, petFeeType: 'nightly'})}
                  className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="petFeeNightly" className="cursor-pointer block text-sm text-gray-700">
                  Nightly Pet Rent:
                </label>
                <div className="relative rounded-md">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    onInput={handleNumericInput}
                    name="petNightlyFee"
                    value={formData.petNightlyFee || ''}
                    onChange={(e) => setFormData({...formData, petNightlyFee: e.target.value})}
                    className="border focus:border-black focus-visible:border-black block w-full pl-7 py-2 pr-12 sm:text-sm border-slate-200 rounded-md outline-hidden disabled:pointer-events-none disabled:cursor-not-allowed"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    disabled={formData.petNightlyFee !== 'petNightlyFee'}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Images Section */}
        <div className="block">
          <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-200">
            Property Images
          </h2>
          
          <div className="space-y-8">
            {/* Main Image Upload */}
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Main Image<RequiredIndicator />
              </label>
              <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed focus:border-black rounded-md ${
                errors.mainImage ? 'border-red-500' : 'border-[#cccccc]'
              } focus-within:border-black`}>
                <div className="space-y-1 text-center">
                  {mainImage ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={URL.createObjectURL(mainImage)} 
                        alt="Main property" 
                        className="h-40 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setMainImage(null)}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="mainImage"
                          className="relative cursor-pointer bg-white rounded-md  font-medium text-blue-600 hover:text-blue-500 focus-within:outline-hidden"
                        >
                          <span>Upload a file</span>
                          <input
                            id="mainImage"
                            name="mainImage"
                            type="file"
                            className="sr-only"
                            onChange={handleMainImageChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.mainImage && (
                <p className="mt-1 text-sm text-red-600">{errors.mainImage}</p>
              )}
            </div>
            
            {/* Additional Images Upload */}
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Additional Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 focus:border-black focus-within:border-black border-2 border-[#cccccc] border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {additionalImages.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {additionalImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Additional ${index + 1}`} 
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="additionalImages"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-hidden"
                        >
                          <span>Upload files</span>
                          <input
                            id="additionalImages"
                            name="additionalImages"
                            type="file"
                            className="sr-only"
                            onChange={handleAdditionalImagesChange}
                            accept="image/*"
                            multiple
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </>
                  )}
                </div>
              </div>
              {additionalImages.length > 0 && (
                <div className="mt-2 flex justify-center">
                  <label
                    htmlFor="moreAdditionalImages"
                    className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add more images
                  </label>
                  <input
                    id="moreAdditionalImages"
                    name="moreAdditionalImages"
                    type="file"
                    className="sr-only"
                    onChange={handleAdditionalImagesChange}
                    accept="image/*"
                    multiple
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex sm:nowrap flex-wrap gap-4">
          <button
            type="button"
            className="px-4 py-2 cursor-pointer border border-black rounded-lg text-base font-medium text-black hover:bg-black hover:text-white focus:outline-hidden focus:bg-black focus:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 cursor-pointer border border-black bg-black text-base text-white font-medium rounded-lg hover:bg-white hover:text-black focus:outline-hidden focus:bg-white focus:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;