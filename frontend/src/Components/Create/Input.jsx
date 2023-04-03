import React from 'react'

const Input = ({ inputType, title, placeholder, handleclick }) => {
  return (
    <div className="mt-10 w-full">
      <p className="font-semibold text-xl text-white">{title}</p>

      {inputType === 'textarea' ? (
        <textarea
          className="bg-card-dark border rounded-lg w-full outline-none text-white text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleclick}
          rows={10}
          required
        />
      ) : (
        <input
          className="bg-card-dark border rounded-lg w-full outline-none text-white text-base mt-4 px-4 py-3"
          placeholder={placeholder}
          onChange={handleclick}
          type={inputType}
          required
        />
      )}
    </div>
  )
}

export default Input
