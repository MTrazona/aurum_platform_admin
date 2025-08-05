const QUILL_FORMATS = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
  ];
  
  const QUILL_MODULES = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const barangayList = {
    staMaria:['Bagbaguin','Balasing','Buenavista','Bulac','Camangyanan','Catmon','Caypombo','Caysio','Guyong','Lalakhan','Mag-asawang Sapa','Mahabang Parang','Manggahan','Parada','Poblacion(Santa Maria town proper)','Pabulong Buhangin','San Gabriel','San Jose Patag','San Vicente','Santa Clara','Santa Cruz','Silangan','Tabing Bakod(Santo Tomas)','Tumana'],
    bocaue:['Antipona','Bagumbayan','Bambang','Batia',' Binang 1st',' Binang 2nd','Bolacan','Bundukan','Bunlo','Caingin','Duhat','Igulot','Lolomboy','Poblacion','Sulucan','Taal','Tambobong','Turo','Wakas'],
    meycauayan:['Bagbaguin','Bahay Pare','Bancal','Banga','Bayugo','Calvario','Caingin','Camalig','Hulo','Iba','Langka','Lawa','Libtong','Liputan','Longos','Malhacan','Pajo','Pandayan','Pantoc','Perez','Poblacion','Saluysoy','Gasak','Tugatog','Ubihan','Zamora'],
    balagtas:['Borol 2nd Michael C Payuran','Borol 1st Joselito m Cruz','Dalig Reynaldo Valderama','Longos Rodolfo Aquino','Panginay Rolando Gatdula','Pulong Gubat Al Santiago','San Juan Efren Vergara','Santol Mel Ventura','Wawa Raul Marcelino'],
    marilao:['Abangan Norte','Abangan Sur','Ibayo','Lambakin','Lias','Loma de Gato','Nagbalon','Patubig','Poblacion I','Poblacion II','Prenza I','Prenza II','Santa Rosa I','Santa Rosa II','Saog','Tabing Ilog']
  }

  const sizeList = [
    {label:'XS',value:'XS'},
    {label:'S',value:'S'},
    {label:'M',value:'M'},
    {label:'L',value:'L'},
    {label:'XL',value:'XL'},
    {label:'XXL',value:'XXL'},
    {label:'XXXL',value:'XXXL'},
  ]
  const weightList = [
    {label:'Kilograms(kg)',value:'kg'},
    {label:'Grams(g)',value:'g'},
    {label:'Pounds(lbs)',value:'lbs'},
    {label:'Ounces(oz)',value:'oz'},
    {label:'Metric Tons(t)',value:'t'},
    {label:'Milligrams(mg)',value:'mg'},
    {label:'Tonnes(t)',value:'tons'},
  ]
  const lengthList = [
    {label:'Centimeters (cm)',value:'cm'},
    {label:'Meters (m)',value:'m'},
    {label:'Inches (in)',value:'in'},
    {label:'Feet (ft)',value:'ft'},
  ]
  export {
    QUILL_FORMATS,
    QUILL_MODULES,
    barangayList,
    sizeList,
    weightList,
    lengthList
  };
  