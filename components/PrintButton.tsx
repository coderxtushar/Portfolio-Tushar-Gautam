"use client";

import { PiPrinterBold } from "react-icons/pi";

/** Opens the browser's print dialog; the print stylesheet prints only the sheet. */
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} data-variant="ghost" className="pad-btn">
      Print
      <PiPrinterBold className="size-4 shrink-0" aria-hidden="true" />
    </button>
  );
}
