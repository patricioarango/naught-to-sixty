aplicacion.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

aplicacion.factory('registroCantidadVentas',function(){
  var items = [];
  var itemsService = {};

  if (localStorage.getItem("laslilas_nro_ventas") === null) {
    localStorage.setItem("laslilas_nro_ventas",0);
  }

  itemsService.add = function() {
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    var nueva_vta = (Number(nro_vta) + Number(1));
    localStorage.setItem("laslilas_nro_ventas", nueva_vta);
    items[0] = nueva_vta;
  };

  itemsService.list = function() {
    items[0] = localStorage.getItem("laslilas_nro_ventas");
      return items;
  };

  itemsService.delete = function() {
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    var nueva_vta = (Number(nro_vta) - Number(1));
    if (nueva_vta < 0){
      nueva_vta = 0;
    }
    localStorage.setItem("laslilas_nro_ventas", nueva_vta);
    items[0] = nueva_vta;
  };

  return itemsService;
});

aplicacion.factory('registroVentas',function(){

  if (localStorage.getItem("laslilas_nro_ventas") >= 1){
    var items = JSON.parse(localStorage.getItem("laslilas_listado_ventas"));
  } else {
    var items = [];
  }
    
  var itemsService = {};
    
  itemsService.add = function(detalle) {
    var venta = {};
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    ventaid = nro_vta;
    ventaid2 = "ventaid_" + nro_vta;
    detalle.ventaidparaborrar = nro_vta;
    venta[ventaid2] = detalle;
    items.push(venta);
    localStorage.setItem("laslilas_listado_ventas",JSON.stringify(items));
  };

  itemsService.delete = function(key) {
    delete items[key];
    localStorage.setItem("laslilas_listado_ventas",JSON.stringify(items));
  };

  itemsService.list = function() {
    var items = JSON.parse(localStorage.getItem("laslilas_listado_ventas"));
    return items;
  };
    
  return itemsService;
});


aplicacion.factory('registroCantidadFavoritos',function(){
  var items = [];
  var itemsService = {};

  if (localStorage.getItem("laslilas_nro_favoritos") === null) {
    localStorage.setItem("laslilas_nro_favoritos",0);
  }

  itemsService.add = function() {
    var nro_fav = localStorage.getItem("laslilas_nro_favoritos");
    var nueva_fav = (Number(nro_fav) + Number(1));
    localStorage.setItem("laslilas_nro_favoritos", nueva_fav);
    items[0] = nueva_fav;
  };

  itemsService.list = function() {
    items[0] = localStorage.getItem("laslilas_nro_favoritos");
      return items;
  };

  itemsService.delete = function() {
    var nro_fav = localStorage.getItem("laslilas_nro_favoritos");
    var nueva_fav = (Number(nro_fav) - Number(1));
    if (nueva_fav < 0){
      nueva_fav = 0;
    }
    localStorage.setItem("laslilas_nro_favoritos", nueva_fav);
    items[0] = nueva_fav;
  };

  return itemsService;
});

aplicacion.factory('registroFavoritos',function(){

  if (localStorage.getItem("laslilas_nro_favoritos") >= 1){
    var items = JSON.parse(localStorage.getItem("laslilas_listado_favoritos"));
  } else {
    var items = [];
  }
    
  var itemsService = {};
    
  itemsService.add = function(detalle) {
    var venta = {};
    var nro_vta = localStorage.getItem("laslilas_nro_favoritos");
    ventaid = nro_vta;
    ventaid2 = "ventaid_" + nro_vta;
    detalle.ventaidparaborrar = nro_vta;
    venta[ventaid2] = detalle;
    items.push(venta);
    localStorage.setItem("laslilas_listado_favoritos",JSON.stringify(items));
  };

  itemsService.delete = function(key) {
    delete items[key];
    localStorage.setItem("laslilas_listado_favoritos",JSON.stringify(items));
  };

  itemsService.list = function() {
    var items = JSON.parse(localStorage.getItem("laslilas_listado_favoritos"));
    return items;
  };
    
  return itemsService;
});