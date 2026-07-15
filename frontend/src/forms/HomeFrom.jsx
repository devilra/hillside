import React, { useState } from 'react';
import API_URL from '../app';

const HomeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    landSize: '',
    unitSize: 'Sq.Ft',
    houseOption: '',
    landType: [],
    landscape: [],
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (category, value) => {
    setFormData(prev => {
      const currentList = prev[category];
      const newList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [category]: newList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.requirements.trim()) {
      alert("Name, phone, and requirements are required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/api/leads/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: '',
          phone: '',
          landSize: '',
          unitSize: 'Sq.Ft',
          houseOption: '',
          landType: [],
          landscape: [],
          requirements: ''
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.message || "Failed to submit request.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Unable to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row 1: Name and Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#7fff00] font-bold text-sm mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none placeholder-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-[#7fff00] font-bold text-sm mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="tel"
                name="phone"
                placeholder="Enter Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-3 pr-10 py-2 bg-white text-gray-800 rounded-md focus:outline-none placeholder-gray-400 text-sm"
              />
              <span className="absolute right-3 text-lg pointer-events-none">🇮🇳</span>
            </div>
          </div>
        </div>

        {/* Row 2: Land Size and Unit Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#7fff00] font-bold text-sm mb-1">Land Size</label>
            <input
              type="text"
              name="landSize"
              placeholder="Enter the size of a Land"
              value={formData.landSize}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none placeholder-gray-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-[#7fff00] font-bold text-sm mb-1">Unit Size</label>
            <select
              name="unitSize"
              value={formData.unitSize}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none text-sm appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%234a5568%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-[right_0.75rem_center] bg-no-repeat"
            >
              <option value="Sq.Ft">Sq.Ft</option>
              <option value="Acres">Acres</option>
              <option value="Cents">Cents</option>
            </select>
          </div>
        </div>

        {/* Row 3: With House / Without House Options */}
        <div className="flex gap-6 pt-1">
          <label className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="houseOption"
              value="With House"
              checked={formData.houseOption === 'With House'}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7fff00] cursor-pointer"
            />
            <span>With House</span>
          </label>
          <label className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
            <input
              type="radio"
              name="houseOption"
              value="Without House"
              checked={formData.houseOption === 'Without House'}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7fff00] cursor-pointer"
            />
            <span>Without House</span>
          </label>
        </div>

        {/* Row 4: Land Type */}
        <div>
          <label className="block text-[#7fff00] font-bold text-sm mb-2">Land Type</label>
          <div className="flex flex-wrap gap-4">
            {['Farm Land', 'Commercial Land', 'Residential Land'].map((type) => (
              <label key={type} className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.landType.includes(type)}
                  onChange={() => handleCheckboxChange('landType', type)}
                  className="w-4 h-4 rounded accent-[#7fff00] cursor-pointer"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 5: Landscape */}
        <div>
          <label className="block text-[#7fff00] font-bold text-sm mb-2">Landscape</label>
          <div className="flex flex-wrap gap-3">
            {['Plain Lands', 'Step Lands', 'Stream Lands', 'Peak Lands'].map((item) => (
              <label key={item} className="flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.landscape.includes(item)}
                  onChange={() => handleCheckboxChange('landscape', item)}
                  className="w-4 h-4 rounded accent-[#7fff00] cursor-pointer"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Row 6: Custom Requirements */}
        <div>
          <label className="block text-[#7fff00] font-bold text-sm mb-1">
            Tell Us About Your Dream Land Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            name="requirements"
            rows="4"
            placeholder="Send us your custom property requirements.."
            value={formData.requirements}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-white text-gray-800 rounded-md focus:outline-none placeholder-gray-400 text-sm resize-none"
          ></textarea>
        </div>

        {/* Status Alerts */}
        {submitStatus === "success" && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs rounded-md p-2.5 text-center font-medium">
            ✔ Your property requirements have been submitted! We will contact you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-xs rounded-md p-2.5 text-center font-medium">
            ⚠ {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 bg-[#7fff00] hover:bg-[#66cd00] text-black font-bold rounded-md shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeForm;