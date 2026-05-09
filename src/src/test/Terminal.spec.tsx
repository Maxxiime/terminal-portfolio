import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { render, screen, userEvent, waitFor } from "../utils/test-utils";
import Terminal, { commands } from "../components/Terminal";
import { commandNotFoundMessages, pickCommandNotFoundIndex } from "../i18n";

// setup function
function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const allCmds = commands.map(cmdObj => cmdObj.cmd);

// Returns the shortest prefix of cmd that uniquely identifies it among allCmds.
function uniquePrefix(cmd: string): string {
  for (let len = 2; len <= cmd.length; len++) {
    const prefix = cmd.slice(0, len);
    if (allCmds.filter(c => c.startsWith(prefix)).length === 1) {
      return prefix;
    }
  }
  return cmd;
}

const setPageScrollMetrics = ({
  scrollTop,
  scrollHeight,
  clientHeight,
}: {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}) => {
  const scrollingElement =
    document.scrollingElement || document.documentElement;

  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: scrollTop,
    writable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    configurable: true,
    value: clientHeight,
    writable: true,
  });
  Object.defineProperty(scrollingElement, "scrollTop", {
    configurable: true,
    value: scrollTop,
    writable: true,
  });
  Object.defineProperty(scrollingElement, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(scrollingElement, "clientHeight", {
    configurable: true,
    value: clientHeight,
  });
  Object.defineProperty(document.body, "scrollHeight", {
    configurable: true,
    value: scrollHeight,
  });
  Object.defineProperty(document.body, "clientHeight", {
    configurable: true,
    value: clientHeight,
  });
};

describe("Terminal Component", () => {
  let terminalInput: HTMLInputElement;
  let user: UserEvent;
  let scrollToMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: scrollToMock,
      writable: true,
    });

    const termSetup = setup(<Terminal />);
    user = termSetup.user;
    terminalInput = screen.getByTitle("terminal-input");
    setPageScrollMetrics({
      scrollTop: 2201,
      scrollHeight: 2778,
      clientHeight: 577,
    });
    scrollToMock.mockClear();
  });

  describe("Input Features & Initial State", () => {
    it("should display welcome cmd by default", () => {
      expect(screen.getByTestId("input-command").textContent).toBe("welcome");
      expect(screen.getByTestId("welcome")).toBeInTheDocument();
    });

    it("should change input value", async () => {
      await user.type(terminalInput, "demo");
      expect(terminalInput.value).toBe("demo");
    });

    it("should clear input value when click enter", async () => {
      await user.type(terminalInput, "demo{enter}");
      expect(terminalInput.value).toBe("");
    });

    it("should auto-scroll when new output is appended near the bottom", async () => {
      setPageScrollMetrics({
        scrollTop: 2201,
        scrollHeight: 2778,
        clientHeight: 577,
      });

      await user.type(terminalInput, "about{enter}");

      await waitFor(() => {
        expect(scrollToMock).toHaveBeenCalled();
      });
    });

    it("should preserve manual scroll position when user is away from the bottom", async () => {
      setPageScrollMetrics({
        scrollTop: 800,
        scrollHeight: 2778,
        clientHeight: 577,
      });

      scrollToMock.mockClear();

      await user.type(terminalInput, "skills{enter}");

      await waitFor(() => {
        expect(scrollToMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("Input Commands", () => {
    it("should return a randomized command-not-found message when input value is invalid", async () => {
      await user.type(terminalInput, "demo{enter}");
      const output = screen.getByTestId("not-found-0").textContent || "";
      expect(commandNotFoundMessages.en).toContain(output);
    });

    it("should avoid repeating the same command-not-found message twice in a row when possible", () => {
      const nextIndex = pickCommandNotFoundIndex("en", 2, () => 0.125);
      expect(nextIndex).not.toBe(2);
      expect(commandNotFoundMessages.en[nextIndex]).toBeTruthy();
    });

    it("should clear everything when user type 'clear' cmd", async () => {
      await user.type(terminalInput, "clear{enter}");
      // BootSequence is always rendered (compact, animate=false) + Form = 2 children after clear
      expect(screen.getByTestId("terminal-wrapper").children.length).toBe(2);
    });

    it("should render Welcome component when user type 'welcome' cmd", async () => {
      const initialWelcomeHtml = screen.getByTestId("welcome").innerHTML;
      await user.type(terminalInput, "clear{enter}");
      await user.type(terminalInput, "welcome{enter}");
      const manualWelcome = screen.getByTestId("welcome");
      expect(manualWelcome).toBeInTheDocument();
      expect(manualWelcome.innerHTML).toBe(initialWelcomeHtml);
      expect(manualWelcome.textContent).toContain(
        "DevOps / SRE | Automation, Self-Hosting, AI-Driven Operations"
      );
    });

    const otherCmds = ["about", "education", "help"];
    otherCmds.forEach(cmd => {
      it(`should render ${cmd} component when user type '${cmd}' cmd`, async () => {
        await user.type(terminalInput, `${cmd}{enter}`);
        expect(screen.getByTestId(`${cmd}`)).toBeInTheDocument();
      });
    });
  });

  describe("Redirect commands", () => {
    beforeEach(() => {
      window.open = vi.fn();
    });

    it("should open the CV PDF in a new tab when user type 'gui' cmd", async () => {
      await user.type(terminalInput, "gui{enter}");
      expect(window.open).toHaveBeenCalledWith(
        "https://drive.google.com/file/d/1SOjH1ml6LmmJxeUx2h5oVeZ8aAsRELq1/view?usp=drivesdk",
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  describe("Invalid Arguments", () => {
    const specialUsageCmds = ["gui"];
    const componentHandledCmds = [
      "contact",
      "experience",
      "language",
      "question",
    ];
    const usageCmds = allCmds.filter(
      cmd =>
        !["echo", ...specialUsageCmds, ...componentHandledCmds].includes(cmd)
    );

    usageCmds.forEach(cmd => {
      it(`should return usage component for ${cmd} cmd with invalid arg`, async () => {
        await user.type(terminalInput, `${cmd} sth{enter}`);
        expect(screen.getByTestId("usage-output").innerHTML).toBe(
          `Usage: ${cmd}`
        );
      });
    });

    it("should return invalid arg message for contact cmd with invalid arg", async () => {
      await user.type(terminalInput, "contact sth{enter}");
      expect(screen.getByTestId("contact-invalid-arg")).toBeInTheDocument();
    });

    it("should return invalid arg message for experience cmd with invalid arg", async () => {
      await user.type(terminalInput, "experience sth{enter}");
      expect(screen.getByTestId("experience-invalid-arg")).toBeInTheDocument();
    });

    it("should return invalid arg message for language cmd with invalid arg", async () => {
      await user.type(terminalInput, "language sth{enter}");
      expect(screen.getByTestId("language-invalid-arg")).toBeInTheDocument();
    });

    specialUsageCmds.forEach(cmd => {
      it(`should return usage component for '${cmd}' cmd with invalid arg`, async () => {
        await user.type(terminalInput, `${cmd} sth{enter}`);
        expect(screen.getByTestId("gui-invalid-arg")).toBeInTheDocument();
      });

      it(`should return usage component for '${cmd}' cmd with extra args`, async () => {
        const arg = "extra";
        await user.type(terminalInput, `${cmd} ${arg} extra-arg{enter}`);
        expect(screen.getByTestId("gui-invalid-arg")).toBeInTheDocument();
      });

      it(`should return usage component for '${cmd}' cmd with incorrect option`, async () => {
        const arg = "bad";
        window.open = vi.fn();

        // firstly run commands correct options
        await user.type(terminalInput, `gui{enter}`);

        // then run cmd with incorrect options
        await user.type(terminalInput, `${cmd} ${arg}{enter}`);
        expect(window.open).toBeCalledTimes(1);
      });
    });
  });

  describe("Keyboard shortcuts", () => {
    allCmds.forEach(cmd => {
      it(`should autocomplete '${cmd}' when 'Tab' is pressed`, async () => {
        await user.type(terminalInput, uniquePrefix(cmd));
        await user.tab();
        expect(terminalInput.value).toBe(cmd);
      });
    });

    allCmds.forEach(cmd => {
      it(`should autocomplete '${cmd}' when 'Ctrl + i' is pressed`, async () => {
        await user.type(terminalInput, uniquePrefix(cmd));
        await user.keyboard("{Control>}i{/Control}");
        expect(terminalInput.value).toBe(cmd);
      });
    });

    it("should clear when 'Ctrl + l' is pressed", async () => {
      await user.type(terminalInput, "about{enter}");
      await user.keyboard("{Control>}l{/Control}");
      // BootSequence is always rendered (compact, animate=false) + Form = 2 children after clear
      expect(screen.getByTestId("terminal-wrapper").children.length).toBe(2);
    });

    it("should go to previous back and forth when 'Up & Down Arrow' is pressed", async () => {
      await user.type(terminalInput, "about{enter}");
      await user.type(terminalInput, "whoami{enter}");
      await user.type(terminalInput, "pwd{enter}");
      await user.keyboard("{arrowup>3}");
      expect(terminalInput.value).toBe("about");
      await user.keyboard("{arrowup>2}");
      expect(terminalInput.value).toBe("welcome");
      await user.keyboard("{arrowdown>2}");
      expect(terminalInput.value).toBe("whoami");
      await user.keyboard("{arrowdown}");
      expect(terminalInput.value).toBe("pwd");
      await user.keyboard("{arrowdown}");
      expect(terminalInput.value).toBe("");
    });
  });
});
