function FormTextarea(props) {
    let formTextarea = document.createElement('textarea');

    formTextarea.setAttribute('class', props.className);
    formTextarea.setAttribute('placeholder', props.placeholder);
    formTextarea.setAttribute('name', props.name);
    formTextarea.setAttribute('rows', props.rows);

    if (props.readonly) {
        formTextarea.setAttribute('readonly', true);
    }

    formTextarea.innerHTML = props.children;

    return formTextarea;
}

export default FormTextarea;