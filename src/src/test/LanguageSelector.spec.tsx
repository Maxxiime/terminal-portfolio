import { useState } from "react";
import { describe, expect, it } from "vitest";
import { render, screen, userEvent } from "../utils/test-utils";
import LanguageSelector from "../../shell/LanguageSelector";
import type { Locale } from "../i18n";

function Picker() {
  const [locale, setLocale] = useState<Locale>("fr");
  return <><LanguageSelector locale={locale} onChange={setLocale} /><button>Outside</button></>;
}

describe("language selector", () => {
  it("supports keyboard selection and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Picker />);
    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: "Français" })).toHaveFocus();
    await user.keyboard("{ArrowDown}{Enter}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Choose language : English" })).toHaveFocus();
  });

  it("closes with Escape or an outside click without changing the selection", async () => {
    const user = userEvent.setup();
    render(<Picker />);
    const trigger = screen.getByRole("button", { name: "Choisir la langue : Français" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
