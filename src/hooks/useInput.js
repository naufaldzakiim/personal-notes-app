import React from "react";

function useInput(defaultValue = ""){
    const [value, setValue] = React.useState(defaultValue);

    function onChangeHandler(e){
        setValue(e.target.value);
    }

    return [value, onChangeHandler];
}

export default useInput;