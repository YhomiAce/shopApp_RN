import { StyleSheet, Text, View, TextInput } from 'react-native'

const Input = (props) => {
    const {onInputChange, value, id} = props;

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        onInputChange(id, text);
    };


    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={textChangeHandler}
                {...props}

            />
            {!props.isValid && <Text>{props.errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    formControl: {
        width: "100%",
    },
    label: {
        fontFamily: "open-sans-bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
})

export default Input
