import React from "react";
import { shallow, mount } from "enzyme";
import Icon from "../icon";
import {
  ButtonProps,
  ButtonTypes,
  SizeOptions,
} from "../button/button.component";
import ButtonMinor from "./button-minor.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

const render = (props: ButtonProps, renderer: typeof shallow = shallow) => {
  return renderer(<ButtonMinor {...props} />);
};

describe("when no props other than children are passed into the component", () => {
  it("renders the default props and children", () => {
    const wrapper = render({ children: "foo" });
    expect(wrapper.contains(<Icon type="filter" />)).toBeFalsy();
    expect(wrapper.props().buttonType).toEqual("secondary");
  });
});

const minorSizesPadding: [SizeOptions, string][] = [
  [
    "small",
    "var(--spacing000) var(--spacing100) var(--spacing000) var(--spacing100)",
  ],
  ["medium", "var(--spacing100)"],
  ["large", "var(--spacing100)"],
];

interface VariantColorProperties {
  background?: string;
  borderColor?: string;
  color?: string;
}

const minorColors: [ButtonTypes, VariantColorProperties][] = [
  [
    "primary",
    {
      background: "var(--colorsActionMinor500)",
      borderColor: "var(--colorsActionMinorTransparent)",
      color: "var(--colorsActionMinorYang100)",
    },
  ],
  [
    "secondary",
    {
      background: "transparent",
      borderColor: "var(--colorsActionMinor500)",
      color: "var(--colorsActionMinor500)",
    },
  ],
  [
    "tertiary",
    {
      background: "transparent",
      borderColor: "transparent",
      color: "var(--colorsActionMinor500)",
    },
  ],
  [
    "darkBackground",
    {
      borderColor: "transparent",
    },
  ],
];

describe("Button Minor", () => {
  it.each(minorSizesPadding)(
    "when size is %s the padding is %s",
    (size, padding) => {
      const wrapper = mount(<ButtonMinor size={size}>Foo</ButtonMinor>);
      assertStyleMatch({ padding }, wrapper);
    }
  );

  it.each(minorColors)(
    "when buttonType is %s, renders with correct styling",
    (buttonType, styles) => {
      const wrapper = mount(
        <ButtonMinor buttonType={buttonType}>Foo</ButtonMinor>
      );
      assertStyleMatch({ ...styles }, wrapper);
    }
  );

  it("when destructive prop is passed, renders with destructive styling", () => {
    const wrapper = mount(<ButtonMinor destructive>foo</ButtonMinor>);
    assertStyleMatch(
      {
        background: "transparent",
        color: "var(--colorsSemanticNegative500)",
      },
      wrapper
    );
  });
  it("when disabled prop is passed, renders with disabled styling", () => {
    const wrapper = mount(<ButtonMinor disabled>foo</ButtonMinor>);
    assertStyleMatch(
      {
        background: "transparent",
        color: "var(--colorsActionMajorYin030)",
      },
      wrapper
    );
  });
});
