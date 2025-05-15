const handleCpfChange = (e) => {
    /*remove os pontos na base de dados*/
    let value = e.target.value.replace(/\D/g, '');
    /*11 digitos*/
    value = value.slice(0, 11);
    /*primeiro ponto*/
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    /*segundo ponto*/
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    /*hifen*/
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    /*define o valor no useForm*/
    setValue('cadastroPessoaFisica', value);
    console.log('mudou', e.target.value)
};