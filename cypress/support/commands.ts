Cypress.Commands.add("login", (email: any, password: any) => {
  cy.request({
    method: "POST",
    url: "http://localhost:5000/api/signIn",
    body: {
      email: email,
      password: password,
    },
  }).then(({ body, status }) => {
    window.localStorage.setItem("token", body?.token);
    window.localStorage.setItem("id", body?._id);
    cy.visit("/");
  });
});
