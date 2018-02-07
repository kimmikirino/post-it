function FormButton(props) {
    let formButton = document.createElement('button');

    formButton.setAttribute('class', props.className);
    formButton.setAttribute('placeholder', props.placeholder);
    formButton.setAttribute('name', props.name);
    formButton.setAttribute('type', props.type);
    formButton.setAttribute('value', props.value);
    formButton.addEventListener('click', props.click);

    formButton.innerHTML = props.children;

    return formButton;
}

export default FormButton;