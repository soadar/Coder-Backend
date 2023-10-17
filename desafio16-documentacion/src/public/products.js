const carrito = document.getElementById('verChango').dataset.id;

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

    if (response.status === 401) {
        Toastify({
            text: `🟢 ${response.statusText}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
    if (response.status === 200) {
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


