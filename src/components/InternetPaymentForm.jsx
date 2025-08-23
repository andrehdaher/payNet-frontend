import React from "react";

export default function InternetPaymentForm({
  landline,
  setLandline,
  selectedCompany,
  setSelectedCompany,
  selectedSpeed,
  setSelectedSpeed,
  amountToPay,
  setAmountToPay,
  calculatedAmount,
  companies,
  speeds,
  isFormValid,
  isSubmitting,
  handleSubmit,
  landNumber,
  selectCompany,
  selectSpeed,
  paymentType,
  setPaymentType, 
}) {
  return (
<div>
      <form
        className="w-full max-w-md bg-slate-700 shadow-md rounded-xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* رقم الارضي */}
        <div className="relative">
          <h1 className="text-white px-3 my-2">{landNumber}</h1>
          <input
            type="number"
            value={landline}
            onChange={(e) => setLandline(e.target.value)}
            className="peer h-12 w-full  text-white bg-transparent border-2 text-xl px-4  border-gray-300 focus:border-blue-600 rounded-xl outline-none"
            required
          />
          <label
            className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
            ${
              landline
                ? "-translate-y-6 scale-75 text-blue-600"
                : "translate-y-0 scale-100"
            }`}
          >
          </label>
        </div>
  
        {/* الشركة */}
        <div className="relative">
          <h1 className="text-white px-3 my-2">{selectCompany}</h1>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="peer h-12 w-full appearance-none text-white   text-xl px-4 bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none"
            required
          >
            <option value="" disabled hidden></option>
            {companies.map((company) => (
              <option className="bg-[#000000af]" key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <label
            className={`absolute text-sm text-gray-500  left-0 top-3 transform transition-all duration-300 
            ${
              selectedCompany
                ? "-translate-y-6 scale-75 text-blue-600"
                : "translate-y-0 scale-100"
            }`}
          >
            
          </label>
        </div>
  
        {/* السرعة */}
        {Array.isArray(speeds) && speeds.length>0 &&(
        <div className="relative">
          <h1 className="text-white px-3 my-2">{selectSpeed}</h1>
          <select
            value={selectedSpeed}
            onChange={(e) => setSelectedSpeed(e.target.value)}
            className="peer h-12 w-full appearance-none text-xl text-white bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none"
            required
          >
            <option value="" disabled hidden></option>
            {Array.isArray(speeds) && speeds.map((speed) => (
              <option className="bg-[#000000af]" key={speed} value={speed}>
                {speed}
              </option>
            ))}
          </select>
          <label
            className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
            ${
              selectedSpeed
                ? "-translate-y-6 scale-75 text-blue-600"
                : "translate-y-0 scale-100"
            }`}
          >
          </label>
        </div>
        )}
  
        {/* المبالغ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* المبلغ المراد تسديده */}
          <div className="relative">
            <h1 className="text-white px-3 my-2">المبلغ المراد تسديده</h1>
            <input
              type="number"
              value={amountToPay}
              onChange={(e) => setAmountToPay(e.target.value)}
              className="peer h-12 text-white w-full text-xl bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none"
              required
            />
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                amountToPay
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
            </label>
          </div>
  
          {/* المبلغ المطلوب */}
          <div className="relative">
            <h1 className="text-white px-3 my-2">المبلغ المطلوب</h1>
            <input
              type="number"
              value={calculatedAmount}
              readOnly
              className="peer h-12 text-white w-full text-xl  bg-transparent border-2 rounded-xl border-gray-300 focus:border-blue-600 outline-none"
            />
            <label
              className={`absolute text-sm text-gray-500 left-0 top-3 transform transition-all duration-300 
              ${
                calculatedAmount
                  ? "-translate-y-6 scale-75 text-blue-600"
                  : "translate-y-0 scale-100"
              }`}
            >
              
            </label>
          </div>
        </div>
                {/* نوع الدفع */}
        <div className="text-white px-3 my-2">
          <h1 className="mb-2">نوع الدفع</h1>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="cash"
                checked={paymentType === "cash"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              نقداً
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentType"
                value="credit"
                checked={paymentType === "credit"}
                onChange={(e) => setPaymentType(e.target.value)}
              />
              دين
            </label>
          </div>
        </div>
        
  
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-semibold py-2.5 rounded-lg transition 
            ${
              isFormValid
                ? "bg-violet-600 hover:bg-violet-700 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "جاري التسديد..." : "تسديد الفاتورة"}
        </button>
      </form>
</div>
  );
}
