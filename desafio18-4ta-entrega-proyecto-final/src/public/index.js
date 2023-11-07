const socketClient = io();

const btnEnviar = document.getElementById("enviar");
const listado = document.getElementById("listado");
const elements = document.getElementById("form").elements;

const btnBorrar = document.getElementById("borrar");
const idBorrar = document.getElementById("idBorrar");

function datosForm() {
  var obj = {};
  for (var i = 0; i < elements.length - 1; i++) {
    var item = elements.item(i);
    obj[item.id] = item.value;
  }
  return JSON.stringify(obj);
}

function renderHTML(products) {
  const productRender = products
    .map((product) => {
      let str = '<div class="m-2">'
      if (product._id) {
        str += `
        <li><strong>id: </strong> ${product._id}</li>
        `
      } else {
        str += `
        <li><strong>id: </strong> ${product.id}</li>
        `
      }
      str += `
      <li><strong>title: </strong>${product.title}</li>
      <li><strong>description: </strong>${product.description}</li>
      <li><strong>code: </strong>${product.code}</li>
      <li><strong>price: </strong>${product.price}</li>
      <li><strong>status: </strong>${product.status}</li>
      <li><strong>stock: </strong>${product.stock}</li>
      <li><strong>category: </strong>${product.category}</li>
      <li><strong>thumbnails: </strong>${product.thumbnails}</li>
  </div>
      `
      return str;
    })
    .join(" ");
  listado.innerHTML = productRender;
}

btnEnviar.addEventListener("click", async (e) => {
  e.preventDefault();

  if (JSON.parse(datosForm()).status != 'true' && JSON.parse(datosForm()).status != 'false') {
    alert("El campo status debe ser un valor booleano")
    return false;
  }
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: datosForm(),
  });
  socketClient.emit("cargaPorPost", await response.json());
});

socketClient.on("cargaInicial", async (products) => {
  renderHTML(products.docs);
});

socketClient.on("carga", async (data) => {
  if (data.msg._id) {
    data.msg = `El producto con id ${data.msg._id} fue dado de alta`
  }
  Toastify({
    text: `🟢 ${data.msg}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  renderHTML(data.products);
});

btnBorrar.addEventListener("click", async (e) => {
  e.preventDefault();
  const response = await fetch(`/api/products/${idBorrar.value}`, {
    method: "delete",
  });
  socketClient.emit("delete", await response.json());
});

socketClient.on("eliminado", async (data) => {
  if (data.msg._id) {
    data.msg = `El producto con id ${data.msg._id} fue dado de baja`
  }
  Toastify({
    text: `🟢 ${data.msg}`,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  renderHTML(data.products);
});
