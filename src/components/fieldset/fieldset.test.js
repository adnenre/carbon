import React from "react";
import Fieldset from "./fieldset.component";
import legendPreview from "../../../cypress/locators/fieldset";
import Textbox from "../textbox/textbox.component";
import Checkbox from "../checkbox/checkbox.component";
import Form from "../form/form.component";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { getDataElementByValue } from "../../../cypress/locators/index";
import { positionOfElement } from "../../../cypress/support/helper";
import {
  VALIDATION,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";
import { ICON } from "../../../cypress/locators/locators";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const FieldsetComponent = ({ ...props }) => {
  return (
    <div>
      <Fieldset legend="Fieldset" {...props}>
        <Textbox
          label="First Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Last Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Checkbox
          label="Checkbox"
          labelAlign="right"
          labelWidth={30}
          labelSpacing={2}
          reverse
        />
        <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
        <Textbox
          label="Country"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Telephone"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
      </Fieldset>
    </div>
  );
};

context("Testing Fieldset component", () => {
  describe("should render Fieldset component", () => {
    it.each(specialCharacters)(
      "should verify Fieldset preview text is %s",
      (chars) => {
        CypressMountWithProviders(<FieldsetComponent legend={chars} />);

        legendPreview().should("have.text", chars);
      }
    );

    it("should verify Fieldset preview is not displayed", () => {
      CypressMountWithProviders(<FieldsetComponent legend="" />);

      legendPreview().should("not.exist");
    });

    it.each([
      ["inline", true, 33, 37, 73],
      ["as a column", false, 16, 70, 930],
    ])(
      "should verify Fieldset is displayed %s if inline prop is %s",
      (state, bool, labelHeight, labelWidth, inputWidth) => {
        CypressMountWithProviders(<FieldsetComponent inline={bool} />);

        getDataElementByValue("label").then(($el) => {
          useJQueryCssValueAndAssert($el, "height", labelHeight);
          useJQueryCssValueAndAssert($el, "width", labelWidth);
        });
        getDataElementByValue("input").then(($el) => {
          useJQueryCssValueAndAssert($el, "width", inputWidth);
        });
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Fieldset is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-string-component`}
            legend={`Fieldset ${type} on component`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              {...{ [type]: "Message" }}
            />
          </Fieldset>
        );

        getDataElementByValue("input")
          .eq(positionOfElement("first"))
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Fieldset is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-string-label`}
            legend={`Fieldset ${type} on label`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              validationOnLabel
              {...{ [type]: "Message" }}
            />
          </Fieldset>
        );

        getDataElementByValue("label")
          .eq(positionOfElement("first"))
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each([
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should verify Fieldset input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <Fieldset
            key={`${type}-boolean`}
            legend={`Fieldset ${type} as boolean`}
          >
            <Textbox
              label="Address"
              labelInline
              labelAlign="right"
              {...{ [type]: bool }}
            />
          </Fieldset>
        );

        getDataElementByValue("input")
          .parent()
          .should("have.css", "border-bottom-color", borderColor);
      }
    );

    it.each([
      [0, 0],
      [32, 4],
      [56, 7],
    ])(
      "should verify Fieldset displayed inside a Form and field spacing is %spx",
      (margin, spacing) => {
        CypressMountWithProviders(
          <Form fieldSpacing={spacing} data-element="form">
            <Fieldset>
              <Textbox label="Fieldset 1 Field 1" labelInline />
              <Textbox label="Fieldset 1 Field 2" labelInline />
            </Fieldset>
            <Textbox label="Separate Field" labelInline />
          </Form>
        );

        getDataElementByValue("form")
          .children()
          .children()
          .should("have.attr", "data-component", "fieldset")
          .and("have.css", "margin-bottom", `${margin}px`);
      }
    );
  });
});
