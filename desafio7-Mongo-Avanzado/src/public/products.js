//import Handlebars from 'handlebars';

const inicio = async () => {
    if (carrito.length === 0) {
        await cargaChangoInicio()
    }
}

const cargaChangoInicio = async () => {
    const idCart = await crearChango()
    localStorage.setItem("carrito", idCart)
}

const crearChango = async () => {
    const response = await fetch(`http://localhost:8080/api/carts`, {
        method: "post",
    });
    const datos = await response.json()
    const id = datos._id
    return id;
}

const addCart = document.querySelectorAll('.addCart')

addCart.forEach((element) => {
    element.addEventListener('click', async (e) => {
        const id = e.target.id;
        await agregarAlChango(carrito, id)
    });
})

const agregarAlChango = async (cid, pid) => {
    const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
        method: "post",
    });
    if (response.ok) {
        Toastify({
            text: `🟢 ${"Producto agregado al carrito"}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }

}

const carrito = localStorage.getItem("carrito") || [];

inicio()

const btnChango = document.getElementById('verChango')
btnChango.addEventListener('click', (e) => {
    let url = `http://localhost:8080/carts/${carrito}`
    console.log(e.target.href = url);
});