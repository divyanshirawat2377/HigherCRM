// import React from "react";

// function InputField({ label, type, placeholder, iconSrc }) {
//   return (
//     <div>
//       <label htmlFor={${label.toLowerCase()}Input} className="text-sm text-black">
//         {label}
//       </label>
//       <div className="flex gap-5 px-3 py-3.5 mt-2 text-xs whitespace-nowrap rounded-xl border border-black border-solid bg-zinc-50 text-neutral-400">
//         <img loading="lazy" src={iconSrc} alt="" className="object-contain shrink-0 w-5 aspect-square" />
//         <input
//           type={type}
//           id={${label.toLowerCase()}Input}
//           placeholder={placeholder}
//           className="flex-auto my-auto w-[266px] bg-transparent"
//         />
//       </div>
//   </div>
//   );
// }

// export default InputField;

import React from "react";

function InputField({ label, type, placeholder, iconSrc }) {
  return (
    <div>
      <label htmlFor={`${label.toLowerCase()}Input`} className="text-sm text-black">
        {label}
      </label>
      <div className="flex gap-5 px-3 py-3.5 mt-2 text-xs whitespace-nowrap rounded-xl border border-black border-solid bg-zinc-50 text-neutral-400">
        <img 
          loading="lazy" 
          src={iconSrc} 
          alt="" 
          className="object-contain shrink-0 w-5 aspect-square" 
        />
        <input
          type={type}
          id={`${label.toLowerCase()}Input`} // Corrected here
          placeholder={placeholder}
          className="flex-auto my-auto w-[266px] bg-transparent"
        />
      </div>
    </div>
  );
}

export default InputField;
