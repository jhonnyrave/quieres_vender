// @autor Jhonny Rave (analista.sistemas1@ipanu.co)
// @fecha   24/06/2021
// @version 01 -- VNqzvrAEw3shExEBny6L

var obj = function () {
  var o = this;
  $(document).ready(function () {
    o.initialize();
  });
};
var quieres_vender = obj.prototype;

$(document).ready(function () {

  const getDatePickerTitle = elem => {
    // From the label or the aria-label
    const label = elem.nextElementSibling;
    let titleText = '';
    if (label && label.tagName === 'LABEL') {
      titleText = label.textContent;
    } else {
      titleText = elem.getAttribute('aria-label') || '';
    }
    return titleText;
  }
  
  const elems = document.querySelectorAll('.datepicker_input');
  for (const elem of elems) {
    const datepicker = new Datepicker(elem, {
      'format': 'dd/mm/yyyy',
      'language' : 'es', // UK format
      title: getDatePickerTitle(elem)
    });
  }

  barrios = [];
  datos =[];
  let frm = [];
  let datos_localstorage = [];
  adjuntos = [];
  quieres_vender.traerCiudadDpto();
  quieres_vender.traerDpto();

  var storage = JSON.parse(localStorage.getItem("datos_incor"));
  if(storage!=null){ 
    if(storage.datos_personales!=null){
      // Datos Personales
      document.getElementById("tipo_vinculacion").value = storage.datos_personales.tipo_vinculacion;
      document.getElementById("tipo_doc").value = storage.datos_personales.tipo_doc;
      document.getElementById("dctoIdentidad").value = storage.datos_personales.cc;
      document.getElementById("fecha_nac").value = storage.datos_personales.fecha_nac;
      document.getElementById("fecha_expedicion").value = storage.datos_personales.fecha_expedicion;
     
      $.each($("select[name='ciudad_exp']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage.datos_personales.ciudad_exp!==null){
            $(val).val() == storage.datos_personales.ciudad_exp.trim() ? $(val).attr("selected","selected") : "";
        }
      });
      document.getElementById("primerNombre").value = storage.datos_personales.primerNombre;
      document.getElementById("segundoNombre").value = storage.datos_personales.segundoNombre;
      document.getElementById("primerApellido").value = storage.datos_personales.primerApellido;
      document.getElementById("segundoApellido").value = storage.datos_personales.segundoApellido;
      document.getElementById("telefono").value = storage.datos_personales.telefono;
      document.getElementById("celular").value = storage.datos_personales.celular;
      document.getElementById("txtCorreo").value = storage.datos_personales.correo;
      document.getElementById("txtConfirCorreo").value = storage.datos_personales.correo;
    }
  }

  var storage_contacto = JSON.parse(localStorage.getItem("datos_contacto"));
  if(storage_contacto!=null){ 
    if(storage_contacto.datos_contacto!=null){
      // Datos Contacto
      $.each($("select[name='txtPais']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.pais!==null){
            $(val).val() == storage_contacto.datos_contacto.pais.trim() ? $(val).attr("selected","selected") : "";
        }
      });

      $.each($("select[name='txtdepto']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.depto!==null){
            $(val).val() == storage_contacto.datos_contacto.depto.trim() ? $(val).attr("selected","selected") : "";
        }
      });

      $.each($("select[name='ciudad_dpto']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.ciudad!==null){
            $(val).val() == storage_contacto.datos_contacto.ciudad.trim() ? $(val).attr("selected","selected") : "";
        }
      });

      $.each($("select[name='tipo_direccion']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.tipo_direccion!==null){
            $(val).val() == storage_contacto.datos_contacto.tipo_direccion.trim() ? $(val).attr("selected","selected") : "";
        }
      });
      document.getElementById("numero").value = storage_contacto.datos_contacto.numero;
      $.each($("select[name='letra']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.letra!==null){
            $(val).val() == storage_contacto.datos_contacto.letra.trim() ? $(val).attr("selected","selected") : "";
        }
      });

      $.each($("select[name='cuadrante']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.cuadrante!==null){
            $(val).val() == storage_contacto.datos_contacto.cuadrante.trim() ? $(val).attr("selected","selected") : "";
        }
      });
      document.getElementById("numero_dos").value = storage_contacto.datos_contacto.numero_dos;
      document.getElementById("numero_tres").value = storage_contacto.datos_contacto.numero_tres;
      document.getElementById("direccion").value = storage_contacto.datos_contacto.direccion;
      document.getElementById("complemento").value = storage_contacto.datos_contacto.complemento;
      document.getElementById("referida").value = storage_contacto.datos_contacto.referido;
      document.getElementById("nombre_referida").value = storage_contacto.datos_contacto.nombre_referida;
    
      $.each($("select[name='letra_dos']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.letra_dos!==null){
            $(val).val() == storage_contacto.datos_contacto.letra_dos.trim() ? $(val).attr("selected","selected") : "";
        }
      });

      $.each($("select[name='cuadrante_dos']").children(),function(index,val){
        //Pregunto si el valor actual es igual al de la clase.
        if(storage_contacto.datos_contacto.cuadrante_dos!==null){
            $(val).val() == storage_contacto.datos_contacto.cuadrante_dos.trim() ? $(val).attr("selected","selected") : "";
        }
      });
    }
  }

  $("#tipo_vinculacion").on("change", function (event) {
    if($(this).val() == 'P'){
      $('.wizard .nav-tabs li.codeudor').hide();
      $('.wizard .nav-tabs li.referencias').hide();
      let uno = document.getElementById('paso_2');
      uno.innerText = 'Finalizar';
    }else{
      $('.wizard .nav-tabs li.codeudor').show();
      $('.wizard .nav-tabs li.referencias').show();
      let uno = document.getElementById('paso_2');
      console.log(uno);
      if (uno.innerText == 'Finalizar') {
        uno.innerText = 'Siguiente';
      }
    }
  });

  $("#ciudad_dpto").on("change", function (event) {
    if($("#tipo_vinculacion").val() == 'C'){
      if($(this).val() == '05001000' || $(this).val() =='05088000' ||  $(this).val()=='05212000'){
        $('.wizard .nav-tabs li.codeudor').hide();
      }else{
        $('.wizard .nav-tabs li.codeudor').show();
      }
    }
  });

  $("#paso_1").click(function (e) {
    if($("#tipo_vinculacion").val() == 'P'){
      $('.wizard .nav-tabs li.codeudor').hide();
      $('.wizard .nav-tabs li.referencias').hide();
      let uno = document.getElementById('paso_2');
      uno.innerText = 'Finalizar';
    }else{
      $('.wizard .nav-tabs li.codeudor').show();
      $('.wizard .nav-tabs li.referencias').show();
      let uno = document.getElementById('paso_2');
      if (uno.innerText == 'Finalizar') {
        uno.innerText = 'Siguiente';
      }
    }

    let result = valida_envia('formulario_1');
    if(result!=0){
      datos_localstorage={
        datos_personales:{
          tipo_vinculacion:document.getElementById("tipo_vinculacion").value,
          tipo_doc:document.getElementById("tipo_doc").value,
          cc:document.getElementById("dctoIdentidad").value,
          fecha_nac:document.getElementById("fecha_nac").value,
          fecha_expedicion:document.getElementById("fecha_expedicion").value,
          ciudad_exp:document.getElementById("ciudad_exp").value,
          primerNombre:document.getElementById("primerNombre").value,
          segundoNombre:document.getElementById("segundoNombre").value,
          primerApellido:document.getElementById("primerApellido").value,
          segundoApellido:document.getElementById("segundoApellido").value,
          telefono:document.getElementById("telefono").value,
          celular:document.getElementById("celular").value,
          correo:document.getElementById("txtCorreo").value
        }
      }
       //debugger
       localStorage.setItem("datos_incor",JSON.stringify(datos_localstorage));
       quieres_vender.guardarProspecto();
      var active = $('.wizard .nav-tabs li.active');
      active.next().removeClass('disabled');
      nextTab(active);
    }
  });

  $("#paso_2").click(function (e) {
    let result = valida_envia('formulario_2');
    if(result!=0){
      datos_localstorage={
        datos_contacto:{
          pais:document.getElementById("txtPais").value,
          depto:document.getElementById("txtdepto").value,
          ciudad:document.getElementById("ciudad_dpto").value,
          barrio:document.getElementById("txtBarrio").value,
          tipo_direccion:document.getElementById("tipo_direccion").value,
          numero:document.getElementById("numero").value,
          letra:document.getElementById("letra").value,
          cuadrante:document.getElementById("cuadrante").value,
          numero_dos:document.getElementById("numero_dos").value,
          letra_dos:document.getElementById("letra_dos").value,
          cuadrante_dos:document.getElementById("cuadrante_dos").value,
          numero_tres:document.getElementById("numero_tres").value,
          direccion:document.getElementById("direccion").value,
          referido:document.getElementById("referida").value,
          complemento:document.getElementById("complemento").value,
          nombre_referida:document.getElementById("nombre_referida").value
        }
      }
       //debugger
       localStorage.setItem("datos_contacto",JSON.stringify(datos_localstorage));
       quieres_vender.actualizaProspecto();
      //si es pago anticipado finaliza incor
      let tipo_vinculacion = $("#tipo_vinculacion").val();
      if(tipo_vinculacion == 'P'){
        quieres_vender.enviarSMS();
      }else{
        var active = $('.wizard .nav-tabs li.active');
        active.next().removeClass('disabled');
        nextTab(active);
        //$("#modalDocumentos").modal("show");
      }
    }
  });

  $("#paso_3").click(function (e) {
    let result = valida_envia('formulario_3');
    if(result!=0){

      datos_localstorage={
        datos_codeudor:{
          tipo_doc_cod:document.getElementById("tipo_doc_cod").value,
          numero_doc_cod:document.getElementById("numero_doc_cod").value,
          fecha_nac_cod:document.getElementById("fecha_nac_cod").value,
          ciudad_exp_cod:document.getElementById("ciudad_exp_cod").value,
          primerNombreCod:document.getElementById("primerNombreCod").value,
          segundoNombreCod:document.getElementById("segundoNombreCod").value,
          primerApellidoCod:document.getElementById("primerApellidoCod").value,
          segundoApellidoCod:document.getElementById("segundoApellidoCod").value,
          telefonoCod:document.getElementById("telefonoCod").value,
          celularCod:document.getElementById("celularCod").value,
          correoCod:document.getElementById("correoCod").value
        }
      }
       //debugger
      localStorage.setItem("datos_codeudor",JSON.stringify(datos_localstorage));
      var active = $('.wizard .nav-tabs li.active');
      active.next().removeClass('disabled');
      nextTab(active);
      //$("#modalDocumentosCod").modal("show");
    }
  });

  $("#paso_4").click(function (e) {
    let result = valida_envia('formulario_4');
    if(result!=0){

      datos={
        datos_personales:{
          tipo_vinculacion:document.getElementById("tipo_vinculacion").value,
          tipo_doc:document.getElementById("tipo_doc").value,
          cc:document.getElementById("dctoIdentidad").value,
          fecha_nac:document.getElementById("fecha_nac").value,
          fecha_expedicion:document.getElementById("fecha_expedicion").value,
          ciudad_exp:document.getElementById("ciudad_exp").value,
          primerNombre:document.getElementById("primerNombre").value,
          segundoNombre:document.getElementById("segundoNombre").value,
          primerApellido:document.getElementById("primerApellido").value,
          segundoApellido:document.getElementById("segundoApellido").value,
          telefono:document.getElementById("telefono").value,
          celular:document.getElementById("celular").value,
          correo:document.getElementById("txtCorreo").value
        },
        datos_contacto:{
          pais:document.getElementById("txtPais").value,
          depto:document.getElementById("txtdepto").value,
          ciudad:document.getElementById("ciudad_dpto").value,
          barrio:document.getElementById("txtBarrio").value,
          direccion:document.getElementById("direccion").value,
          referido:document.getElementById("referida").value
        },
        datos_codeudor:{
          tipo_doc_cod:document.getElementById("tipo_doc_cod").value,
          numero_doc_cod:document.getElementById("numero_doc_cod").value,
          fecha_nac_cod:document.getElementById("fecha_nac_cod").value,
          ciudad_exp_cod:document.getElementById("ciudad_exp_cod").value,
          primerNombreCod:document.getElementById("primerNombreCod").value,
          segundoNombreCod:document.getElementById("segundoNombreCod").value,
          primerApellidoCod:document.getElementById("primerApellidoCod").value,
          segundoApellidoCod:document.getElementById("segundoApellidoCod").value,
          telefonoCod:document.getElementById("telefonoCod").value,
          celularCod:document.getElementById("celularCod").value,
          correoCod:document.getElementById("correoCod").value
        },
        datos_referencia:{
          nombreRefPer:document.getElementById("nombreRefPer").value,
          apellidoRefPer:document.getElementById("apellidoRefPer").value,
          celularRefPer:document.getElementById("celularRefPer").value,
          telefonoRefPer:document.getElementById("telefonoRefPer").value,
          nombreRefFam:document.getElementById("nombreRefFam").value,
          apellidoRefFam:document.getElementById("apellidoRefFam").value,
          celularRefFam:document.getElementById("celularRefFam").value,
          telefonoRefFam:document.getElementById("telefonoRefFam").value
        }
      }
       //debugger
      localStorage.setItem("datos_incor",JSON.stringify(datos_localstorage));
      quieres_vender.enviarSMS();
    }
  });

  $("#botonReEnviarSMS").click(function (e) {
    quieres_vender.enviarSMS();
  });

  $("#btnGuardarDocumentos").click(function (e) {
    //verificar si estan los archivos
    let frontCedula = $("#frontCedula")[0].files.length;
    if (frontCedula === 0) {
      toastr.error("La foto frontal de la cédula es obligatoria");
      return false;
    }

    let reverCedula = $("#reverCedula")[0].files.length;
    if (reverCedula === 0) {
      toastr.error("La foto reversa de la cédula es obligatoria");
      return false;
    }

    let foto = $("#foto")[0].files.length;
    if (foto === 0) {
      toastr.error("La foto selfie de la cédula es obligatoria");
      return false;
    }
    let cedula = $("#dctoIdentidad").val();
    //subir documentos por ftp
    quieres_vender.subirFtp(cedula,'titular');
  });

  $("#btnGuardarDocumentosCod").click(function (e) {
    //verificar si estan los archivos
    let frontCedula = $("#frontCedulaCod")[0].files.length;
    if (frontCedula === 0) {
      toastr.error("La foto frontal de la cédula es obligatoria");
      return false;
    }

    let reverCedula = $("#reverCedulaCod")[0].files.length;
    if (reverCedula === 0) {
      toastr.error("La foto reversa de la cédula es obligatoria");
      return false;
    }

    let cedula = $("#numero_doc_cod").val();
    //subir documentos por ftp
    quieres_vender.subirFtpCod(cedula,'codeudor');
    
  });


  $('.nav-tabs > li a[title]').tooltip();
  //Wizard
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

      var target = $(e.target);
  
      if (target.parent().hasClass('disabled')) {
          return false;
      }
  });

  $(".prev-step").click(function (e) {

      var active = $('.wizard .nav-tabs li.active');
      prevTab(active);

  });

  $("#dctoIdentidad").on("change", function (event) {
    quieres_vender.consultaDcto($(this).val());
  });

  $("#numero_doc_cod").on("change", function (event) {
    quieres_vender.consultaDctoCod($(this).val());
  });

  $("#celular").on("change", function (event) {
    var expresion = /^3[\d]{9}$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de celular con 10 digitos y con el formato correcto. Ej: 3XXXXXXXXX", "error");
      $("#celular").val("");
      $("#celular").focus();
    }
    quieres_vender.validarCelular($(this).val());
  });

  $("#celularRefPer").on("change", function (event) {
    var expresion = /^3[\d]{9}$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de celular con 10 digitos y con el formato correcto. Ej: 3XXXXXXXXX", "error");
      $("#celularRefPer").val("");
      $("#celularRefPer").focus();
    }
  });

  $("#celularRefFam").on("change", function (event) {
    var expresion = /^3[\d]{9}$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de celular con 10 digitos y con el formato correcto. Ej: 3XXXXXXXXX", "error");
      $("#celularRefFam").val("");
      $("#celularRefFam").focus();
    }
  });

  $("#telefono").on("change", function (event) {
    var expresion = /^[2-9]\d*$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de telefono con 7 digitos y con el formato correcto. Ej: XXXXXXX", "error");
      $("#telefono").val("");
      $("#telefono").focus();

    }else{
      if($(this).val().length!=7){
        swal("Error", "Debes ingresar un número de telefono con 7 digitos y con el formato correcto. Ej: XXXXXXX", "error");
        $("#telefono").val("");
        $("#telefono").focus();
      }
    }
  });

  $("#telefonoCod").on("change", function (event) {
    var expresion = /^[2-9]\d*$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de telefono con 7 digitos y con el formato correcto. Ej: XXXXXXX", "error");
      $("#telefonoCod").val("");
      $("#telefonoCod").focus();
    }else{
      if($(this).val().length!=7){
        swal("Error", "Debes ingresar un número de telefono con 7 digitos y con el formato correcto. Ej: XXXXXXX", "error");
        $("#telefonoCod").val("");
        $("#telefonoCod").focus();
      }
    }
  });


  $("#celularCod").on("change", function (event) {
    var expresion = /^3[\d]{9}$/;
    if (isNaN($(this).val()) || !expresion.test($(this).val())){
      swal("Error", "Debes ingresar un número de celular con 10 digitos y con el formato correcto. Ej: 3XXXXXXXXX", "error");
      $("#celularCod").val("");
      $("#celularCod").focus();
    }

    let celular_titu =  $('#celular').val();
    if(celular_titu == $(this).val()){
      swal("Error", "No puedes ingresar el mismo número del celular del titular", "error");
      $("#celularCod").val("");
      $("#celularCod").focus();
    }

    quieres_vender.validarCelularCod($(this).val());
  });

  $("#txtCorreo").on("change", function (event) {
    let  mailexp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if (!mailexp.exec($(this).val())){
      swal("Error", "Dirección de correo no válida", "error");
      $("#txtCorreo").val("");
      $("#txtCorreo").focus();
    }else{
      quieres_vender.validarCorreo($(this).val());
    } 
  });

  $("#txtConfirCorreo").on("change", function (event) {
    if($(this).val() != ''){
      quieres_vender.validarConfirmacionMail($(this).val());
    }
  });

  $("#txtConfirCorreo").on('paste', function(e){
    e.preventDefault();
    toastr.error("Esta acción está prohibida");
  })
  
  $("#txtConfirCorreo").on('copy', function(e){
    e.preventDefault();
    toastr.error("Esta acción está prohibida");
  })

  $("#correoCod").on("change", function (event) {
    let  mailexp = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
    if (!mailexp.exec($(this).val())){
      swal("Error", "Dirección de correo no válida", "error");
      $("#correoCod").val("");
      $("#correoCod").focus();
    }
  });

  $("#confi_correoCod").on("change", function (event) {
    if($(this).val() != ''){
      quieres_vender.validarConfirmacionMailCod($(this).val());
    }
  });

  $("#ciudad_dpto").on("change", function (event) {
    quieres_vender.traerBarrio($(this).val());
  });

  $("#txtdepto").on("change", function (event) {
    quieres_vender.traerCiudad($(this).val());
  });

  $("#tipo_direccion").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#numero").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#letra").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#cuadrante").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#cuadrante_dos").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#numero_dos").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#letra_dos").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#numero_tres").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#complemento").on("change", function (event) {
    quieres_vender.armarDireccion();
  });

  $("#referida").on("change", function (event) {
    quieres_vender.traerReferida($(this).val());
  });

  $(document).on('change','input[type="file"]',function(){

    if(this.files[0].name){
     
    var fileName = this.files[0].name;
    var fileSize = this.files[0].size;
  
    if(fileSize > 4000000){
      toastr.error("El archivo no debe superar los 4MB");
      this.value = '';
      this.files[0].name = '';
    }else{
      // recuperamos la extensión del archivo
      var ext = fileName.split('.').pop();
      
      // Convertimos en minúscula porque 
      // la extensión del archivo puede estar en mayúscula
      ext = ext.toLowerCase();
      console.log(ext);
      switch (ext) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'pdf': 
        case 'gif': 
        if (this.files && this.files[0]) {
          var idimg='#img_'+this.name;
             if(this.files[0].name.match(/\.(jpg|JPG|JPEG|jpeg|png|gif|GIF|PNG|JPG)$/)){
              var reader = new FileReader();
              reader.onload = function (e) {
                  $(idimg).show().attr('src', e.target.result);
               }
               reader.readAsDataURL(this.files[0]);
             }else if (this.files && this.files[0] && this.files[0].name.match(/\.(PDF|pdf)$/) ) {
                $(idimg).show().attr('src', "static/images/acrobat_pdf_icon_large.png");
            }
        }
        break;
        default:
          toastr.error("El archivo no tiene la extensión adecuada");
          this.value = ''; // reset del valor
      }
    }
  }
  });

  $("#validarCodVerif").on('click',function(e){

      if($('#codigoVerif').val() != ''){
        quieres_vender.verificarCodigo();
      }else{
        toastr.error("Debes ingresar el código enviado a tu celular");
      }
  });

});

function valida_envia(formulario){

  if(formulario == 'formulario_1'){

    if (document.fvalida.tipo_vinculacion.selectedIndex==0){
      toastr.error("Debe seleccionar un tipo de vinculacion.");
      document.fvalida.tipo_vinculacion.focus()
      return 0;
    }

    
    //tipo de identidad
    if (document.fvalida.tipo_doc.selectedIndex==0){
      toastr.error("Debe seleccionar un tipo de documento.");
      document.fvalida.tipo_doc.focus()
      return 0;
    }
    //documento de identidad
    if (document.fvalida.dctoIdentidad.value.length==0){
        toastr.error("Número de documento se encuentra vacio.");
        document.fvalida.dctoIdentidad.focus()
        return 0;
    }

    
    //fecha_nacimiento
    if (document.fvalida.fecha_nac.value.length==0){
      $("#fecha_nac").val("");
      toastr.error("Seleciona la fecha de nacimiento.");
      document.fvalida.fecha_nac.focus()
      return 0;
    }else{
      var hoy = new Date();
      var cumpleanos = new Date(document.fvalida.fecha_nac.value);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
      }
      if(edad < 18){
        $("#fecha_nac").val("");
        document.fvalida.fecha_nac.focus()
        toastr.error("Eres menor de edad.");
        return 0;
      }
    }
  
    //fecha_expedicion
    if (document.fvalida.fecha_expedicion.value.length==0){
      $("#fecha_expedicion").val("");
      toastr.error("Fecha de expedicion se encuentra vacia");
      document.fvalida.fecha_expedicion.focus()
      return 0;
    } else{
        let fecha_exp =  new Date(document.fvalida.fecha_expedicion.value);
        let nacimiento = new Date(document.fvalida.fecha_nac.value);
        console.log(fecha_exp.getFullYear());
        console.log(nacimiento.getFullYear());

        let valor = fecha_exp.getFullYear() - nacimiento.getFullYear();
       console.log(valor);
        var m = fecha_exp.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && fecha_exp.getDate() < nacimiento.getDate())) {
          valor--;
        }
       
        if(valor < 17){
          $("#fecha_expedicion").val("");
          document.fvalida.fecha_expedicion.focus()
          toastr.error("Fecha de expedición incorrecta");
          return 0;
        }
    }
  
    if (document.fvalida.ciudad_exp.selectedIndex==0){
      toastr.error("Debe seleccionar ciudad de expedición.");
      document.fvalida.ciudad_exp.focus()
      return 0;
    }
    
    //primer nombre
    if (document.fvalida.primerNombre.value.length==0){
      toastr.error("Escribe tu primer nombre");
      document.fvalida.primerNombre.focus()
      return 0;
    }

    //primer apellido
    if (document.fvalida.primerApellido.value.length==0){
      toastr.error("Escribe tu primer apellido");
      document.fvalida.primerApellido.focus()
      return 0;
    }

    

    //correo
    if (document.fvalida.txtCorreo.value.length==0){
      toastr.error("Debes ingresar un correo electrónico");
      document.fvalida.txtCorreo.focus()
      return 0;
    }

    //correo
    if (document.fvalida.txtConfirCorreo.value.length==0){
      toastr.error("Por favor confirma tu correo electrónico");
      document.fvalida.txtConfirCorreo.focus()
      return 0;
    }

    //celular
    if (document.fvalida.celular.value.length==0){
      toastr.error("Digita tu número celular");
      $("#celular").val("");
      document.fvalida.celular.focus()
      return 0;
    }else{
      if(document.fvalida.celular.value.length!=10){
        toastr.error("Número de celular incorrecto");
        document.fvalida.celular.focus()
        return 0;
      }
    }

    //terminos y condiciones
    if (document.fvalida.terminos.checked == false){
      toastr.error("Debes aceptar los terminos y condiciones");
      document.fvalida.terminos.focus()
      return 0;
    }

  }else if(formulario == 'formulario_2'){
    //departamento
    if (document.fvalida.txtdepto.selectedIndex==0){
      toastr.error("Selecciona tu departamento");
      document.fvalida.txtdepto.focus()
      return 0;
    }
    //ciudad
    if (document.fvalida.ciudad_dpto.selectedIndex==0){
      toastr.error("Selecciona tu ciudad");
      document.fvalida.ciudad_dpto.focus()
      return 0;
    }
    //barrio
    if (document.fvalida.txtBarrio.selectedIndex==0){
      toastr.error("Selecciona tu barrio");
      document.fvalida.txtBarrio.focus()
      return 0;
    }
    //tipo direccion
    if (document.fvalida.tipo_direccion.selectedIndex==0){
      toastr.error("Debe seleccionar un tipo de direccion");
      document.fvalida.tipo_direccion.focus()
      return 0;
    }
    //primer numero
    if (document.fvalida.numero.value.length==0){
      toastr.error("El número se encuentra vacio");
      document.fvalida.numero.focus()
      return 0;
    }
    //segundo numero
    if (document.fvalida.numero_dos.value.length==0){
      toastr.error("El número se encuentra vacio");
      document.fvalida.numero_dos.focus()
      return 0;
    }
   
  }else if(formulario == 'formulario_3'){
  
    //tipo de identidad
    if (document.fvalida.tipo_doc_cod.selectedIndex==0){
      toastr.error("Debe seleccionar un tipo de documento.");
      document.fvalida.tipo_doc_cod.focus()
      return 0;
    }
    //documento de identidad
    if (document.fvalida.numero_doc_cod.value.length==0){
        toastr.error("Digita el documento de identidad");
        document.fvalida.numero_doc_cod.focus()
        return 0;
    }

    //fecha_nacimiento
    if (document.fvalida.fecha_nac_cod.value.length==0){
      toastr.error("Fecha de nacimiento vacia.");
      $("#fecha_nac_cod").val("");
      document.fvalida.fecha_nac_cod.focus()
      return 0;
    }else{
      var hoy = new Date();
      var cumpleanos = new Date(document.fvalida.fecha_nac_cod.value);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
      }
      if(edad < 18){
        $("#fecha_nac_cod").val("");
        document.fvalida.fecha_nac_cod.focus()
        toastr.error("El Codeudor debe ser mayor de edad");
        return 0;
      }
    }
  
    if (document.fvalida.ciudad_exp_cod.selectedIndex==0){
      toastr.error("Debe seleccionar ciudad de expedición.");
      document.fvalida.ciudad_exp_cod.focus()
      return 0;
    }
    
    //primer nombre
    if (document.fvalida.primerNombreCod.value.length==0){
      toastr.error("Digita el nombre del codeudor");
      document.fvalida.primerNombreCod.focus()
      return 0;
    }

    //primer apellido
    if (document.fvalida.primerApellidoCod.value.length==0){
      toastr.error("Digita el apellido del codeudor.");
      document.fvalida.primerApellidoCod.focus()
      return 0;
    }

    //correo
    if (document.fvalida.correoCod.value.length==0){
      toastr.error("Digita el correo electrónico.");
      document.fvalida.correoCod.focus()
      return 0;
    }

    //correo
    if (document.fvalida.confi_correoCod.value.length==0){
      toastr.error("Digita el correo electrónico de confirmación.");
      document.fvalida.confi_correoCod.focus()
      return 0;
    }

    //celular
    if (document.fvalida.celularCod.value.length==0){
      toastr.error("Digita el Número de celular.");
      document.fvalida.celularCod.focus()
      return 0;
    }else{
      if(document.fvalida.celularCod.value.length!=10){
        toastr.error("Número de celular incorrecto");
        document.fvalida.celularCod.focus()
        return 0;
      }
    }

  }else if(formulario == 'formulario_4'){
    //nombre referencia personal
    if (document.fvalida.nombreRefPer.value.length==0){
      toastr.error("Digita el nombre de la referencia personal");
      document.fvalida.nombreRefPer.focus()
      return 0;
    }

    //nombre referencia personal
    if (document.fvalida.apellidoRefPer.value.length==0){
      toastr.error("Digita el apellido de la referencia personal");
      document.fvalida.apellidoRefPer.focus()
      return 0;
    }

    //celular referencia personal
    if (document.fvalida.celularRefPer.value.length==0){
      toastr.error("Digita el celular de la referencia personal");
      document.fvalida.celularRefPer.focus()
      return 0;
    }

    //nombre referencia familiar
    if (document.fvalida.nombreRefFam.value.length==0){
      toastr.error("Digita el nombre de la referencia familiar");
      document.fvalida.nombreRefFam.focus()
      return 0;
    }

    //nombre referencia personal
    if (document.fvalida.apellidoRefFam.value.length==0){
      toastr.error("Digita el apellido de la referencia familiar");
      document.fvalida.apellidoRefFam.focus()
      return 0;
    }

    //celular referencia personal
    if (document.fvalida.celularRefFam.value.length==0){
      toastr.error("Digita el celular de la referencia familiar");
      document.fvalida.celularRefFam.focus()
      return 0;
    }

  } 
}

function nextTab(elem) {
$(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
$(elem).prev().find('a[data-toggle="tab"]').click();
}

$('.nav-tabs').on('click', 'li', function() {
$('.nav-tabs li.active').removeClass('active');
$(this).addClass('active');
});


quieres_vender.fetch_api = function (data, type, method) {

let _data = {
  modulo: "quieres_vender",
  metodo: method,
  token: getToken(),
  parametros: data,
}
 fetch('rest.php', {
  method:  method,
  body: JSON.stringify(_data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
};

quieres_vender.consultaDcto = function (cedula) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=consultarDcto&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[cedula]="+cedula+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    
    if(data.success == false){
      if(data.mensaje == "Empleado"){
        swal("Eres un empledo activo", "...No puedes realizar la incorporacíon", "error");
      }else{
        swal("Eres una asesora activa", "Por favor ingresa por actualización de datos", "error");
      }
      $("#dctoIdentidad").val("");
      $("#dctoIdentidad").focus();
  
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.consultaDctoCod = function (cedula) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=consultaDctoCod&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[cedula]="+cedula+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == false){
        swal("Notificación", "...Codeudor mas de dos veces", "error");
        $("#numero_doc_cod").val("");
        $("#numero_doc_cod").focus();
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.traerCiudad = function (cod_dep) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=traerCiudadDpto&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[cod_dep]="+cod_dep+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    $("#ciudad_dpto").html('');
    $("#ciudad_dpto").append('<option value="" selected="selected">Ciudad-Departamento*</option>');
    if(data.success == true){
      $.each(data.data, function(index, val) {
        $("#ciudad_dpto").append('<option value="'+val.cod_ciu+'">'+val.nom_ciu+'</option>');
    });
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.validarCelular = function (celular) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=validarCelular&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[celular]="+celular+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == false){
      swal("Notificación", "Número de celular ya se encuentra registrado", "error");
      $("#celular").val("");
      $("#celular").focus();
  
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.validarCelularCod = function (celular) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=validarCelularCod&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[celular]="+celular+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == false){
      swal("Notificación", "Número de celular del codeudor ya se encuentra registrado", "error");
      $("#celularCod").val("");
      $("#celularCod").focus();
  
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.traerReferida = function (referido) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=traerReferida&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[referido]="+referido+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == true){
      $("#nombre_referida").val(data.nombre).change();  
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.traerBarrio = function (ciudad) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=traerBarrio&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[ciudad]="+ciudad+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == true){
      $("#txtBarrio").html('');
      $("#txtBarrio").append('<option value="" selected="selected">Barrio*</option>');
      $("#txtBarrio").append('<option value="0" >OTRO</option>');
      $.each(data.data, function(index, val) {
        barrios.push({
          value:
            val["cod_bar"],
            text: val["nom_bar"],
        }); 
        $("#txtBarrio").append('<option value="'+val.cod_bar+'">'+val.nom_bar+'</option>');
    });
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.traerDpto = function () {
  $("#loading-indicator").show();
  let cod_pai = $("#txtPais").val();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=traerDpto&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[cod_pai]="+cod_pai+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
      $("#txtdepto").html('');
      $("#txtdepto").html('<option value="" selected="selected">Departamento*</option>');
      $.each(data, function(index, val) {
        $("#txtdepto").append('<option value="'+val.cod_dep+'">'+val.nom_dep+'</option>');
    });

  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.traerCiudadDpto = function () {

  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");

  var formdata = new FormData();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=traerCiudadDepto&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024", requestOptions)
  .then((resp) => resp.json())
  .then(function(response) {
    $("#ciudad_exp_cod").html('');
    $("#ciudad_exp_cod").html('<option value="">Seleccione</option>');
    $("#ciudad_exp").html('');
    $("#ciudad_exp").html('<option value="" selected="selected">Ciudad de expedición*</option>');
      $.each(response.data, function(index, val) {
        $("#ciudad_exp").append('<option value="'+val.codciudad+'">'+val.nombre+'</option>');
        $("#ciudad_exp_cod").append('<option value="'+val.codciudad+'">'+val.nombre+'</option>');
      });
  })
  .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"));
}

quieres_vender.validarCorreo = function (correo) {
  $("#loading-indicator").show();
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
  
  var formdata = new FormData();
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };
  
  fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=validarCorreo&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[correo]="+correo+"", requestOptions)
  .then((resp) => resp.json())
  .then(function(data) {
    if(data.success == false){
      swal("Notificación", "Correo electrónico ya se encuentra registrado", "error");
      $("#txtCorreo").val("");
      $("#txtCorreo").focus();
  
    }
  })
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
    .finally(()=>{
      $("#loading-indicator").hide();
    });
}

quieres_vender.validarConfirmacionMail = function ( email ) {

let mail_principal = $("#txtCorreo").val();
if(mail_principal != email){
  swal("Error", "Oops. confirmacion de dirección de correo es diferente " +email, "error");
  $("#txtConfirCorreo").val("");
  $("#txtConfirCorreo").focus();
}
   
}

quieres_vender.validarConfirmacionMailCod = function ( email ) {

let mail_principal = $("#correoCod").val();
if(mail_principal != email){
  swal("Error", "Oops. confirmacion de dirección de correo es diferente " +email, "error");
  $("#confi_correoCod").val("");
  $("#confi_correoCod").focus();

}
   
}

quieres_vender.armarDireccion = function () {
let direccion = "";
let tipo = $("#tipo_direccion").val();
let numero = $("#numero").val();
let letra = $("#letra").val();
let cuadrante = $("#cuadrante").val();
let numero_dos = $("#numero_dos").val();
let complemento = $("#complemento").val();
if(numero_dos != ""){
  numero_dos = " # " +numero_dos;
}

if(complemento != ""){
  complemento = " , " +complemento;
}
let letra_dos = $("#letra_dos").val();
let cuadrante_dos = $("#cuadrante_dos").val();
let numero_tres = $("#numero_tres").val();
direccion = tipo +" "+numero+ ""+letra+""+cuadrante+ " "+numero_dos+""+letra_dos+""+cuadrante_dos+ " "+numero_tres+" "+complemento;
$("#direccion").val(direccion).change();

}

quieres_vender.guardarIncor = function(codigo){

let frontal = "";
let reverso = "";
let selfie = "";
let frontalcod = "";
let reversocod = "";

let tipo_vinculacion = document.getElementById("tipo_vinculacion").value;
let ciudad = document.getElementById("ciudad_dpto").value;

if(tipo_vinculacion=='C'){

  if(ciudad == '05001000' || ciudad =='05088000' ||  ciudad =='05212000'){
    frontal = adjuntos[0].frontal;
    reverso = adjuntos[0].reverso;
    selfie =  adjuntos[0].selfie;
    frontalcod = "";
    reversocod = "";
  }else{
    frontal = adjuntos[0].frontal;
    reverso = adjuntos[0].reverso;
    selfie =  adjuntos[0].selfie;
    frontalcod = adjuntos[1].frontalcod;
    reversocod = adjuntos[1].reversocod;
  }
}

datos={
  datos_personales:{
    tipo_vinculacion:tipo_vinculacion,
    tipo_doc:document.getElementById("tipo_doc").value,
    cc:document.getElementById("dctoIdentidad").value,
    fecha_nac:document.getElementById("fecha_nac").value,
    fecha_expedicion:document.getElementById("fecha_expedicion").value,
    ciudad_exp:document.getElementById("ciudad_exp").value,
    primerNombre:document.getElementById("primerNombre").value,
    segundoNombre:document.getElementById("segundoNombre").value,
    primerApellido:document.getElementById("primerApellido").value,
    segundoApellido:document.getElementById("segundoApellido").value,
    telefono:document.getElementById("telefono").value,
    celular:document.getElementById("celular").value,
    correo:document.getElementById("txtCorreo").value,
    terminos:$('input[name="terminos"]:checked').val(),
    codigo: codigo
  },
  datos_contacto:{
    pais:document.getElementById("txtPais").value,
    depto:document.getElementById("txtdepto").value,
    ciudad:document.getElementById("ciudad_dpto").value,
    barrio:document.getElementById("txtBarrio").value,
    direccion:document.getElementById("direccion").value,
    referido:document.getElementById("referida").value,
    frontal:frontal,
    reverso:reverso,
    selfie:selfie
  },
  datos_codeudor:{
    tipo_doc_cod:document.getElementById("tipo_doc_cod").value,
    numero_doc_cod:document.getElementById("numero_doc_cod").value,
    fecha_nac_cod:document.getElementById("fecha_nac_cod").value,
    ciudad_exp_cod:document.getElementById("ciudad_exp_cod").value,
    primerNombreCod:document.getElementById("primerNombreCod").value,
    segundoNombreCod:document.getElementById("segundoNombreCod").value,
    primerApellidoCod:document.getElementById("primerApellidoCod").value,
    segundoApellidoCod:document.getElementById("segundoApellidoCod").value,
    telefonoCod:document.getElementById("telefonoCod").value,
    celularCod:document.getElementById("celularCod").value,
    correoCod:document.getElementById("correoCod").value,
    frontalcod:frontalcod,
    reversocod:reversocod
  },
  referencias:{
    nombreRefPer:document.getElementById("nombreRefPer").value,
    apellidoRefPer:document.getElementById("apellidoRefPer").value,
    celularRefPer:document.getElementById("celularRefPer").value,
    telefonoRefPer:document.getElementById("telefonoRefPer").value,
    nombreRefFam:document.getElementById("nombreRefFam").value,
    apellidoRefFam:document.getElementById("apellidoRefFam").value,
    celularRefFam:document.getElementById("celularRefFam").value,
    telefonoRefFam:document.getElementById("telefonoRefFam").value
  }
}
 //debugger
 localStorage.setItem("datos_incor",JSON.stringify(datos));

 $("#loading-indicator").show();
 var myHeaders = new Headers();
 myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
 
 var formdata = new FormData();
 
 var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: formdata,
   redirect: 'follow'
 };
 
 fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=guardarIncor&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[frm]="+datos+"", requestOptions)
 .then((resp) => resp.json())
 .then(function(data) {
   if(data.success == true){
    localStorage.removeItem("datos_incor");
    localStorage.removeItem("datos_contacto");
    localStorage.removeItem("datos_personales");
    localStorage.removeItem("datos_codeudor");
    swal("Se ha creado tu solicitud", "En breve, te informaremos del estado de tu incorporacíon ", "success");
   }
 })
   .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
   .finally(()=>{
     $("#loading-indicator").hide();
   });
}

quieres_vender.enviarSMS = function () {
  $("#loading-indicator").show();
  let cel = $('#celular').val();
  let cedula = $('#dctoIdentidad').val();
  let email = $("#txtCorreo").val();
  let barrio = $("#txtBarrio").val();
  if(cedula==''){
    toastr.error(decodeURIComponent(escape("Cedula Incorrecta")));
    return;
  }
  if(email==''){
    toastr.error(decodeURIComponent(escape("Email incorrecto")));
    return;
  }

  if(barrio==''){
    toastr.error(decodeURIComponent(escape("Barrio incorrecto")));
    return;
  }

  if(cel!=''){
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
    
    var formdata = new FormData();
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=enviarSMS&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[celular]="+cel+"&parametros[cedula]="+cedula+"&parametros[email]="+email+"&parametros[barrio]="+barrio+"", requestOptions)
    .then((resp) => resp.json())
    .then(function(response) {
      if(response.success==true){
        toastr.success('Mensaje enviado');
        quieres_vender.verModal();
      }else if(response.success== false){
        toastr.error("Numero no valido");
      }else{
        toastr.error("No se puede enviar el mensaje");
      }
    })
      .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
      .finally(()=>{
        $("#loading-indicator").hide();
      });
  }else{
      toastr.error("Debes ingresar tu número de celular");
  }
}

quieres_vender.verModal = function(){
  $("#ModalCodigoVer").modal("show");
  $("#botonReEnviarSMS").html("Reenviar SMS a "+$('#celular').val());	
}

quieres_vender.verificarCodigo = function(){

let cel = $('#celular').val();
let cedula = $('#dctoIdentidad').val();
let codigoVerif = $('#codigoVerif').val();
if(codigoVerif!=''){

  var myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=36aibiq3381cgvf9olh54tb5rn");
    
    var formdata = new FormData();
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch("https://erp.ipanu.co/ipanu/rest.php?user=ipanu&modulo=quieres_vender&metodo=verificarCodigo&token=bdc7eb9ab5168f887e5a3ee620c2aeab138fd024&parametros[celular]="+cel+"&parametros[cedula]="+cedula+"&parametros[codigo]="+codigoVerif+"", requestOptions)
    .then((resp) => resp.json())
    .then(function(response) {
      if(response.success==true){
        $("#ModalCodigoVer").modal("hide");
        quieres_vender.guardarIncor(codigoVerif);
      }else{
        toastr.info('Código de asesora no valido');
      }
    })
      .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"))
      .finally(()=>{
        $("#loading-indicator").hide();
      });
}else{
  toastr.error("Debes ingresar el codigo enviado a tu celular");
}
}

quieres_vender.subirFtp = function(cedula,tipo){


  // Add record
  $.post("enviar.php", {
    cedula: cedula,
    tipo: tipo
}, function (data, status) {
    // close the popup
    $("#add_new_record_modal").modal("hide");

    // read records again
    readRecords();

    // clear fields from the popup
    $("#idalumno").val("");
    $("#codalumno").val("");
    $("#codmatri").val("");
    $("#obs").val("");
});
}

quieres_vender.subirFtpCod = function(cedula,tipo){

var form =new FormData($("#formIncorCod")[0]);
form.append("token",getToken());
form.append("modulo","quieres_vender");
form.append("metodo","subirFtp");
form.append("dctoIdentidad",cedula);
form.append("tipo",tipo);
$.ajax({
    type:'POST',
    url:'rest.php',
    dataType:'JSON',
    async:true,
    cache:false,
    contentType:false,
    processData:false,
    data:form,
    success:function(data){
     
        if(data.success==true){

            adjuntos.push({
              frontalcod:data.frontalcod,
              reversocod:data.reversocod
            }); 
          
          toastr.success('Imagenes cargadas correctamente.');

          $("#modalDocumentosCod").modal("hide");

          var active = $('.wizard .nav-tabs li.active');
          active.next().removeClass('disabled');
          nextTab(active);

        }else{
          toastr.error(data.message);
        } 
    }
});
}

quieres_vender.guardarProspecto = function(){

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Cookie", "PHPSESSID=q4ui3dmdot5vkcbk23upg7gnea");

let urlencoded = new URLSearchParams();
urlencoded.append("user", "ipanu");
urlencoded.append("modulo", "quieres_vender");
urlencoded.append("metodo", "guardarProspecto");
urlencoded.append("token", "bdc7eb9ab5168f887e5a3ee620c2aeab138fd024");
urlencoded.append("parametros[frm][datos_personales][tipo_vinculacion]", document.getElementById("tipo_vinculacion").value);
urlencoded.append("parametros[frm][datos_personales][tipo_doc]", document.getElementById("tipo_doc").value);
urlencoded.append("parametros[frm][datos_personales][cc]", document.getElementById("dctoIdentidad").value);
urlencoded.append("parametros[frm][datos_personales][fecha_nac]",document.getElementById("fecha_nac").value );
urlencoded.append("parametros[frm][datos_personales][fecha_expedicion]", document.getElementById("fecha_expedicion").value);
urlencoded.append("parametros[frm][datos_personales][ciudad_exp]", document.getElementById("ciudad_exp").value);
urlencoded.append("parametros[frm][datos_personales][primerNombre]", document.getElementById("primerNombre").value);
urlencoded.append("parametros[frm][datos_personales][segundoNombre]", document.getElementById("segundoNombre").value);
urlencoded.append("parametros[frm][datos_personales][primerApellido]", document.getElementById("primerApellido").value);
urlencoded.append("parametros[frm][datos_personales][segundoApellido]", document.getElementById("segundoApellido").value);
urlencoded.append("parametros[frm][datos_personales][celular]", document.getElementById("celular").value);
urlencoded.append("parametros[frm][datos_personales][correo]", document.getElementById("txtCorreo").value);

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://erp.ipanu.co/ipanu/rest.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"));
}

quieres_vender.actualizaProspecto = function(){

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", "PHPSESSID=q4ui3dmdot5vkcbk23upg7gnea");

  let urlencoded = new URLSearchParams();
  urlencoded.append("user", "ipanu");
  urlencoded.append("modulo", "quieres_vender");
  urlencoded.append("metodo", "actualizaProspecto");
  urlencoded.append("token", "bdc7eb9ab5168f887e5a3ee620c2aeab138fd024");
  urlencoded.append("parametros[frm][datos_contacto][cc]", document.getElementById("dctoIdentidad").value);
  urlencoded.append("parametros[frm][datos_contacto][depto]",document.getElementById("txtdepto").value );
  urlencoded.append("parametros[frm][datos_contacto][ciudad]", document.getElementById("ciudad_dpto").value);
  urlencoded.append("parametros[frm][datos_contacto][barrio]", document.getElementById("txtBarrio").value);
  urlencoded.append("parametros[frm][datos_contacto][direccion]", document.getElementById("direccion").value);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  fetch("https://erp.ipanu.co/ipanu/rest.php", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => swal("Ha ocurrido un error ", "Por favor intenta nuevamente", "error"));   
}

