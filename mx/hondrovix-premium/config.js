/* Cambia estos datos para reutilizar la plantilla con otro producto. */
window.HONDROVIX_CONFIG = {
  productId:'G2', skyLeadOfferId:'1670', name:'Hondrovix', category:'Gel para el cuidado de las articulaciones',
  price:590, currency:'MXN', volume:'50 ml', locale:'es-MX',
  primaryImage:'assets/hondrovix-product-final.png', realImage:'assets/hondrovix-lifestyle.webp',
  ingredients:[
    {latin:'Arnica montana',title:'Árnica',detail:'Extracto botánico conocido por su uso tradicional en productos de masaje.'},
    {latin:'Mentha piperita',title:'Menta',detail:'Ingrediente aromático utilizado en fórmulas corporales de sensación fresca.'},
    {latin:'Capsicum frutescens',title:'Capsicum',detail:'Ingrediente vegetal que puede producir una sensación de calor en la piel.'},
    {latin:'Eucalyptus globulus',title:'Eucalipto',detail:'Ingrediente vegetal aromático frecuente en productos de cuidado corporal.'}
  ],
  /* Endpoint HTTPS del backend de pedidos. Debe recibir los datos y enviar el lead a SkyLead/Keitaro. */
  leadEndpoint:'',
  privacyUrl:'', termsUrl:'', seller:'', sellerEmail:'',
  deliveryText:'El costo y la disponibilidad del envío se confirman antes de finalizar el pedido.',
  paymentText:'Las modalidades de pago se confirman durante la llamada de verificación.',
  saleDeadline:'', /* Solo usar una fecha real para la promoción; vacío = sin contador */
};
