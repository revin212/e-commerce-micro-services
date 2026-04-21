const apiBaseUrl = (process.env.API_BASE_URL ?? "http://127.0.0.1:8080").replace(/\/$/, "");
const randomEmail = `integration_${Date.now()}@example.com`;
let token = "";
let orderId = "";

async function request(path, init = {}, auth = false) {
  const headers = {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  };
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });
  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();
  return { response, payload };
}

function assertStatus(label, response, expected) {
  if (response.status !== expected) {
    throw new Error(`${label} expected ${expected} but got ${response.status}`);
  }
  console.log(`PASS: ${label}`);
}

async function run() {
  const register = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: "Integration",
      lastName: "Runner",
      email: randomEmail,
      password: "Passw0rd!",
    }),
  });
  assertStatus("register", register.response, 200);
  token = register.payload.token;

  const badLogin = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: randomEmail,
      password: "wrong-password",
    }),
  });
  assertStatus("login failure case", badLogin.response, 401);

  const login = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: randomEmail,
      password: "Passw0rd!",
    }),
  });
  assertStatus("login", login.response, 200);
  token = login.payload.token;

  const products = await request("/products");
  assertStatus("list products", products.response, 200);
  if (!Array.isArray(products.payload.items) || products.payload.items.length === 0) {
    throw new Error("products response does not contain items");
  }
  const firstProduct = products.payload.items[0];

  const cartAdd = await request(
    "/cart",
    {
      method: "POST",
      body: JSON.stringify({
        productId: firstProduct.id,
        name: firstProduct.name,
        quantity: 1,
        price: firstProduct.price.amount,
      }),
    },
    true,
  );
  assertStatus("add to cart", cartAdd.response, 200);

  const checkout = await request(
    "/checkout",
    {
      method: "POST",
      body: JSON.stringify({
        address: "123 Integration St",
        shippingMethodId: "standard",
        paymentMethod: "card",
      }),
    },
    true,
  );
  assertStatus("checkout", checkout.response, 200);
  orderId = checkout.payload.orderId;

  const checkoutFailure = await request(
    "/checkout",
    {
      method: "POST",
      body: JSON.stringify({
        address: "123 Integration St",
        shippingMethodId: "standard",
        paymentMethod: "card",
      }),
    },
    true,
  );
  assertStatus("checkout empty cart failure", checkoutFailure.response, 400);

  const orders = await request("/orders", { method: "GET" }, true);
  assertStatus("orders list", orders.response, 200);
  if (!Array.isArray(orders.payload) || !orders.payload.some((order) => order.id === orderId)) {
    throw new Error("orders list does not contain checkout order");
  }

  const orderDetail = await request(`/orders/${orderId}`, { method: "GET" }, true);
  assertStatus("order detail", orderDetail.response, 200);

  const adminDenied = await request("/admin/inventory", { method: "GET" }, true);
  assertStatus("admin forbidden for customer", adminDenied.response, 403);

  console.log("Integration smoke checks completed successfully.");
}

run().catch((error) => {
  console.error("Integration smoke checks failed.");
  console.error(error);
  process.exitCode = 1;
});
