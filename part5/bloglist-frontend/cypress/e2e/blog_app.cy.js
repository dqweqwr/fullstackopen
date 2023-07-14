const BACKEND = Cypress.env("BACKEND")

describe("template spec", function() {
  beforeEach(function() {
    cy.request("POST", `${BACKEND}/testing/reset`)
    cy.visit("")
  })

  it("Login form is shown", function() {

  })
})
