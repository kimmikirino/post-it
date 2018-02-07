function FormInput(props) {
    let formInput = document.createElement('input');

    formInput.setAttribute('class', props.className);
    formInput.setAttribute('placeholder', props.placeholder);
    formInput.setAttribute('name', props.name);
    formInput.setAttribute('type', props.type);
    formInput.setAttribute('value', props.value);

    if(props.readonly) {
        formInput.setAttribute('readonly', true);
    }

    return formInput;
}

export default FormInput;