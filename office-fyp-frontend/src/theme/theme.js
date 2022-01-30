import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

export default extendTheme(
  {
    colors: {
      gray: {
        700: "#1f2733",
      },
      primary: "#64B5F6",
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode("gray.50", "gray.800")(props),
          fontFamily: "Helvetica, sans-serif",
        },
        html: {
          fontFamily: "Helvetica, sans-serif",
        },
      }),
    },
    components: {
      Steps,
    },
  }
);
