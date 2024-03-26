export const checkValidity = (navigationTabs) => {

  //l'invio si abilita solo se compilati tutti i campi obbligatori e 
  //se è stata compilata almeno una sezione tra tata, colf e badante

  let validity = true;
  let sectionTCBInvalid = true;

  navigationTabs.forEach(element => {
    switch (element.code) {
      case "disp_tata":
      case "disp_colf":
      case "disp_badante":
      case "esp_badante":
        if (!element.disabled && element.valid && sectionTCBInvalid) {
          sectionTCBInvalid = false;
        }
        break;
      default:
        if (!element.valid) {
          validity = false;
        }
    }

  });

  return (validity && !sectionTCBInvalid);
}