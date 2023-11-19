import React from "react";

export default function Header(props) {
  const { isFileUploaded, file } = props;

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost" href="/">
          <span className="font-black text-primary">QA</span>{" "}
          <span className="text-xs">Annotator</span>
        </a>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          <li>
            <details>
              <summary>Themes (TODO!)</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    aria-label="Default"
                    value="default"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    aria-label="Retro"
                    value="retro"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    aria-label="Cyberpunk"
                    value="cyberpunk"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    aria-label="Valentine"
                    value="valentine"
                  />
                </li>
                <li>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="justify-start theme-controller btn btn-sm btn-block btn-ghost"
                    aria-label="Aqua"
                    value="aqua"
                  />
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
