export const findRetribuzione = (data, fasciaStipendioDb) => {

  const retribuzione = data?.find(ele=>(
    ele.cd_attributo === fasciaStipendioDb
  ));

  return retribuzione && retribuzione.dc_val;
};