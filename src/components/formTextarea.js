function FormTextarea(props) {
    let formTextarea = document.createElement('textarea');

    formTextarea.setAttribute('class', props.className);
    formTextarea.setAttribute('placeholder', props.placeholder);
    formTextarea.setAttribute('name', props.name);
    formTextarea.value = props.value;

    if(props.readonly) {
        formTextarea.setAttribute('readonly', true);
    }

    return formTextarea;
}

export default FormTextarea;