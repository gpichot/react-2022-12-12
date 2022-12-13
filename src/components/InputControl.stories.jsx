import { userEvent, within } from "@storybook/testing-library";

import InputControl from "./InputControl";

export default {
  title: "InputControl",
  component: InputControl,
  argTypes: {
    required: { control: "boolean", defaultValue: false },
    onChange: { action: "change" },
  },
};

const Template = (args) => <InputControl {...args} />;

export const Input = Template.bind({});
Input.args = {
  label: "Input",
  placeholder: "Placeholder",
};

Input.play = async ({ canvasElement }) => {
  const { getByLabelText } = within(canvasElement);
  const input = getByLabelText("Input");
  await userEvent.type(input, "Hello", {
    delay: 100,
  });
};

export const Input2 = Template.bind({});
Input2.args = {
  label: "Input",
  placeholder: "Placeholder",
  required: true,
};
