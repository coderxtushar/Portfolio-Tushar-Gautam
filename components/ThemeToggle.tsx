"use client";
import { useEffect, useState } from "react";


export default function ThemeToggle() {
const [dark, setDark] = useState(true);


useEffect(() => {
document.documentElement.classList.toggle("dark", dark);
}, [dark]);


return (
<button
onClick={() => setDark(!dark)}
className="px-3 py-1.5 rounded-lg bg-linear-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 text-sm border border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20 transition"
>
{dark ? "☀️ Light" : "🌙 Dark"}
</button>
);
}