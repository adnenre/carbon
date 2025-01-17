import React from "react";
import {
  Default as ButtonBarCustom,
  DefaultWithWrapper as ButtonBarWithWrapper,
} from "./button-bar-test.stories";
import {
  BUTTON_BAR_SIZES,
  BUTTON_BAR_ICON_POSITIONS,
} from "./button-bar.config";

import { buttonDataComponent } from "../../../cypress/locators/button";
import { icon } from "../../../cypress/locators";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

context("Test for Button-Bar component", () => {
  describe("check props for Button-Bar component", () => {
    it.each([
      [BUTTON_BAR_SIZES[0], 32],
      [BUTTON_BAR_SIZES[1], 40],
      [BUTTON_BAR_SIZES[2], 48],
    ])("should set size to %s for a Button-Bar", (size, px) => {
      CypressMountWithProviders(<ButtonBarCustom size={size} />);

      buttonDataComponent().eq(0).should("have.css", "min-height", `${px}px`);
      buttonDataComponent().eq(1).should("have.css", "min-height", `${px}px`);
      buttonDataComponent().eq(2).should("have.css", "min-height", `${px}px`);
    });

    it.each([
      [BUTTON_BAR_ICON_POSITIONS[0], "right"],
      [BUTTON_BAR_ICON_POSITIONS[1], "left"],
    ])(
      "should set position to %s for icon in a Button-Bar",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonBarCustom iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should render Button-Bar with full width", () => {
      CypressMountWithProviders(<ButtonBarCustom fullWidth />);

      buttonDataComponent()
        .parent()
        .then(($el) => {
          useJQueryCssValueAndAssert($el, "width", 1366);
        });
    });
  });

  describe("accessibility tests", () => {
    it.each([BUTTON_BAR_SIZES[0], BUTTON_BAR_SIZES[1], BUTTON_BAR_SIZES[2]])(
      "should check accessibility for %s size for a Button-Bar",
      (size) => {
        CypressMountWithProviders(<ButtonBarCustom size={size} />);

        cy.checkAccessibility();
      }
    );

    it.each([BUTTON_BAR_ICON_POSITIONS[0], BUTTON_BAR_ICON_POSITIONS[1]])(
      "should check accessibility for %s icon position in a Button-Bar",
      (iconPosition) => {
        CypressMountWithProviders(
          <ButtonBarCustom iconPosition={iconPosition} />
        );

        cy.checkAccessibility();
      }
    );

    it("should check the accessibility of Button-Bar with full width", () => {
      CypressMountWithProviders(<ButtonBarCustom fullWidth />);

      cy.checkAccessibility();
    });
  });

  describe("check ButtonBar can be navigated using a keyboard", () => {
    it("should verify ButtonBar with wrapped components can be navigated using keyboard", () => {
      CypressMountWithProviders(<ButtonBarCustom />);

      buttonDataComponent().eq(0).focus();
      buttonDataComponent().eq(0).tab();
      buttonDataComponent().eq(1).should("be.focused");
      buttonDataComponent().eq(0).should("not.be.focused");
      buttonDataComponent().eq(1).tab();
      buttonDataComponent().eq(2).should("be.focused");
      buttonDataComponent().eq(1).should("not.be.focused");
    });
  });

  describe("when custom Button wrapper components are used as children in ButtonBar", () => {
    it("Button size is small when the size prop is set to small and passed to ButtonBar", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper size="small" />);

      buttonDataComponent().then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 81);
      });
    });

    it("Button is fullWidth when the fullWidth prop is passed to ButtonBar", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper fullWidth />);

      buttonDataComponent().then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 339);
      });
    });

    it.each([
      ["after", "left"],
      ["before", "right"],
    ])(
      "Button Icon position is %s text when the iconPosition is set and passed to ButtonBar",
      (iconPosition, margin) => {
        CypressMountWithProviders(
          <ButtonBarWithWrapper iconPosition={iconPosition} />
        );

        icon().should("have.css", `margin-${margin}`, "8px");
      }
    );

    it("should verify ButtonBar with wrapped components can be navigated using keyboard", () => {
      CypressMountWithProviders(<ButtonBarWithWrapper />);

      buttonDataComponent().eq(0).focus();
      buttonDataComponent().eq(0).tab();
      buttonDataComponent().eq(1).should("be.focused");
      buttonDataComponent().eq(0).should("not.be.focused");
      buttonDataComponent().eq(1).tab();
      buttonDataComponent().eq(2).should("be.focused");
      buttonDataComponent().eq(1).should("not.be.focused");
      buttonDataComponent().eq(2).tab();
      icon().eq(3).parent().should("be.focused");
      buttonDataComponent().eq(2).should("not.be.focused");
    });
  });
});
