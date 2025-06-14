import React from "react";
import type { JSX } from "react";

function BasketIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="basket-icon"
    >
      <path
        fill="currentColor"
        d="M21.947 10.941a2.8 2.8 0 0 0-.52-1.09a2.8 2.8 0 0 0-.94-.76a2.5 2.5 0 0 0-.92-.25a7.46 7.46 0 0 0-2.19-4.62a7.6 7.6 0 0 0-10.74 0a7.46 7.46 0 0 0-2.19 4.62a2.5 2.5 0 0 0-.92.25a2.7 2.7 0 0 0-.94.76a2.74 2.74 0 0 0-.52 2.3l1.57 6.43a4.65 4.65 0 0 0 4.5 3.42h7.71a4.67 4.67 0 0 0 4.51-3.44l1.56-6.41c.1-.396.11-.81.03-1.21m-13.1 6.42a.75.75 0 0 1-1.5 0v-3.94a.75.75 0 1 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm3.91 0a.75.75 0 1 1-1.5 0v-3.94a.75.75 0 0 1 1.5 0zm-10.71-8.54a6 6 0 0 1 1.74-3.54a6.11 6.11 0 0 1 8.62 0a6 6 0 0 1 1.74 3.54z"
      ></path>
    </svg>
  )
}

export default React.memo(BasketIcon)
