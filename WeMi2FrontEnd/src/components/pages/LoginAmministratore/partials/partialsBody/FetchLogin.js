const FetchDatiLogin = async (formData, fetchAuthAdmin) => {
  try {
    const options = {
      body: JSON.stringify(formData),
    };
    const url = 'autenticazioneAdmin';
    return await fetchAuthAdmin(url, options);
  } catch (error) {
    console.log(error);
  }
};

export default FetchDatiLogin;
