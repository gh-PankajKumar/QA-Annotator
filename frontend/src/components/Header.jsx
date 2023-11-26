import React from "react";

export default function Header(props) {
  const { isFileUploaded, file } = props;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost" href="/">
          <span className="font-black text-primary">QA</span>
          <span className="text-xs text-base-content">Annotator</span>
        </a>
        <a
          href="https://github.com/gh-PankajKumar/QA-Annotator"
          target="_blank"
          rel="noopener"
          aria-label="Github"
        >
          <button className="btn btn-ghost">
            <i className="fa-brands fa-github"></i>
          </button>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown">
          <label tabIndex={0} className="m-1 btn">
            Themes<i className="fa-solid fa-chevron-down"></i>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            data-choose-theme
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="Dracula"
                value="dracula"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="Pastel"
                value="pastel"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="Dim"
                value="dim"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="Cupcake"
                value="cupcake"
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                aria-label="Nord"
                value="nord"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
