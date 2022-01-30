import { PresenceTransition, View } from "native-base";
import React from "react";

const SlideFromBottom = (props) => {
  return (
    <>
      {props.isOpen && (
        <View position="absolute" {...props} zIndex={99}>
          <PresenceTransition
            visible={props.isOpen}
            initial={{
              translateY: 1000,
            }}
            animate={{
              translateY: 0,
              transition: {
                duration: 300,
              },
            }}
          >
            {props.children}
          </PresenceTransition>
        </View>
      )}
    </>
  );
};

export default SlideFromBottom;
