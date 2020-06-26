import { useToast as useChakraToast } from "@chakra-ui/core";

export function useToast() {
    const chakraToast = useChakraToast();
    return ({
        title = null,
        status = "info",
        duration = 2000,
        isClosable = true,
        position = "top",
        ...remainingProps
    }) => {
        return chakraToast({
            title: title || status.toUpperCase(),
            status,
            duration,
            isClosable,
            position,
            ...remainingProps
        });
    };
}
