import React from "react";

export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-neutral-400 text-xs">
      &copy; {new Date().getFullYear()} To-Play-List. All rights reserved.
    </footer>
  );
}
