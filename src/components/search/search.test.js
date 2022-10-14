import React from "react";
import Search from "./search.component";
import Box from "../box";

import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../cypress/locators";
import {
  searchDefault,
  searchDefaultInput,
  searchCrossIcon,
  searchButton,
  searchDefaultInnerIcon,
  searchIcon,
  searchFindIcon,
} from "../../../cypress/locators/search/index";
import {
  parseToIntElement,
  checkGoldenOutline,
} from "../../../cypress/support/component-helper/common-steps";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { keyCode } from "../../../cypress/support/helper";

const testData = ["mp150ú¿¡üßä", "!@#$%^*()_+-=~[];:.,?{}&\"'<>"];
const testCypress = "test-cypress";
const validationTypes = [
  ["error", "rgb(203, 55, 74)"],
  ["warning", "rgb(239, 103, 0)"],
  ["info", "rgb(0, 96, 167)"],
];

const SearchComponent = ({ ...props }) => {
  const [value, setValue] = React.useState("");

  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      {...props}
    />
  );
};

context("Test for Search component", () => {
  describe("check props for Search component", () => {
    it.each(testData)(
      "should render Search with placeholder using %s as special characters",
      (placeholder) => {
        CypressMountWithProviders(
          <SearchComponent placeholder={placeholder} />
        );

        searchDefaultInput().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Search with defaultValue prop", () => {
      CypressMountWithProviders(<Search defaultValue={testCypress} />);

      searchDefaultInput().should("have.attr", "value", testCypress);
    });

    it("should render Search with value prop", () => {
      CypressMountWithProviders(<SearchComponent value={testCypress} />);

      searchDefaultInput().should("have.attr", "value", testCypress);
    });

    it("should render Search with id prop", () => {
      CypressMountWithProviders(<SearchComponent id={testCypress} />);

      searchDefault().should("have.attr", "id", testCypress);
    });

    it("should render Search with name prop", () => {
      CypressMountWithProviders(<SearchComponent name={testCypress} />);

      searchDefault().should("have.attr", "name", testCypress);
    });

    it("should render Search with aria-label prop", () => {
      CypressMountWithProviders(<SearchComponent aria-label={testCypress} />);

      searchDefaultInput().should("have.attr", "aria-label", testCypress);
    });

    it.each([
      [true, "be.visible"],
      [false, "not.exist"],
    ])(
      "should render Search with searchButton prop set to %s",
      (searchButtonBool, assertion) => {
        CypressMountWithProviders(
          <Search searchButton={searchButtonBool} defaultValue={testCypress} />
        );

        searchFindIcon().should(assertion);
      }
    );

    it.each([
      ["34%", "458px"],
      ["70%", "944px"],
    ])(
      "should render Search with searchWidth prop set to %s",
      (widthInPercentage, widthVal) => {
        CypressMountWithProviders(
          <SearchComponent searchWidth={widthInPercentage} />
        );

        searchDefault().then(($el) => {
          expect($el[0].getBoundingClientRect().width).to.be.within(
            parseToIntElement(widthVal),
            parseToIntElement(widthVal) + 2
          );
        });
      }
    );

    it.each([["475px"], ["250px"]])(
      "should render Search with searchWidth prop set to %s",
      (width) => {
        CypressMountWithProviders(<SearchComponent searchWidth={width} />);

        searchDefault().then(($el) => {
          expect($el[0].getBoundingClientRect().width).to.be.within(
            parseToIntElement(width),
            parseToIntElement(width) + 2
          );
        });
      }
    );

    it.each([
      ["default", "rgb(102, 132, 148)"],
      ["dark", "rgb(153, 173, 183)"],
    ])(
      "should render Search with variant prop set to %s",
      (variant, backgroundColor) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "32px",
                backgroundColor: "#003349",
              }}
            >
              <SearchComponent variant={variant} />
            </div>
          </Box>
        );

        searchDefault().should(
          "have.css",
          "border-bottom-color",
          backgroundColor
        );
      }
    );

    it.each([
      ["default", "rgb(51, 91, 112)"],
      ["dark", "rgb(204, 214, 219)"],
    ])(
      "should render Search with variant prop set to %s on hover",
      (variant, hoverColor) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "32px",
                backgroundColor: "#003349",
              }}
            >
              <SearchComponent variant={variant} />
            </div>
          </Box>
        );

        searchDefaultInnerIcon().realHover();
        searchDefault().should("have.css", "border-bottom-color", hoverColor);
      }
    );

    it("should render Search with tabIndex prop", () => {
      CypressMountWithProviders(<SearchComponent tabIndex={-5} />);

      searchDefaultInput().should("have.attr", "tabIndex", "-5");
    });

    it.each(validationTypes)(
      "should render Search and set type to %s as string",
      (type, color) => {
        CypressMountWithProviders(
          <SearchComponent {...{ [type]: "Message" }} />
        );

        searchDefaultInput()
          .parent()
          .then(($el) => {
            expect($el.css("border-color")).to.equals(color);
          });
        getDataElementByValue(type).should("be.visible");
      }
    );

    it.each(validationTypes)(
      "should render Search and set type to %s as boolean",
      (type, color) => {
        CypressMountWithProviders(<SearchComponent {...{ [type]: true }} />);

        searchDefaultInput()
          .parent()
          .then(($el) => {
            expect($el.css("border-color")).to.equals(color);
          });
      }
    );

    it.each([["top"], ["bottom"], ["left"], ["right"]])(
      "should render Search with the tooltip in the %s position",
      (tooltipPositionValue) => {
        CypressMountWithProviders(
          <Box width="700px" height="108px">
            <div
              style={{
                padding: "100px",
              }}
            >
              <SearchComponent
                error={testCypress}
                tooltipPosition={tooltipPositionValue}
              />
            </div>
          </Box>
        );

        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", testCypress)
          .should("have.attr", "data-placement", tooltipPositionValue);
      }
    );

    // threshold prop isn't working
  });

  describe("check functionality for Search component", () => {
    it("should verify proper color for Search icon button", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress);
      searchButton().click({ force: true });
      const mintColor = "rgb(0, 126, 69)";
      searchIcon().should("have.css", "background-color", mintColor);
    });

    it("should clear a Search input after click on cross icon", () => {
      CypressMountWithProviders(<SearchComponent />);

      searchDefaultInput().clear().type(testCypress);
      searchCrossIcon().click({ force: true });
      searchDefaultInput().should("be.empty");
    });

    it("should verify that search icon has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress);
      searchButton().click({ force: true });
      searchButton().then(($el) => {
        checkGoldenOutline($el);
      });
    });

    it("should verify that input has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput()
        .clear()
        .type(testCypress)
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });

    it("should verify that cross icon has golden outline", () => {
      CypressMountWithProviders(<SearchComponent searchButton />);

      searchDefaultInput().clear().type(testCypress).tab();

      searchCrossIcon()
        .parent()
        .then(($el) => {
          checkGoldenOutline($el);
        });
    });
  });

  describe("check events for Search component", () => {
    let callback;

    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(
        <Search onClick={callback} defaultValue={testCypress} searchButton />
      );

      searchButton()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<SearchComponent onChange={callback} />);

      searchDefaultInput()
        .type("1")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<SearchComponent onFocus={callback} />);

      searchDefaultInput()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<SearchComponent onBlur={callback} />);

      searchDefaultInput()
        .focus()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onKeyDown callback when a keyboard event is triggered",
      (key) => {
        CypressMountWithProviders(<SearchComponent onKeyDown={callback} />);

        searchDefaultInput()
          .trigger("keydown", keyCode(key))
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );
  });
});