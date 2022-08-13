Cypress.Commands.add("login", (email: any, password: any) => {
  cy.log("logging in before each test");
  let response = cy
    .request({
      method: "POST",
      url: Cypress.env("DEV_URL"),
      body: {
        email: email,
        password: password,
      },
    })
    .then(({ body, status }) => {
      window.localStorage.setItem("token", body?.token);
      window.localStorage.setItem("id", body?._id);
      cy.visit("/");
    });
});
